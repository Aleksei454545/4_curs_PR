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
    
    if (modalAuth.classList.contains('is-open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }

    loginInput.style.borderColor = '';
    passwordInput.style.borderColor = '';
}

modalAuth.addEventListener('click', (event) => {
    if (event.target === modalAuth) {
        toggleModalAuth();
    }
});

function authorized(login) {
    userName.textContent = login;
    btnAuth.style.display = 'none';
    btnOut.style.display = 'flex';
    userName.style.display = 'inline';
}

function notAuthorized() {
    function logIn(event) {
        event.preventDefault();
        
        const login = loginInput.value.trim();
        const password = passwordInput.value.trim();
        let canLogin = true;

        if (!login) {
            loginInput.style.borderColor = '#ff0000';
            canLogin = false;
        } else {
            loginInput.style.borderColor = '';
        }

        if (!password) {
            passwordInput.style.borderColor = '#ff0000';
            canLogin = false;
        } else {
            passwordInput.style.borderColor = '';
        }

        if (canLogin) {
            localStorage.setItem('deliveryLog', login);
            toggleModalAuth();
            checkAuth();
            logInForm.reset();
        }
    }

    logInForm.addEventListener('submit', logIn);
}

function logout() {
    localStorage.removeItem('deliveryLog');
    userName.textContent = '';
    btnAuth.style.display = 'flex';
    btnOut.style.display = 'none';
    userName.style.display = 'none';
}

function checkAuth() {
    const login = localStorage.getItem('deliveryLog');
    if (login) {
        authorized(login);
    } else {
        notAuthorized();
    }
}

btnAuth.addEventListener('click', toggleModalAuth);
closeAuth.addEventListener('click', toggleModalAuth);
btnOut.addEventListener('click', logout);

checkAuth();