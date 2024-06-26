const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../model/user.model")
const {BlackListModel} = require("../model/blacklist.model")
const { auth } = require("../middlewares/auth.middleware")
const { access } = require("../middlewares/access.middleware")

const adminRouter = express.Router()

//login
adminRouter.post("/login", async(req,res) => {
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
adminRouter.post("/logout",auth,async(req,res)=>{
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
//get

adminRouter.get("/",auth,access("admin"),async(req,res)=>{
	try{
		const users = await UserModel.find();
		res.status(200).json({users})
	}
	catch(e){
		res.status(400).json({err})
	}
})

//get by userid 
 
adminRouter.get("/:id",auth,access("admin"),async(req,res)=>{
	const { id } = req.params
	try{
		const user = await UserModel.findOne({_id:id});
		res.status(200).json({user})
	}
	catch(e){
		res.status(400).json({err})
	}
})
 


module.exports = {
	adminRouter  
}