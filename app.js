const express = require("express");
const session = require("express-session");
const mongoSession = require("connect-mongodb-session")(session);
const app = express();
const port = process.env.PORT || 3000;
const WebSocket = require('ws');

const sessionStore = new mongoSession({
	uri: "mongodb://mongo:XAogsdKUAXNzIVJekhAEuORhbGKRbCAu@mongodb.railway.internal:27017",
	collection: "sessions",
});

app.set("view engine", "ejs");

app.use(
	session({
		secret: "super secret",
		saveUninitialized: false,
		resave: false,
		store: sessionStore,
	})
);

//mongo db connection function from dbserver
const { connectToMongoDB } = require("./back/dbServer");
const registerRoute = require("./back/registerRoute");
const loginRoute = require("./back/loginRoute");

app.use(express.urlencoded({ extended: true })); //used for extracting data from form (by default its encoded in url)

app.use(express.static("views"));

app.use(express.json());

app.use(registerRoute);
app.use(loginRoute);

app.get("/", (req, res) => {
	res.redirect("/chats");
});

app.get("/login", (req, res) => {
	res.render("login");
});
app.get("/register", (req, res) => {
	res.render("registration");
});

app.get("/chats", (req, res) => {
	if (req.session.username) {
		console.log("successfully entering chats page");
		res.render("chats");
	} else {
		console.log("redirecting to login");
		req.session.destroy((err) => {
			if (err) {
				throw err;
			}
		});
		res.redirect("login");
	}
});

// Start the Express server
async function startServer() {
	await connectToMongoDB(); // Connect to MongoDB before starting the server
	app.listen(port, "0.0.0.0", function () {
		console.log("Express server started on port 3000");
	});
	const server = new WebSocket.Server({ host: "0.0.0.0", port: 3001 });

	server.on('listening', () => {
		console.log('WebSocket server started successfully');
	});

	server.on('error', (error) => {
		console.error('WebSocket server failed to start:', error);
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

startServer();
