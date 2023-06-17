const { auth } = require('../../middleWear/auth')
const { getAllTodos, addTODo, deleteTODo } = require('../todoCrud')

const router=require('express').Router()

router.get('/todo',auth(),getAllTodos)
router.post('/todo',auth(),addTODo)
router.delete('/todo/:id',auth(),deleteTODo)
module.exports=router



