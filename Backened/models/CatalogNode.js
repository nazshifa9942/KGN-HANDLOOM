const mongoose = require("mongoose");

const catalogNodeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            default: "",
        },

        image: {
            type: String,
            required: true,
        },

        whatsappNumber: {
            type: String,
            default: "",
        },

        parentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CatalogNode",
            default: null,
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
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "CatalogNode",
    catalogNodeSchema
);