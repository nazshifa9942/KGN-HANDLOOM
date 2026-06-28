require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const catalogRoutes = require("./routes/catalogRoutes");
const bannerRoutes = require("./routes/bannerRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/catalog", catalogRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/offers", require("./routes/offers"));

connectDB();

app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});