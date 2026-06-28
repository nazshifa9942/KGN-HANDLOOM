const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware");
const canEditProducts = require("../middleware/permission");

router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) return res.json([]);

    const words = query.split(" ");

    const products = await Product.find({
      $and: words.map(word => ({
        name: { $regex: word, $options: "i" }
      })),
      isActive: true
    }).limit(10);

    res.json(products);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Search failed",
    });
  }
});

router.get("/all", async (req, res) => {
    const products = await Product.find({ isActive: true });
    res.json(products);
});

router.get("/admin/all", async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

router.post(
  "/add",
  authMiddleware,
  canEditProducts,
  async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error adding product" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching product",
    });
  }
});

router.put(
  "/update/:id",
  authMiddleware,
  canEditProducts,
  async (req, res) => {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  }
);

router.post("/upload-image", upload.single("image"),
    async (req, res) => {
        res.json({
            imageUrl: req.file.path,
        });
    }
);

router.delete(
  "/delete/:id",
  authMiddleware,
  canEditProducts,
  async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

router.get("/catalog/:catalogNodeId", async (req, res) => {
  try {
    const products = await Product.find({
      catalogNodeId: req.params.catalogNodeId,
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching products",
    });
  }
});

router.put(
  "/hide/:id",
  authMiddleware,
  canEditProducts,
  async (req, res) => {
    await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false }
    );

    res.json({
      message: "Product hidden",
    });
  }
);

router.put(
  "/show/:id",
  authMiddleware,
  canEditProducts,
  async (req, res) => {
    await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: true }
    );

    res.json({
      message: "Product shown",
    });
  }
);

module.exports = router;