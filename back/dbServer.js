// Import required modules
const mongoose = require("mongoose");

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
		await mongoose.connect(process.env.MONGO_PRIVATE_URL);
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

module.exports={connectToMongoDB, createUser, User};