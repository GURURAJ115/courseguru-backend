const {Router} = require("express");
const {userModel, purchaseModel, courseModel} = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userMiddleware } = require("../middlewares/user");

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

userRouter.get("/purchases",userMiddleware, async (req,res)=>{
    const userId = req.userId;
    const purchases = await purchaseModel.find({
        userId
    });
    const coursesData = await courseModel.find({
        _id:{$in: purchases.map(x=>x.courseId)}
    })
    res.json({
        purchases,
        coursesData
    })
})

module.exports = {
    userRouter: userRouter
}