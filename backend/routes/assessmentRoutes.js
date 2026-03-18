import express from "express";
import {
  getQuestions,
  submitAssessment,
  getResult,
} from "../controllers/assessmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/questions", protect, getQuestions);
router.post("/submit", protect, submitAssessment);
router.get("/result", protect, getResult);

export default router;