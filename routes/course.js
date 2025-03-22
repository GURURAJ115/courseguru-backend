const { Router } = require("express");
const courseRouter = Router();

courseRouter.get("/preview", (req, res) => {
    res.json({
        message: "endpoint"
    })
})

courseRouter.post("/purchase", (req, res) => {
    res.json({
        message: "endpoint"
    })
})

module.exports = {
    courseRouter: courseRouter
}