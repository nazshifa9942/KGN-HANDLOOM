const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    catalogNodeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CatalogNode",
      required: true,
    },

    price: {
      type: Number,
      default: 0,
    },

    images: [String],

    description: {
      type: String,
      default: "",
    },

    whatsappNumber: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: String,
      default: "",
    },

    updatedBy: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Product",
  productSchema
);