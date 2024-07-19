import express from "express";
import { createGroup, getGroupById, addMemberToGroup, removeMemberFromGroup, sendGroupMessage, getGroupMessages ,getAllGroup} from "../controllers/group.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import cors from "cors"


const router = express.Router();
router.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));


router.post("/create", protectRoute, createGroup);
router.get("/get/:id", protectRoute, getGroupById);
router.get("/get", protectRoute, getAllGroup);
router.post("/:id/add-member", protectRoute, addMemberToGroup);
router.post("/:id/remove-member", protectRoute, removeMemberFromGroup);
router.post("/:id/send-message", protectRoute, sendGroupMessage);
router.get("/:id/get-messages", protectRoute, getGroupMessages);

export default router;