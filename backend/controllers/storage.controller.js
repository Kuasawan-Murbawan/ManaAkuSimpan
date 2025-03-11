import Storage from "../models/storage.model.js";
import mongoose from "mongoose";

const catchingErrors = function (module, res, message) {
  console.error(`Error occured during ${module}: `, message);
  res.status(500).json({ success: false, message: `Error in ${module}` });
};

const notFoundErr = function (module, res) {
  console.error(`Error occured during ${module}, cant find id`);
  res
    .status(404)
    .json({ success: false, message: `ID not found during ${module}` });
};

export const getStorage = async (req, res) => {
  try {
    const storages = await Storage.find({}); // if empty object, it will fetch all data
    res
      .status(200)
      .json({ success: true, message: "All storage fetched", data: storages });
  } catch (err) {
    catchingErrors("Fetching all storage", res, err);
  }
};

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

export const deleteStorage = async (req, res) => {
  // the id is dynamic

  const { id } = req.params; // we can get the variables thru the url

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid ID" });
  }
  try {
    // check if id exist

    const checkStorage = await Storage.findById(id);
    if (!checkStorage) {
      return notFoundErr("Updating Storage", res);
    }

    await Storage.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Storage deleted" });
  } catch (err) {
    catchingErrors("Deleting Storage", res, err);
  }
};
