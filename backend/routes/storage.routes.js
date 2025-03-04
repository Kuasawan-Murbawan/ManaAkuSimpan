import express from "express";
import {
  getStorage,
  createStorage,
  updateStorage,
  deleteStorage,
} from "../controllers/storage.controller.js";

const router = express.Router();

// Show List of Storages
router.get("/", getStorage);

// Create Storage
router.post("/", createStorage);

// Update Storage
router.put("/:id", updateStorage);

// Delete Storage
router.delete("/:id", deleteStorage);

export default router;
