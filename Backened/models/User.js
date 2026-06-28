const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true
  },
  alternateMobile: {
    type: String,
  },

  address: {
    type: String,
  },
  monthlySalary: {
    type: Number,
  },

  aadhaarFrontUrl: {
    type: String,
    required: true,
  },

  aadhaarBackUrl: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    required: true,
  },

  notes: {
    type: String,
  },
  createdBy: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["staff", "admin"],
    default: "staff",
    required: true
  },
  permission: {
    type: String,
    enum: ["editor", "viewer"],
    default: "viewer"
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true
  },
},
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;