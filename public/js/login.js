class App {
    constructor(){
        this.usernameInput = document.querySelector('#username');
        this.passwordInput = document.querySelector('#password');
        this.errorDiv = document.querySelector('#error-message');

        this.login = this.login.bind(this);

        document.querySelector('#login').addEventListener('submit', this.login);
        
        // sign up button redirect
        document.querySelector('#sign-up').addEventListener('click', function(){
            window.location.href = 'registration.html';
        });
    }

    async login(event){
        event.preventDefault();

        if(!this.usernameInput.value) {
            this.showError("Please enter a username");
            return;
        }

        if(!this.passwordInput.value) {
            this.showError("Please enter a password");
            return;
        }

        const credentials = {
            username: this.usernameInput.value,
            password: this.passwordInput.value
        }

        // send the credentials to the server and await the response 
        const response = await fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });

        const auth = await response.json();

        if (auth.success){
            sessionStorage.setItem('currentUser', credentials.username);
            sessionStorage.setItem('firstName', auth.firstName);
            sessionStorage.setItem('lastName', auth.lastName);
            
            window.location.href = 'main.html';
        }
        else {
            this.showError(auth.message);
        }
    }

    showError(message){
        this.errorDiv.querySelector('p').textContent = message;
        this.errorDiv.classList.remove('hidden');
    }
}

export default App;