import express from "express";

import {
  createItem,
  deleteItem,
  getAllItems,
  getItem,
  updateItem,
} from "../controllers/item.controller.js";

const router = express.Router();

// 1. Get All Items
router.get("/", getAllItems);

// 2. Get items in a storage
router.get("/:storageId", getItem);

// 3. Create Item
router.post("/", createItem);

// 4. Update Item
router.put("/:id", updateItem);

// 5. Delete Item
router.delete("/:id", deleteItem);

export default router;
