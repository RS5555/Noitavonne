const express=require("express");
const router=express.Router();
const login=require("../models/signUp");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
const json=require("body-parser");

dotenv.config();

router.use(json.json());

router.post('/',async(req,res)=>{
    const {username,password}=req.body;
    try {
        const user=await login.findOne({username});

        if(!user){
            return res.status(400).json({message:"User does not exist"});
        }
        const ispasswordvalid=await bcrypt.compare(password,user.password);
        if(!ispasswordvalid){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
        res.status(200).json({message:"Login successful",token,user});
    } catch (error) {
        res.status(400).json({message:"Something went wrong",error:error});
    }
})
module.exports=router