const correctUsername = "nathangoestohill";
const correctPassword = "nathan12345678";

const login = (username, password, errorDiv) => {
    if (username === correctUsername && password === correctPassword){
        window.location.href = 'index.html';
    } else{
        errorDiv.classList.remove('hidden');
    }
}

const setup = () => {
    const loginButton = document.querySelector('#login');
    loginButton.addEventListener('click', () => {
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;
        const errorDiv = document.querySelector('#error-message');

        login(username, password, errorDiv);
    });
}

export default setup;