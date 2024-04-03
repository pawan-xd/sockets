const ws = new WebSocket("wss://sockets.railway.internal:3001");

// ws.addEventListener("message", (event) => {
//     console.log("Received:", event.data);
// }); below is the alternative way to do the same thing

const sendButton = document.getElementById("sendButton");
const textArea = document.getElementById("textArea");
const convoArea = document.getElementById("conversation");

ws.onmessage = (event) => {
	const data = JSON.parse(event.data);

	let newCard = document.createElement("div");
	newCard.classList.add("card");
	newCard.innerHTML = `<div class="card-body">
	    <h6 class="card-title">${data.name}</h6>
	    <p class="card-text">
	        ${data.txt}
	        <span class="badge text-bg-light float-end">
	            <em>${data.time}</em>
	        </span>
	    </p>
	</div>`;

	convoArea.appendChild(newCard);
    convoArea.scrollTop = convoArea.scrollHeight;
};

sendButton.addEventListener("click", () => {
	let x = new Date();
	let message = {
		txt: textArea.textContent,
		name: localStorage.getItem("name"),
		time: x.getHours() + ":" + x.getMinutes(),
	};

	ws.send(JSON.stringify(message));
	textArea.textContent = "";
});
