const express = require("express");
const router = express.Router();
const Banner = require("../models/Banner");


router.get("/", async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.json(banners);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch banners" });
  }
});


// ✅ ADD banner (save image URL)
router.post("/add", async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: "Image URL required" });
    }

    const count = await Banner.countDocuments();

    if (count >= 5) {
      return res.status(400).json({
        error: "Maximum 5 banners allowed. Please delete old ones.",
      });
    }

    const newBanner = new Banner({ image });
    await newBanner.save();

    res.json({
      message: "Banner added successfully",
      banner: newBanner,
    });

  } catch (err) {
    res.status(500).json({ error: "Failed to add banner" });
  }
});

// ✅ DELETE banner
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Banner.findByIdAndDelete(id);

    res.json({ message: "Banner deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: "Failed to delete banner" });
  }
});

// ✅ Toggle banner (show / hide)
router.put("/toggle/:id", async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({ error: "Banner not found" });
    }

    banner.isActive = !banner.isActive;
    await banner.save();

    res.json({
      message: "Banner updated",
      banner,
    });

  } catch (err) {
    res.status(500).json({ error: "Failed to update banner" });
  }
});

module.exports = router;