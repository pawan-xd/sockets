const ws = new WebSocket("ws://localhost:3000");

ws.addEventListener("open", () => {
	alert("Connection established");
});

// ws.addEventListener("message", (event) => {
//     console.log("Received:", event.data);
// });

ws.onmessage = (event) => {
	console.log("Received:", event.data);
};

const sendButton = document.getElementById("sendButton");
const textArea = document.getElementById("textArea");

sendButton.addEventListener("click", () => {
	let message = textArea.textContent;
	console.log(message);
	ws.send(message);
	textArea.textContent = "";
});
