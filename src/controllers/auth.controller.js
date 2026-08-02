const userModel = require('../models/user.model'); 
const jwt = require("jsonwebtoken"); 
require('dotenv').config(); 
const bcrypt = require('bcryptjs');
const emailService = require('../services/email.service');

async function registerUser(req, res) {
  const { email, password, name } = req.body;

  try {
    const isExists = await userModel.findOne({ email: email });
    if (isExists) {
      return res.status(400).json({ 
        message: "Email already exists", 
        status: "failed" 
      });
    }

    const user = await userModel.create({ email, password, name });


    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '3d' }
    );

  
    res.cookie("token", token) ;

   
    return res.status(201).json({ 
      status: "success",
      user: { 
        _id: user._id, 
        email: user.email, 
        name: user.name 
      }
    });

  } catch (error) {
  
    console.error("Registration error:", error);
    
    return res.status(500).json({ 
      message: "Server error creating user" 
    });
  }
}
async function loginUSer(req , res) {

  const { email, password, name } = req.body;

 try {

   if ((!name && !email) || !password) {
       return res.status(400).json({ message: "Username/Email and password are required" });
    }



   const user = await userModel.findOne({
    $or:[
        {email},
        {name}
      ]
  }).select("+password")

  if(!user){
    return res.status(401).json({
      message:"user doesn't exist"
    })
  }


  const ispasswordValid = await bcrypt.compare(password , user.password);

  if(!ispasswordValid){
    return res.status(401).json({
      message : "Incorrect password , please try again"
    })
  }

  const token = jwt.sign({id : user._id}, process.env.JWT_SECRET);
  res.cookie("token" , token)

  return res.status(200).json({
    message : "login Successfull  ",
    user :{
      name : user.name,
      email : user.email
    }
  })

  await emailService.sendRegistrationEmail(user.email , user.name);


 }catch(error){
  console.log("login failure" , error)
  return res.status(400).json({
    message:"something went wrong with login  , please try again after sometime "
  })
 }

  
}
module.exports = { registerUser , loginUSer };
