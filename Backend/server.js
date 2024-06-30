require('dotenv').config()

// importing express module
const express = require('express')
const allRoutes = require('./routes/mainRoutes')


// express app
const app = express()

// middleware
app.use(express.json())
app.use((req,res,next)=>{
    //console.log(req.path,req.method)
    next()
})

// routes
app.use('/api/home',allRoutes)


//listen for requests
app.listen(process.env.PORT, ()=> {
    console.log('connected to db & listening on port',process.env.PORT)
})
