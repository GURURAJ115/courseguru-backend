const {Router} = require("express");
const userRouter = Router();

userRouter.post("/signup",(req,res)=>{
    res.json({
        message: "endpoint"
    })
})

userRouter.post("/signin",(req,res)=>{
    res.json({
        message: "endpoint"
    })
})

userRouter.get("/purchases",(req,res)=>{
    res.json({
        message: "endpoint"
    })
})

module.exports = {
    userRouter: userRouter
}