const {Router} = require("express");
const {adminModel, courseModel} = require("../db");
const bcrypt = require("bcrypt");
const adminRouter = Router();
const jwt = require("jsonwebtoken");
const { adminMiddleware } = require("../middlewares/admin");
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

adminRouter.post("/course",adminMiddleware,async (req,res)=>{
    const adminId = req.userId;

    const {title, description, price, imageUrl} = req.body;

    try{
        const course=await courseModel.create({
            title: title,
            description: description,
            price: price,
            imageUrl: imageUrl,
            creatorId: adminId
        })
        res.json({
            message: "endpoint",
            course: course._id
        })
    }
    catch(e){
        console.log(e);
    }
})

adminRouter.put("/course",adminMiddleware,async (req,res)=>{
    const adminId = req.userId;

    const {title, description, price, imageUrl, courseId} = req.body;

    try{
        const course=await courseModel.updateOne({
            _id: courseId,
            creatorId: adminId
        },{
            title: title,
            description: description,
            price: price,
            imageUrl: imageUrl
        })
        res.json({
            message: "course updated",
            course: course._id
        })
    }
    catch(e){
        console.log(e);
    }
})
adminRouter.get("/course/bulk",adminMiddleware,async (req,res)=>{
    const adminId = req.userId;
    const courses = await courseModel.find({
        creatorId: adminId
    });

    res.json({
        message: "endpoint",
        courses
    })
})

module.exports = {
    adminRouter: adminRouter
}