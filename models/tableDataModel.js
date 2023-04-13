
const mongoose=require('mongoose')
const schema=mongoose.Schema;

let tabledata=new schema({
    workTitle:{
        type:String,
        required:true,
        uppercase:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        uppercase:true,
        trim:true
    },
    startDate:{
        type:String,
        required:true
    },
    endDate:{
        type:String,
        required:true
    },  
    file:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true,

    }
},
    {
        collection:"tableData"
    }
)

//collection name will be tableData
module.exports=mongoose.model("TableData",tabledata)