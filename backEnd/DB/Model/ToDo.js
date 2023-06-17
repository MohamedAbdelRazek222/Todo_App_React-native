const { default: mongoose } = require("mongoose")

const toDoSchema=new mongoose.Schema({

title:{
    type:String,
},
content:{
    type:String,

},
userId:{
 type:mongoose.Schema.Types.ObjectId,
 ref:'user',
    
   }

},{timestamps:true})


const toDoModel=mongoose.model('todo',toDoSchema)


module.exports = {toDoModel}