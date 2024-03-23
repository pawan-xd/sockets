const express=require("express");
const app=express();

const {connectToMongoDB}= require("./dbServer")
const registerRoute= require("./registerRoute")

app.use(express.urlencoded({ extended: true })); //used for extracting data from form (by default its encoded in url)
app.use(express.static(__dirname)); //used for accessing html files because live server doesnt work

app.use(registerRoute);

// Start the Express server
async function startServer() {
	await connectToMongoDB(); // Connect to MongoDB before starting the server
	app.listen(3000, () => {
		console.log("Express server started on port 3000");
	});
};

startServer();