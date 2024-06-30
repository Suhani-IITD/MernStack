const {signUpUser,loginUser,db} = require('../models/usermodel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id},process.env.SECRET,{expiresIn : '3d'})
  
  }


const login = async (req,res) => {
    const {id,pswd} = req.body
    try {
        const user = await loginUser(id,pswd)
        if(user[0].userid) {
            const token = createToken(id)
            res.status(200).json({user,token})
        }

        else {
            res.status(200).json(user)
        }
        
    }
    catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

const signUp = async (req,res) => {
    const {id, pswd,role} = req.body
    try {
        const user = await signUpUser(id, pswd,role)
        if(user[0].userid) {
            const token = createToken(id)
            res.status(200).json({user,token})
        }
        else {
            res.status(200).json(user)
        }
    }
    catch(error) {
        res.status(500).json({ error: error.message })
    }
}




module.exports = {login,signUp}