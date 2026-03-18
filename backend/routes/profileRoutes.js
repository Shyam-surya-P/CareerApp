import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getProfile, upsertProfile } from "../controllers/profileController.js";

const router = express.Router();

router.get("/", protect, getProfile);
router.post("/", protect, upsertProfile);

export default router;

