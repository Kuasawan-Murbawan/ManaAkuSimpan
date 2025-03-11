import Item from "../models/item.model.js";
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

// to get all items in a particular storage
// TODO: test this
export const getItem = async (req, res) => {
  const items = req.body;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Storage ID" });
  }

  try {
    const checkStorageId = await Storage.findById(id);
    if (!checkStorageId) return notFoundErr("Fetching item", res);

    const items = await Item.find({ storageId: id });

    res.status(200).json({
      success: true,
      message: "Items fetched!",
      data: items,
    });
  } catch (error) {
    res
      .status(200)
      .json({ success: true, message: "All items fetched", data: items });

    catchingErrors("Fetching all items", res, err);
  }
};

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

    console.log("id existed");
    // if exist, then save item
    const newItem = new Item(item);
    await newItem.save();
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    catchingErrors("Create item", res, error);
  }
};
