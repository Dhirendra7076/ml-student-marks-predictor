import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type : String, 
        required : true,
        unique : true,
    },
    phoneNumber : {
        type : Number, 
        required : true,
        unique : true,
    },
    password : {
        type : String, 
        minlength : 8 , 
        required : true,
    },
    profilePic : {
        type : String , 
        default: ""
    }
} , {timestamps : true})

userSchema.pre("save" , async function() { //if using async function dont use next (new verser of mongoose)
    if(!this.isModified("password")) return ;

    
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password , salt)

        
  } )

userSchema.methods.matchPassword = async function name(enteredPassword) {
    const ispasswordCorrect = await bcrypt.compare(enteredPassword , this.password);
    return ispasswordCorrect
}

const User = mongoose.model("User" , userSchema)

export default User