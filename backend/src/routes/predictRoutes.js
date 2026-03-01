import express from 'express'
import { predictMarks , gethistory, deletehistory } from '../controllers/predictControllers.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/predict" ,protect, predictMarks);
router.get("/history" ,protect,gethistory);
router.delete("/delete" ,protect, deletehistory);

export default router;