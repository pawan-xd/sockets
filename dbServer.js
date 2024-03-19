// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const app = express();
// Create Express app

app.use(express.urlencoded({ extended: true })); //used for extracting data from form
app.use(express.static(__dirname)); //used for accessing html files because live server doesnt work

// Define route for user registration
app.post("/register", async function (req, res) {
	try {
		console.log(req.body);
		const { username, password } = req.body;
		console.log("Credentials received:", username, password);
		await createUser(username, password);
		res.send("User created successfully");
	} catch (error) {
		console.error("Error creating user:", error);
		res.status(500).send("An error occurred");
	}
});

// Define Mongoose schema and model
const userSchema = new mongoose.Schema({
	username: {
        type: String,
        unique: true
    },
	password: String,
});
const User = mongoose.model("User", userSchema);

// Connect to MongoDB
async function connectToMongoDB() {
	try {
		await mongoose.connect("mongodb://localhost:27017/chat");
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
	}
}

// Function to create a new user
async function createUser(username, password) {
	console.log("Creating user:", username);
	const user = new User({ username, password });
	await user.save();
}

// Start the Express server
async function startServer() {
	await connectToMongoDB(); // Connect to MongoDB before starting the server
	app.listen(3001, () => {
		console.log("Express server started on port 3001");
	});
}

// Call the function to start the server
startServer();
