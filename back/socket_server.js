const WebSocket = require("ws");
const { saveMessage } = require("./dbServer");

//this file is for starting the backend socket server on port 3001
function setupSocket() {
	const server = new WebSocket.Server({ port: process.env.PORT });

	let connectedClients = 0;

	server.on("listening", () => {
		console.log("socket server has started");
	});

	server.on("connection", function connection(ws) {
		//ws is one individual webSocket connection between the server and a client.
		// each client has a separate ws
		connectedClients += 1;
		server.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(
					JSON.stringify({ type: "count", count: connectedClients })
				);
			}
		});
		console.log("conenction establised with client");

		ws.on("message", (data) => {
			// console.log(JSON.parse(data));

			// the message from the clent is in form of stringified JSON so we have to parse it first
			let msgg = JSON.parse(data);

			//this function saves the message into the database along with the sender name and message timing
			try{
				console.log(msgg);
				saveMessage(msgg.txt, msgg.name, msgg.timestamp);
			}
			catch(error){
				console.log(error)
			}

			server.clients.forEach((client) => {
				client.send(JSON.stringify(JSON.parse(data)));
			});
		});

		ws.on("close", () => {
			connectedClients -= 1;
			server.clients.forEach((client) => {
				if (client.readyState === WebSocket.OPEN) {
					client.send(
						JSON.stringify({
							type: "count",
							count: connectedClients,
						})
					);
				}
			});
			console.log("Connection closed");
		});
	});
}
setupSocket();
