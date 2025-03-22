const {Router} = require("express");
const {adminModel} = require("../db");
const bcrypt = require("bcrypt");
const adminRouter = Router();
const jwt = require("jsonwebtoken");
const JWT_ADMIN_PASSWORD=process.env.JWT_ADMIN;

adminRouter.post("/signup",async (req,res)=>{
    const {email, password, firstName, lastName} = req.body;
    const hashedPassword =await  bcrypt.hash(password,10);
    try{
        await adminModel.create({
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

adminRouter.post("/signin",async(req,res)=>{
    const {email,password} = req.body;

    try{
        const admin = await adminModel.findOne({
            email:email
        })
    
        const isMatched = await bcrypt.compare(password, admin.password);
    
        if(!isMatched){
            res.json({
                message: "fcked"
            })
        }
        else{
            const token = jwt.sign({
                id: admin._id
            },JWT_ADMIN_PASSWORD)
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

adminRouter.post("/course",(req,res)=>{
    res.json({
        message: "endpoint"
    })
})
adminRouter.put("/course",(req,res)=>{
    res.json({
        message: "endpoint"
    })
})
adminRouter.get("/course/bulk",(req,res)=>{
    res.json({
        message: "endpoint"
    })
})

module.exports = {
    adminRouter: adminRouter
}