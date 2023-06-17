const { userModel } = require("../DB/Model/User")
const bcrypt=require('bcrypt')

const jwt=require('jsonwebtoken')

const signUp=async(req,res)=>{

try{
const {name,email,password} = req.body
console.log(name,email,password)
if(name&&email&&password){
const hashedPassword =await bcrypt.hash(password,parseInt(process.env.saltRounds)) 

const newUser=new userModel({name,email,password:hashedPassword})
const savedUser=await newUser.save()    
res.status(201).json({
    status:'success',
    data:{
        user:savedUser
    }
})


}else{

res.json({

    status:'error',
    message:'please Check you fill all fields'
})


}
}catch(err){
    if(err.keyValue?.email){
        res.json({
            status:'error',
            message:'please change this email'
        })
    }else{

    res.json({
        status:'error',
        message:'Error in the request'
    })
}
}


}


const signIn=async(req, res)=>{

    
const {email,password}=req.body

if(email && password){

const findUser=await userModel.findOne({email})

if(!findUser){

res.status(400).json({
    status:'error',
    message:'This Email is not Valid'
})

}else{
    const match=await bcrypt.compare(password,findUser.password)
    if(!match){
    
        res.status(400).json({
            status:'error',
            message:'The Password or Email is not Valid'
        })
    }else{

        const token=jwt.sign({_id:findUser._id,isLogged:true},process.env.loginToken,{expiresIn:'3h'})
    
        res.status(200).json({ 
            status:'success',
            data:{
                token
            }
        })
    }

}


    
}else{

    res.json({

        status:'error',
        message:'please Check you fill all fields'
    })
    

}


}


module.exports ={signUp,signIn}