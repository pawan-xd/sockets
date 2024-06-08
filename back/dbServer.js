// Import required modules
const mongoose = require("mongoose");
const uri=`mongodb+srv://kitrowan07:xS6AuCWtBI3IuZJc@cluster0.arb120b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/chat`
// Define Mongoose schema and model for users
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true  // Ensure the username is unique
	},
	password: String,  // Store user passwords 
});
const User = mongoose.model("User", userSchema);  // Create the User model. The messages are stored in a database named User

// Define Mongoose schema and model for messages
const messageSchema = new mongoose.Schema({
	txt: String,     // Text of the message
	name: String,    // Name of the user who sent the message
	timestamp: String  // Timestamp of when the message was sent
});
const Message = mongoose.model("Message", messageSchema);  // Create the Message model

// Connect to MongoDB
async function connectToMongoDB() {
	try {
		await mongoose.connect(uri);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
	}
}

// Function to create a new user
async function createUser(username, password) {
	try {
		console.log("Creating user:", username);
		const user = new User({ username, password });
		await user.save();
		console.log("User created successfully");
	} catch (error) {
		console.error("Error creating user:", error);
	}
}

// Function to save a message
async function saveMessage(txt, name, timestamp) {
	try {
		const message = new Message({ txt, name, timestamp });
		await message.save();
		console.log("Message saved successfully");
	} catch (error) {
		console.error("Error saving message:", error);
	}
}

// Export functions and models for use in other files
module.exports = {
	connectToMongoDB,
	createUser,
	User,
	Message,
	saveMessage
};
