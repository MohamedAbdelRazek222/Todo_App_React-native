const { default: mongoose } = require("mongoose")

const connection=()=>{



    return mongoose.connect('mongodb://0.0.0.0:27017/reactNative').then((res)=>{

console.log('connected DB ......')

    }).catch((err)=>console.log('error connection'))
}

module.exports=connection