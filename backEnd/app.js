require('dotenv').config()
const express = require('express')
const connection = require('./DB/connection')
const { userRouter,toDoRouter } = require('./indexRoute')
const cors = require('cors');
const morgan=require('morgan')
const app = express()
app.use(express.json())
const coreOptions={
    origin: "*",
    methods: "GET,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200 
}
app.use(cors(coreOptions));
app.use(morgan("dev"))
const port = 4000

app.use('/api/v1',userRouter)
app.use(toDoRouter)




connection()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))