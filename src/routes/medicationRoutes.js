import express from "express";
import { MedicationController } from "../controllers/medicationController.js";

const router = express.Router();

// Endpoint utama
router.get("/medications", MedicationController.getAll);
router.get("/medications/:id", MedicationController.getById);
router.post("/medications", MedicationController.create);
router.put("/medications/:id", MedicationController.update);
router.delete("/medications/:id", MedicationController.remove);

// Endpoint tambahan (bonus)
router.get("/reports/total", MedicationController.getTotal);

export default router;
