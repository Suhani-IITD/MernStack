const express = require('express')
const router = express.Router()
const {login,signUp }= require('../controllers/mainControllers')

//const requireAuth = require('../middleware/requireAuth')
//router.use(requireAuth)
// this is the login page

router.post('/login' , login)

// this is signup page

router.post('/signup', signUp)
    

// this is a single or admin homepage
// router.get('/signup', (req,res) => {
//     res.json({mssg:'this is a signup'})
// })



module.exports = router