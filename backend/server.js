// const express = require("express")
import express from "express"
const app=express();

import dotenv from "dotenv"
dotenv.config();


const port=process.env.port|| 5000 
app.get('/', (req,res)=>res.send("helow world"))
app.listen(port,()=>console.log(`server is running on port: ${port}`))