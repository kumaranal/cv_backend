const bcrypt = require("bcryptjs");
const user=require("../models/loginModel");
const jwt=require("jsonwebtoken");

const JWTCODE="mycode";
const jwtfn=async(req,res,next)=>{
    console.log("req",req.body.authtoken);
    const token= req.body.authtoken;
    if(!token){
        res.status(401).send({error: "please give valid auth token"})
    }
    try{
        const data=jwt.verify(token, JWTCODE);
        req.user=data.username;
        console.log("id",data.username)
        next();
    }catch(e){
        res.status(401).send({error: "please give valid auth token"})

    }
    // next();  //im middle ware we have to call next ,to end middleware 
}
module.exports=jwtfn;