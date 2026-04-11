		class App {
			constructor() {
				this.usernameInput = document.querySelector("#username");
				this.passwordInput = document.querySelector("#password");
				this.errorMessage = document.querySelector("#error-message");
				this.form = document.querySelector("#login");
				if (this.form) {
					this.form.addEventListener('submit', this.login.bind(this));
				}
			}

			async login(event) {
				event.preventDefault();	
				const username = this.usernameInput.value;
				const password = this.passwordInput.value;
				await this.validate(username, password);
			}

			async validate(username, password) {
				const response = await fetch('./data/credentials.json');
				const isResponseOk = await response.ok;
				if (isResponseOk) {
					const credentials = await response.json();
					if (username === credentials.username && password === credentials.password) {
						window.location.href = "main.html";
					} else {
						this.errorMessage.classList.remove("hidden");
					}
				} else {
					this.errorMessage.textContent = "Login error. Please try again later, server may be down.";
					this.errorMessage.classList.remove("hidden"); 
				}
			}
		}

		export default App;
