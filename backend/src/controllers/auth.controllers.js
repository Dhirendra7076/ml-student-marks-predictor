import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";
import User from "../model/User.js";
import { useState } from "react";

export const register = async (req , resp) =>{
    const {fullName , email , password , phoneNumber} = req.body;

    try {
        if(!email || !fullName || !password) 
        return resp.status(400).json({message: "All fields are required"})

    if(password.length<8) 
        return resp.status(400).json({message : "Password must be atleast 8 characters long"})

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email))
        return resp.status(400).json({message : "Invalid email format"})

    const existingUser = await User.findOne({email})
    if(existingUser)
        return resp.status(400).json({message : "User already exists"})

    //const hashedPassword = await bcrypt.hash(password , 10); this is removeed since we have already used the pre(save) hook in the User model so no need to hash the password twice

const newUser = await User.create({
    fullName , 
    email , 
    password , 
    phoneNumber
});

/*why use jwt token here?
If we dont use the token here then first user is registered then is redirected to the login page then ligin takes place
but if we use the token here only then the user wont have to login after registering and will be logged in automatically */
const token = jwt.sign({id : newUser._id} , process.env.JWT_SECRET_KEY, {
    expiresIn: "7d"
})
resp.cookie("token" , token, {
    maxAge : 7*24*60*60*1000,
    httpOnly : true,
    sameSite : "strict",
    secure : process.env.NODE_ENV==="production"
})

newUser.password = undefined;
resp.json({success : true , user: newUser})

console.log("Decoded token:", decoded);
console.log("req.user:", req.user);


    } catch (error) {
        console.error("Error in register controller" , error)
        resp.status(500).json({message :error.message})
    }

}

export const login = async(req, resp)=> {
    try {
        const{email , password } = req.body

        if(!email || !password) 
            return resp.status(400).json({message : "All fields are required"})
        
        const user = await User.findOne({email})
        if(!user) 
            return  resp.status(400).json({message : "Check the credentials"})

        const ispasswordCorrect = await user.matchPassword(password)
        if(!ispasswordCorrect)
            return resp.status(400).json({message : "Check the credentials"})


        const token = jwt.sign({id: user._id} , process.env.JWT_SECRET_KEY,{
            expiresIn : "7d"
        })

        resp.cookie("token" , token,{
            maxAge : 7*24*60*60*1000,
            httpOnly : true,
            sameSite : "strict",
            secure: process.env.NODE_ENV === "production"

        }
    )
    resp.json({message: "Logged in successfully" , success : true , user})
        
    } catch (error) {
        console.error("Error in login controller" , error)
        resp.status(400).json({message : error.message})
    }
}

export async function logout(req,resp){
    resp.clearCookie("token" , {
        httpOnly : true,
        sameSite : "strict",
        secure : process.env.NODE_ENV ==='production'
    })
    resp.status(200).json({success: true , message: "Logout successfully"})
}

export const getMe = async (req ,resp) => {//This allows frontend to check if user is logged in.
    const user = await User.findById(req.user).select("-password");
    resp.json(user);
}
 

