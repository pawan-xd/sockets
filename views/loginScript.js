// Get references to DOM elements
const nameInput = document.getElementById("nameInput");  // Input field for username
const passInput = document.getElementById("passInput");  // Input field for password
const loginButton = document.getElementById("loginButton");  // Button for login
const wrapper = document.getElementById("verify");  // Wrapper for displaying messages

// Add click event listener to the login button
loginButton.addEventListener("click", function login(event) {
	event.preventDefault();  // Prevent default form submission behavior
	
	// Check if the input fields are valid using builtIn css validity checking
	if (nameInput.validity.valid && passInput.validity.valid) {
		const user = nameInput.value;  // Get the username value
		const pass = passInput.value;  // Get the password value
		sendData(user, pass);  // Send the data to the server
	} else {
		// Report validity errors to the user
		nameInput.reportValidity();
		passInput.reportValidity();
	}
});

// Function to send login data to the server
async function sendData(user, pass) {
	try {
		const response = await fetch("/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ user, pass }),  // Send user and pass as JSON
		});

		let data = await response.json();  // Parse the JSON response
		// response comes from loginRoute.js
		if (data.success) {
			// Display success message
			wrapper.innerHTML = `<div class="alert alert-success" role="alert">
			Login successful. Redirecting...
			</div>`;
			
			// Save the username to local storage
			localStorage.setItem("name", data.name);
			
			// Redirect to the chats page after 2 seconds
			setTimeout(() => {
				window.location.href = "/chats";
			}, 2000);
		} else {
			// Display invalid credentials message
			wrapper.innerHTML = `<div class="alert alert-warning" role="alert">
			Invalid Credentials. Try again
			</div>`;
		}
		
		// Show and hide the wrapper with a message
		wrapper.classList.toggle('show');
		setTimeout(() => {
			wrapper.classList.toggle('show');
		}, 1500);
	} catch (e) {
		// Log any errors to the console
		console.error(e);
	}
}
