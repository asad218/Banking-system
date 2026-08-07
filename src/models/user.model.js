const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email :{
        type : String ,
        required :[ true , ' Email is required for creating a new user '],
        trim : true ,
        lowercase : true ,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email address"],
        unique: [true , "Email already exists"]

    },
    name :{
        type:String ,
        required:[true , "Name is required to create a new Acoount"]
    },
    password :{
        type:String ,
        required: [true , "please provide the password "],
        minLength:[6 , "password should contain more than 6 characters"],
        select : false 
    },
    sytemUSer:{
        type:Boolean,
        default:false,
        immutable:true,
        select:false
        
    }


} , {
    timestamps:true
})

userSchema.pre("save" , async function(next){
    if(!this.isModified("password")){
        return ;
    }

    const hash = await bcrypt.hash(this.password , 10)
    this.password = hash 

})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password , this.password)
    
}

const userModel = new mongoose.model("User" , userSchema);

module.exports = userModel ;