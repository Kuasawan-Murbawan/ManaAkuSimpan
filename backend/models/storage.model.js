import mongoose from "mongoose";

const storageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const Storage = mongoose.model("Storage", storageSchema);

export default Storage;
