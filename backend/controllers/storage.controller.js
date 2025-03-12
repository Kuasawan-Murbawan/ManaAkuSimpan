import Storage from "../models/storage.model.js";
import mongoose from "mongoose";
import { catchingErrors, notFoundErr } from "./responseHandling.js";

// 1. Get all Storage
export const fetchAllStorages = async (req, res) => {
  try {
    const storages = await Storage.find({}); // if empty object, it will fetch all data
    res
      .status(200)
      .json({ success: true, message: "All storage fetched", data: storages });
  } catch (err) {
    catchingErrors("Fetching all storage", res, err);
  }
};

// 2. Get a specific Storage
export const fetchStorage = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid ID" });
  }
  try {
    // check if id exist
    const storage = await Storage.findById(id);
    if (!storage) {
      return notFoundErr("Fetch Storage", res);
    }

    res.status(200).json({
      success: true,
      message: "Storage fetched!",
      data: storage,
    });
  } catch (err) {
    catchingErrors("Updating Storage", res, err);
  }
};

// 3. Create Storage
export const createStorage = async (req, res) => {
  const storage = req.body; // user input

  if (!storage.name) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all info" });
  }

  const newStorage = new Storage(storage);

  try {
    await newStorage.save();
    res.status(201).json({ success: true, data: newStorage });
  } catch (err) {
    catchingErrors("Create Storage", res, err);
  }
};

// 4. Update Storage
export const updateStorage = async (req, res) => {
  const storage = req.body;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid ID" });
  }

  try {
    // check if id exist
    const checkStorage = await Storage.findById(id);
    if (!checkStorage) {
      return notFoundErr("Updating Storage", res);
    }

    const updatedStorage = await Storage.findByIdAndUpdate(id, storage, {
      new: true,
    });
    // By default, findByIdAndUpdate() returns the document as it was before update was aplied.
    // If you set new: true, findByIdAndUpdate() will instead give you the object after update was aplied.

    res.status(200).json({
      success: true,
      message: "Storage updated!",
      data: updatedStorage,
    });
  } catch (err) {
    catchingErrors("Updating Storage", res, err);
  }
};

// 5. Delete Storage
export const deleteStorage = async (req, res) => {
  // the id is dynamic

  const { id } = req.params; // we can get the variables thru the url

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }
  try {
    // check if id exist
    const checkStorage = await Storage.findById(id);
    if (!checkStorage) {
      return notFoundErr("Deleting Storage", res);
    }

    await Storage.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Storage deleted" });
  } catch (err) {
    return catchingErrors("Deleting Storage", res, err);
  }
};
