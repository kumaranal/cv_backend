 const bcrypt = require("bcryptjs");
 require('dotenv').config();


const demofn=async(req,res,next)=>{
    console.log("value",req);
    // const assword= await bcrypt.hash(req.body.password,10);
    // // console.log(assword);
    // req.body.password=assword;    

    // next();  //im middle ware we have to call next ,to end middleware 
}
module.exports=demofn;