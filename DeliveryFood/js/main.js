'use strict';

const btnAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const passwordInput = document.querySelector('#password');
const userName = document.querySelector('.user-name');
const btnOut = document.querySelector('.button-out');

function toggleModalAuth() {
    modalAuth.classList.toggle('is-open');
    document.body.style.overflow =
        modalAuth.classList.contains('is-open') ? 'hidden' : '';

    loginInput.style.borderColor = '';
    passwordInput.style.borderColor = '';
}

modalAuth.addEventListener('click', (e) => {
    if (e.target === modalAuth) toggleModalAuth();
});

function authorized(login) {
    userName.textContent = login;
    userName.style.display = 'inline';
    btnAuth.style.display = 'none';
    btnOut.style.display = 'flex';
}

function notAuthorized() {
    logInForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const login = loginInput.value.trim();
        const password = passwordInput.value.trim();

        if (!login || !password) {
            if (!login) loginInput.style.borderColor = 'red';
            if (!password) passwordInput.style.borderColor = 'red';
            return;
        }

        localStorage.setItem('deliveryLog', login);
        toggleModalAuth();
        checkAuth();
        logInForm.reset();
    });
}

function logout() {
    localStorage.removeItem('deliveryLog');
    userName.textContent = '';
    userName.style.display = 'none';
    btnAuth.style.display = 'flex';
    btnOut.style.display = 'none';
}

function checkAuth() {
    const login = localStorage.getItem('deliveryLog');
    login ? authorized(login) : notAuthorized();
}

btnAuth?.addEventListener('click', toggleModalAuth);
closeAuth?.addEventListener('click', toggleModalAuth);
btnOut?.addEventListener('click', logout);

checkAuth();



const restaurants = [
    {
        name: 'Піца плюс',
        image: 'img/pizza-plus/preview.jpg',
        time: '50 хвилин',
        rating: '4.5',
        price: 'від 200 ₴',
        category: 'Піца'
    },
    {
        name: 'Танукі',
        image: 'img/tanuki/preview.jpg',
        time: '60 хвилин',
        rating: '4.5',
        price: 'від 1200 ₴',
        category: 'Суші'
    },
    {
        name: 'FoodBand',
        image: 'img/food-band/preview.jpg',
        time: '40 хвилин',
        rating: '4.5',
        price: 'від 150 ₴',
        category: 'Піца'
    }
];


const cardsContainer = document.querySelector('.cards-restaurants');

function renderRestaurants() {
    cardsContainer.innerHTML = '';

    restaurants.forEach(item => {
        cardsContainer.insertAdjacentHTML('beforeend', `
            <a href="restaurant.html" class="card card-restaurant">
                <img src="${item.image}" class="card-image">
                <div class="card-text">
                    <div class="card-heading">
                        <h3 class="card-title">${item.name}</h3>
                        <span class="card-tag tag">${item.time}</span>
                    </div>
                    <div class="card-info">
                        <div class="rating">${item.rating}</div>
                        <div class="price">${item.price}</div>
                        <div class="category">${item.category}</div>
                    </div>
                </div>
            </a>
        `);
    });
}

renderRestaurants();

cardsContainer.addEventListener('click', (event) => {
    const card = event.target.closest('.card-restaurant');
    if (!card) return;

    const isAuth = localStorage.getItem('deliveryLog');

    if (!isAuth) {
        event.preventDefault(); 
        toggleModalAuth();     
    }
});
