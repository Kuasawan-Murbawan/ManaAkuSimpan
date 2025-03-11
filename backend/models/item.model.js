import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    storageId: {
      type: String,
      required: true,
    },
    // TODO: test this
    // storageId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Storage",
    //   required: true,
    // },

    keywords: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;
