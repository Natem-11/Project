const correctUsername = "nathangoestohill";
const correctPassword = "1";

const login = (username, password, errorDiv) => {
    if (username === correctUsername && password === correctPassword){
        window.location.href = 'main.html';
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

//base set up for a log in page
//next steps are to add a sign up page and way to send the passwords 
// and usernames to the server

export default setup;