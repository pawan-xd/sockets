const express = require("express");
const session = require("express-session");
const mongoSession = require("connect-mongodb-session")(session);
const app = express();

const sessionStore = new mongoSession({
	uri: process.env.mongoURI,
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
const messageHistory = require("./back/messageHistory");

app.use(express.urlencoded({ extended: true })); //used for extracting data from form (by default its encoded in url)

app.use(express.static("views"));

app.use(express.json());

app.use(registerRoute);
app.use(loginRoute);
app.use(messageHistory);

app.get("/", (req, res) => {
	res.redirect("/chats");
});

app.get("/login", (req, res) => {
	res.render("login");
});
app.get("/register", (req, res) => {
	res.render("registration");
});

app.get("/chats", function sessionChecker(req, res) {
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

// Start all servers
async function startServer() {
	await connectToMongoDB(); // Connect to MongoDB before starting the server
	// setupSocket(); //starts the websocket server
	app.listen(3000, () => {
		console.log("Express server started on port 3000");
	});
}

startServer();
