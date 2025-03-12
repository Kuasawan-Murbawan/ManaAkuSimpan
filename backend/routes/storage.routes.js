import express from "express";
import {
  fetchAllStorages,
  fetchStorage,
  createStorage,
  updateStorage,
  deleteStorage,
} from "../controllers/storage.controller.js";

const router = express.Router();

// Show List of Storages
router.get("/", fetchAllStorages);

// Show details of a storages
router.get("/:id", fetchStorage);

// Create Storage
router.post("/", createStorage);

// Update Storage
router.put("/:id", updateStorage);

// Delete Storage
router.delete("/:id", deleteStorage);

export default router;
