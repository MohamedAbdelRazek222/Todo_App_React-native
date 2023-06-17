const { toDoModel } = require("../DB/Model/ToDo")


const getAllTodos=async (req,res)=>{
console.log({s:req.user._id})
const findToDos=await toDoModel.find({userId:req.user._id})


res.status(200).json({

    status:'success',
    data:{
        todos:findToDos
    }
})


}

const deleteTODo=async (req,res)=>{

    const {id}= req.params
    console.log({id})
    await toDoModel.deleteOne({_id:id})



res.status(200).json({

    status:'success',

})
}
const addTODo=async (req,res)=>{


const {title,content}=req.body;
const newtoDo=new toDoModel({title,content,userId:req.user._id})
const savedToDo=await newtoDo.save()    


res.status(200).json({

    status:'success',
    data:{
        toDo:savedToDo
    }

})


}



module.exports ={getAllTodos,deleteTODo,addTODo}