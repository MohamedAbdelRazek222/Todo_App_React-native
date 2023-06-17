const { signUp, signIn } = require('../regiteration')

const router=require('express').Router()


router.post('/signUp',signUp )
router.post('/signIn',signIn )


module.exports=router



