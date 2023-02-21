let {Schema,model}=require("mongoose")

let contactSchema=new Schema({
firstName:{
    type:String,
    required:true
},
lastName:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true

},
phno:{
    type:Number,
    required:true

},
description:{
    type:String,
    required:true

},

}, {timestamps:true}

)

module.exports=model("content",contactSchema)
