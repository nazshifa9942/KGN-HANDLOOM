const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "shop-products",
        allowed_formats: ["jpg", "jpeg", "png", "webp", "pdf"],
    },
});

const upload = multer({ storage });

module.exports = upload;