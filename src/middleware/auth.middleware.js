const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config()

async function  authMiddleware(req , res) {
    

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.status(401).json({
            message : "Unauthorized Access ! token missing "
        })
    }

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET)


        const user = await userModel.findOne( user.userId)
        req.user = user 

        return  next()


    }catch(err){
        return res.status(401).json({
            message : "Unauthorized Access ! token missing "
        })
    }
    
}


module.exports = {authMiddleware};