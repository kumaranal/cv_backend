const mongoose=require('mongoose')
const schema=mongoose.Schema;

let user=new schema({
    name:{
        type:String,
        required:true,
        uppercase:true,
        unique:[true,"name has to be unique"],
        trim:true

    },
    email:{
        type:String,
        required:true,
        unique : true,
        dropDups: true,
        uppercase:true,
        trim:true


    },
    password:{
        type:String,
        required:true,
        minlength:[3,"minimum letter 3"],
        trim:true


    },
    confirm_password:{
        type:String,
        required:true,
        minlength:3,
        trim:true


    },
    userId:{
        type:String,
        required:true,

    },
    verified:{
        type:Boolean,
        default:false
    }
},
    {
        collection:"userlogin"
    }
)



module.exports=mongoose.model("user",user)