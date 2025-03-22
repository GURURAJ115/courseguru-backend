const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const app = express();

app.use(express.json());

app.use("/user",userRouter);
app.use("/admin",adminRouter);
app.use("/course",courseRouter)

async function main(){
    const MONGO_DB_URL=process.env.MONGO_URL;
    await mongoose.connect(MONGO_DB_URL).then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));;
    console.log("connected to mongo");
    app.listen(3000);
    console.log("Listening on port 3000");
}

main();