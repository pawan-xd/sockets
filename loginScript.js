const nameInput = document.getElementById("nameInput");
const passInput = document.getElementById("passInput");
const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", function login(event) {
	event.preventDefault();
	if (nameInput.validity.valid && passInput.validity.valid) {
		const username = nameInput.value;
		const password = passInput.value;
		sendData(username, password);
	} else {
		nameInput.reportValidity();
		passInput.reportValidity();
	}
});

async function sendData(username, password) {
	try {
		const response = await fetch("/login", {
			method: "POST",
			body: { username, password },
		});
        console.log(await response.json());
	} catch (e) {
		console.error(e);
	}
}
