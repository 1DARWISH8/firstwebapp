// create express app

const express = require('express')
const app = express();

// Connect to react app
const path = require('path')
app.use(express.static(path.join(__dirname,'../client/build')))

// configure environment variables
require('dotenv').config()
// add body parsing middleware
app.use(express.json())


// import api
const userApp = require('./APIs/user-api');

// forward request to userApp when path starts
app.use('/user-api',userApp)


// error handler
app.use((err,req,res,next)=>
{
    res.send({message:"ERROR Occured",payload:err.message})
    // res.send({message:err.message,payload:err})
})

// assign port number
const PORT=process.env.PORT||5000

app.listen(PORT,()=>console.log(`Web server is listening on port ${PORT}`))
