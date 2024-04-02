const nameInput = document.getElementById("nameInput");
const passInput = document.getElementById("passInput");
const loginButton = document.getElementById("loginButton");
const wrapper = document.getElementById("verify");

loginButton.addEventListener("click", function login(event) {
	event.preventDefault();
	if (nameInput.validity.valid && passInput.validity.valid) {
		const user = nameInput.value;
		const pass = passInput.value;
		sendData(user, pass);
	} else {
		nameInput.reportValidity();
		passInput.reportValidity();
	}
});

async function sendData(user, pass) {
	try {
		const response = await fetch("/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ user, pass }),
		});

		let data = await response.json();
		if (data.success) {
			wrapper.innerHTML = `<div class="alert alert-success" role="alert">
			Login successful. Redirecting...
		  </div>`;
		  localStorage.setItem("name", data.name );
		  setTimeout((function redirector(){window.location.href="/chats"}),2000);
		} 
		else {
			wrapper.innerHTML = `<div class="alert alert-warning" role="alert">
			Invalid Credentials. Try again
			</div>`;
		}
		wrapper.classList.toggle('show');
		setTimeout(()=>{wrapper.classList.toggle('show');},1500)
		
	} catch (e) {
		console.error(e);
	}
}
