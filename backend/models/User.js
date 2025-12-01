// File: models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    // 🔹 Basic Info
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Name must be at least 2 characters long."],
      maxlength: [50, "Name cannot exceed 50 characters."],
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters."],
      select: false, // hide password when fetching user
    },

    // 🔹 Role Management
    role: {
      type: String,
      enum: ["student", "college", "company", "admin"],
      default: "student",
      index: true,
    },

    // 🔹 Avatar / Branding
    avatar: {
      type: String, // URL to profile image
      default: "",
    },

    // 🔹 Account Metadata
    isVerified: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["active", "inactive", "banned"],
      default: "active",
    },

    lastLogin: { type: Date },
    lastActivity: { type: Date },

    profileCompletion: { type: Number, default: 0 },

    // 🔹 Contact Info (generic across all roles)
    contact: {
      phone: { type: String, trim: true },
      address: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      country: { type: String, trim: true, default: "India" },
    },

    // 🔹 Settings
    settings: {
      notifications: { type: Boolean, default: true },
      theme: { type: String, enum: ["light", "dark"], default: "dark" },
      language: { type: String, default: "en" },
    },

    // 🔹 Relations (optional links)
    studentProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentProfile",
    },
    collegeOwnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CollegeOwner",
    },
    companyOwnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompanyOwner",
    },

    // 🔹 Resume (only for students)
    resumeUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

//
// 🔒 Password Hash Middleware
//
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//
// 🔑 Compare Password Method
//
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model("User", UserSchema);
