import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import cors from "cors"

const router = express.Router();
router.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));


router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
