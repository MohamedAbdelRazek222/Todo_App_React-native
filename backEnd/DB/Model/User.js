const { default: mongoose } = require("mongoose")

const userSchema=new mongoose.Schema({

name:{
    type:String,
    required:[true,'Please Enter Your Name']
},
email:{
    type:String,
    required:[true,'Please Enter Your Email'],
    unique:true

},
password:{
    type:String,
    minLength:[5,'Sorry min length is 5'],
    required:[true,'Please Enter Your Password']
}

},{timestamps:true})


const userModel=mongoose.model('user',userSchema)


module.exports = {userModel}