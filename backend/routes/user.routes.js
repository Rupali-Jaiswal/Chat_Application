import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getAllUsers, getUserById, addFriend, deleteFriend } from "../controllers/user.controller.js";
import cors from "cors"


const router = express.Router();
router.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));

router.get("/get", protectRoute, getAllUsers);
router.get("/get/:id", protectRoute,getUserById);
router.patch("/addfriend/:id", protectRoute,addFriend);
router.delete("/deletefriend/:id", protectRoute,deleteFriend);

export default router;
