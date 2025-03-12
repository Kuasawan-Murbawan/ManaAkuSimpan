import mongoose from "mongoose";
import Item from "../models/item.model.js";
import Storage from "../models/storage.model.js";
import { catchingErrors, notFoundErr } from "./responseHandling.js";

// 1. Get all Items
export const getAllItems = async (req, res) => {
  try {
    const allItems = await Item.find({});
    res
      .status(200)
      .json({ success: true, message: "All Items fetched", data: allItems });
  } catch (error) {
    return catchingErrors("Fetching all items", res, error);
  }
};

// 2.Get items in a particular storage
export const getItem = async (req, res) => {
  const items = req.body;
  const { storageId } = req.params;

  // check storage id type
  if (!mongoose.Types.ObjectId.isValid(storageId)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Storage ID" });
  }

  try {
    // check if the storage have items in it
    const checkStorageId = await Storage.findById(storageId);
    if (!checkStorageId) return notFoundErr("Fetching item", res);

    const items = await Item.find({ storageId: storageId });

    res.status(200).json({
      success: true,
      message: "Items fetched!",
      data: items,
    });
  } catch (error) {
    catchingErrors("Fetching all items", res, error);
  }
};

// 3. Create Item
export const createItem = async (req, res) => {
  const item = req.body;

  if (!item.name || !item.storageId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all info" });
  }

  try {
    // check if storage ID exist
    const storageExist = await Storage.findById(item.storageId);

    if (!storageExist || !mongoose.Types.ObjectId.isValid(item.storageId)) {
      console.log("Id tidak exist");
      return res
        .status(404)
        .json({ success: false, message: "Storage ID not found" });
    }

    // if exist, then save item
    const newItem = new Item(item);
    await newItem.save();
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    catchingErrors("Create item", res, error);
  }
};

// 4. Update Item
export const updateItem = async (req, res) => {
  const item = req.body;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid ID" });
  }

  try {
    // check if id exist
    const checkItem = await Item.findById(id);
    if (!checkItem) {
      return notFoundErr("Updating Item", res);
    }

    const updatedItem = await Item.findByIdAndUpdate(id, item, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Item updated!",
      data: updatedItem,
    });
  } catch (error) {
    catchingErrors("Updating Item", res, err);
  }
};

// 5. Delete Item
export const deleteItem = async (req, res) => {
  const { id } = req.params; // from url

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid ID" });
  }

  try {
    // check if id exist
    const checkItem = await Item.findById(id);
    if (!checkItem) {
      return notFoundErr("Deleting Item", res);
    }

    await Item.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Item deleted" });
  } catch (error) {
    catchingErrors("Deleting Item", res, error);
  }
};

// TODO: 6. Clear All Item in a storage
