const mongoose=require('mongoose')
const Schema=mongoose.Schema;

let tokenshema=new Schema({
   userid:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:"user",
    unique:true,
   },
   token:{type:String,required:true},
   createdAt:{type:Date,default:Date.now(),expires:3600}
})



module.exports=mongoose.model("TokenShema",tokenshema)