const btnAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const btnOut = document.querySelector('.button-out');
const btnCart = document.querySelector('.button-cart');

// Функція перемикання видимість модального вікна
function toggleModalAuth() {
    modalAuth.classList.toggle('is-open');
    // Очищення помилок при відкритті/закритті
    loginInput.style.borderColor = '';
}

// Функція, що виконується при успішній авторизації
function authorized(login) {
    console.log('Авторизовано');
    
    userName.textContent = login;

    // Зміна видимості кнопок
    btnAuth.style.display = 'none';
    btnOut.style.display = 'flex';
    if (btnCart) btnCart.style.display = 'flex';
    userName.style.display = 'inline';

    // Функція виходу
    btnOut.addEventListener('click', () => {
        logout();
    });
}

// Функція виходу
function logout() {
    localStorage.removeItem('deliveryLog');
    userName.textContent = '';
    
    btnAuth.style.display = 'flex';
    btnOut.style.display = 'none';
    if (btnCart) btnCart.style.display = 'none';
    userName.style.display = 'none';
}

// Функція для неавторизованого користувача
function notAuthorized() {
    console.log('Не авторизовано');

    function logIn(event) {
        event.preventDefault();
        
        const login = loginInput.value.trim();

        // Перевірка на порожнє поле
        if (!login) {
            loginInput.style.borderColor = 'red';
            alert('Будь ласка, введіть логін!');
            return;
        }

        localStorage.setItem('deliveryLog', login);
        toggleModalAuth();
        
        // Видаляємо слухач події, щоб не дублювати
        logInForm.removeEventListener('submit', logIn);
        logInForm.reset();
        
        checkAuth();
    }

    logInForm.addEventListener('submit', logIn);
}

// Перевірка стану авторизації
function checkAuth() {
    const login = localStorage.getItem('deliveryLog');
    if (login) {
        authorized(login);
    } else {
        notAuthorized();
    }
}

// Початкові налаштування кнопок (приховуємо "Вийти" за замовчуванням)
btnOut.style.display = 'none';

// Слухачі подій
btnAuth.addEventListener('click', toggleModalAuth);
closeAuth.addEventListener('click', toggleModalAuth);

// Запуск перевірки при завантаженні
checkAuth();