const {Router} = require("express");
const {userModel} = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_USER_PASSWORD=process.env.JWT_USER;
const userRouter = Router();
userRouter.post("/signup",async (req,res)=>{
    const {email, password, firstName, lastName} = req.body;
    const hashedPassword =await  bcrypt.hash(password,10);
    try{
        await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })
        res.json({
            message: "success"
        })
    }
    catch(error){
        console.log("error"+error);
        res.json({
            message: "fucked"
        })
    }
})

userRouter.post("/signin",async(req,res)=>{
    const {email,password} = req.body;

    try{
        const user = await userModel.findOne({
            email:email
        })
    
        const isMatched = await bcrypt.compare(password, user.password);
    
        if(!isMatched){
            res.json({
                message: "fcked"
            })
        }
        else{
            const token = jwt.sign({
                id: user._id
            },JWT_USER_PASSWORD)
            res.json({
                token: token
            })
        }
    }catch(e){
        console.log(e);
        res.json({
            message: "internal server error"
        })
    }
})

userRouter.get("/purchases",(req,res)=>{
    res.json({
        message: "endpoint"
    })
})

module.exports = {
    userRouter: userRouter
}