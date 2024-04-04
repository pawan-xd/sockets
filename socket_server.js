const WebSocket = require("ws");

function setupSocket() {
	const port = process.env.PORT1 || 8080;
	const server = new WebSocket.Server({ host: "0.0.0.0", port: port });

	server.on("listening", () => {
		const address = server.address();
		console.log(
			`WebSocket server is running at ${address.address}:${address.port}`
		);
	});

	server.on("error", (error) => {
		console.error("WebSocket server failed to start:", error);
	});

	server.on("connection", function connection(ws) {
		console.log("conenction establised with client");

		ws.on("message", (data) => {
			server.clients.forEach((client) => {
				client.send(JSON.stringify(JSON.parse(data)));
			});
		});

		ws.on("close", () => {
			console.log("Connection closed");
		});
	});
}

module.exports= setupSocket;
