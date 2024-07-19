import express from "express";
import cors from "cors"
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();
router.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

export default router;
