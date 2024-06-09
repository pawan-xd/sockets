const express=require("express");
const router=express.Router();

const {Message}=require("./dbServer")

router.post("/messageHistory", async function messageHistory(req, res) {
	let messages = await Message.find().sort({ _id: -1 }).limit(20);
    console.log("sending messages")
    res.json(messages);
})

module.exports=router