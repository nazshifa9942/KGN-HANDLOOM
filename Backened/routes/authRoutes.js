const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminOnly");

const { login } = require("../controllers/loginController");
const safeRole = "staff";

router.post(
  "/create-user",
  authMiddleware,
  adminOnly,
  async (req, res) => {
    try {
      const {
        name,
        mobile,
        alternateMobile,
        address,
        monthlySalary,
        aadhaarFrontUrl,
        aadhaarBackUrl,
        photoUrl,
        notes,
        password,
        permission,
        createdBy
      } = req.body;

      // 1. check duplicate user
      const existingUser = await User.findOne({ mobile });

      if (existingUser) {
        return res.status(400).json({
          message: "User already exists"
        });
      }

      const allowedPermissions = ["editor", "viewer"];

      if (!allowedPermissions.includes(permission)) {
        return res.status(400).json({
          message: "Invalid permission"
        });
      }

      // 2. hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // 3. create user
      const user = await User.create({
        name,
        mobile,
        alternateMobile,
        address,
        monthlySalary,
        aadhaarFrontUrl,
        aadhaarBackUrl,
        photoUrl,
        notes,
        password: hashedPassword,
        role: safeRole,
        permission,
        createdBy
      });

      res.json(user);

    } catch (error) {
      console.log("CREATE USER ERROR:");
      console.log(error);

      res.status(500).json({
        message: error.message
      });
    }
  });

router.post("/login", login);

router.get(
  "/users",
  authMiddleware,
  adminOnly,
  async (req, res) => {
    const users = await User.find();
    res.json(users);
  }
);

router.get(
  "/disable-staff/:id",
  authMiddleware,
  adminOnly,
  async (req, res) => {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    res.json(user);
  }
);

router.get(
  "/enable-staff/:id",
  authMiddleware,
  adminOnly,
  async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          isActive: true,
        },
        { new: true }
      );

      res.json(user);
    } catch (error) {
      res.status(500).json({
        message: "Error enabling user",
      });
    }
  });

router.delete(
  "/delete-user/:id",
  authMiddleware,
  adminOnly,
  async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      res.json({
        message: "User deleted successfully",
      });

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

router.get(
  "/user/:id",
  authMiddleware,
  adminOnly,
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

router.put(
  "/update-user/:id",
  authMiddleware,
  adminOnly,
  async (req, res) => {
    try {
      const {
        name,
        mobile,
        alternateMobile,
        address,
        monthlySalary,
        notes,
        permission,
        password,
        photoUrl,
        aadhaarFrontUrl,
        aadhaarBackUrl,
      } = req.body;

      const updateData = {
        name,
        mobile,
        alternateMobile,
        address,
        monthlySalary,
        notes,
        permission,
      };

      if (password && password.trim() !== "") {
        updateData.password = await bcrypt.hash(password, 10);
      }

      if (photoUrl) {
        updateData.photoUrl = photoUrl;
      }

      if (aadhaarFrontUrl) {
        updateData.aadhaarFrontUrl = aadhaarFrontUrl;
      }

      if (aadhaarBackUrl) {
        updateData.aadhaarBackUrl = aadhaarBackUrl;
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      res.json(updatedUser);

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.json([]);
    }

    const products = await Product.find({
      name: {
        $regex: query,
        $options: "i",
      },
    }).limit(8);

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;