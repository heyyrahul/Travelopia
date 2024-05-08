const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../model/user.model")
const {BlackListModel} = require("../model/blacklist.model")
const { auth } = require("../middlewares/auth.middleware")
const {access} = require("../middlewares/access.middleware")

const userRouter = express.Router() 

//Register
userRouter.post("/register", async(req,res) => { 
	
	try {
		const { username, email, password, role} = req.body
		let email1 = await UserModel.findOne({email:email});
		if(email1){
			res.status(200).json({msg:"You are already registered please log in"})
		}
		else{
			bcrypt.hash(password, 5, async(err, hash) => {
				if (err) {
					res.status(200).json({err})
				} else {
					const user = new UserModel({
						username,
						email,
						role,
						password: hash
					})
					await user.save()
					res.status(200).json({msg:"The new user has been registered!"})
				}})
		}
		
		
	} catch(err) {
		res.status(400).json({err})
	}
}) 

//Login
userRouter.post("/login", async(req,res) => {
	const { email, password } = req.body
	try {
		const user = await UserModel.findOne({email})
		if (user) {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					res.status(200).json({msg:"Login Successful!",token:jwt.sign({userId:user._id,name:user.username},process.env.Key),user:user.username})
				} else {
					res.status(400).json({msg: "passwordword does not match"})
				}
			})
		} else {
			res.status(400).json({msg: "Wrong Credentials"})
		}
	} catch(err) {
		res.status(400).json({err})
	}
})

//logout

userRouter.post("/logout",auth,async(req,res)=>{
	const token = req.headers.authorization;
	try{
		const blacklist = new BlackListModel({
			token
		});
		await blacklist.save();
		res.status(200).json({msg:"Logout Successful!"})
	}
	catch(e){
		res.status(400).json({err})
	}
})




module.exports = {
	userRouter  
} 