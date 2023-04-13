const bcrypt = require("bcryptjs");


const bycriptfn=async(req,res,next)=>{
    // console.log(req.body.password);
    const assword= await bcrypt.hash(req.body.password,10);
    // console.log(assword);
    req.body.password=assword;    

    next();  //im middle ware we have to call next ,to end middleware 
}
module.exports=bycriptfn;