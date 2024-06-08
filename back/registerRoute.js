const express=require("express");
const router=express.Router();

const {createUser} = require("./dbServer.js")

// Define route for user registration

router.post("/register", async function (req, res) {
	console.log("Received POST request to /register");
	try {

		console.log(req.body);
		const { username, password } = req.body;
		console.log("Credentials received:", username, password);
		await createUser(username, password);

		res.redirect("login")
	} catch (error) {
		console.error("Error creating user:", error);
		res.status(500).send("An error occurred");
	}
});

module.exports=router;