const express=require("express");
const router=express.Router();

const {User}=require("./dbServer");

router.post("/login", async function userLogin(req, res){
    console.log("login request recieved");
    const {user, pass} = req.body;
    let x=await User.findOne({username:user});
    console.log(x);

    if(x && x.password===pass){
        console.log("matched");
        req.session.username=user;
        // res.status(200).json({success:true});
        res.status(200).json({success:true,name:user});
    }
    else{
        console.log("no matches");
        res.status(401).json({success:false});
    }
    
})


module.exports=router;