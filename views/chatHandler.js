const ws = new WebSocket("ws://192.168.0.115:3001");

// ws.addEventListener("message", (event) => {
//     console.log("Received:", event.data);
// }); below is the alternative way to do the same thing

const countDisplay = document.getElementById("connectedCount");
const sendButton = document.getElementById("sendButton");
const textArea = document.getElementById("textArea");
const convoArea = document.getElementById("conversation");

function appendMessage(message) {
	let time = new Date(message.timestamp);
	time = time.getHours() + ":" + time.getMinutes();

	let newCard = document.createElement("div");
	newCard.classList.add("card");
	newCard.innerHTML = `<div class="card-body">
	    <h6 class="card-title">${message.name}</h6>
	    <p class="card-text">
	        ${message.txt}
	        <span class="badge text-bg-light float-end">
	            <em>${time}</em>
	        </span>
	    </p>
	</div>`;

	convoArea.appendChild(newCard);
	convoArea.scrollTop = convoArea.scrollHeight;
}

ws.onmessage = (event) => {
	const receivedMessage = JSON.parse(event.data);
	if (receivedMessage.type === "count") {
		// Update the UI with the current count of connected clients
		console.log(receivedMessage.count)
		countDisplay.textContent = `People Online: ${receivedMessage.count-1}`;
	} else {
		appendMessage(receivedMessage);
	}
};

// Function to handle sending message
const sendMessage = () => {
	let x = new Date();
	let message = {
		txt: textArea.textContent,
		name: localStorage.getItem("name"),
		timestamp: x,
	};

	ws.send(JSON.stringify(message));
	textArea.textContent = "";
};

// Add click event listener to sendButton
sendButton.addEventListener("click", sendMessage);

// Add keyup event listener to textArea
textArea.addEventListener("keyup", (event) => {
	// Check if the pressed key is Enter
	if (event.key === "Enter") {
		// Trigger click event on sendButton
		sendMessage();
	}
});

async function pastMessageLoader() {
	try {
		const response = await fetch("/messageHistory", { method: "POST" });

		let data = await response.json();
		data.reverse().forEach(appendMessage);
	} catch (error) {
		console.log(error);
	}
}

window.onload = pastMessageLoader;
