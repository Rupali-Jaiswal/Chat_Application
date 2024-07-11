import express from "express"
const app=express();

import connectToMongoDB from "./db.js"

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import dotenv from "dotenv"
dotenv.config();

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)


app.use('api/auth',authRoutes)
app.use('api.message', messageRoutes)
app.use('api/user', userRoutes)

const port=process.env.port|| 5000 
app.get('/', (req,res)=>res.send("helow world"))


app.listen(port,()=>{
    connectToMongoDB()
    console.log(`server is running on port: ${port}`)
})