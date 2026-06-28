const express = require("express");
const router = express.Router();
const Offer = require("../models/Offer");
const upload = require("../middleware/upload");

/* USER: ONLY ACTIVE */
router.get("/", async (req, res) => {
  const offers = await Offer.find({ isActive: true });
  res.json(offers);
});

/* ADMIN: ALL */
router.get("/admin/all", async (req, res) => {
  const offers = await Offer.find();
  res.json(offers);
});

/* ADD */
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const offer = await Offer.create({
      title: req.body.title,
      description: req.body.description,
      image: req.file?.path || "",
    });

    res.json(offer);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating offer" });
  }
});

/* DELETE */
router.delete("/delete/:id", async (req, res) => {
  try {
    await Offer.findByIdAndDelete(req.params.id);
    res.json({ message: "Offer deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

/* HIDE */
router.put("/hide/:id", async (req, res) => {
  await Offer.findByIdAndUpdate(req.params.id, {
    isActive: false,
  });

  res.json({ message: "Offer hidden" });
});

/* SHOW */
router.put("/show/:id", async (req, res) => {
  await Offer.findByIdAndUpdate(req.params.id, {
    isActive: true,
  });

  res.json({ message: "Offer visible" });
});

module.exports = router;