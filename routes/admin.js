const {Router} = require("express");
const adminRouter = Router();
const {adminModel} = require("../db");
adminRouter.post("/signup",(req,res)=>{
    
    res.json({
        message: "endpoint"
    })
})

adminRouter.post("/signin",(req,res)=>{
    res.json({
        message: "endpoint"
    })
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