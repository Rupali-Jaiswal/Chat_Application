import express from "express"
// const app=express();

import connectToMongoDB from "./db.js"
import path from "path";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import groupRoutes from "./routes/group.routes.js"

import { app, server} from "./socket/socket.js";

import dotenv from "dotenv"
import cookieParser from "cookie-parser";
dotenv.config();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true })); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser())

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

app.use('/api/auth',authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)
app.use('/api/group', groupRoutes);

const port=process.env.port || 5000 

app.get('/', (req,res)=>res.send("hellow world"))

const host=`http://localhost:${port}`

server.listen(port,()=>{ 
    connectToMongoDB()
    console.log(`server is running on port: ${port}`)
})
