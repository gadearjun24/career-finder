const mongoose = require("mongoose");

const CollegeSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    location: {
      city: String,
      state: String,
      country: { type: String, default: "India" },
    },
    logo: String,
    bannerImage: String,
    accreditation: String,
    establishedYear: Number,
    collegeType: {
      type: String,
      enum: ["Private", "Government", "Deemed", "Autonomous"],
    },
    email: String,
    website: String,
    description: String,
    socialLinks: {
      facebook: String,
      linkedin: String,
      instagram: String,
    },
    totalStudents: Number,
    totalCourses: Number,
    status: {
      type: String,
      enum: ["pending", "active", "inactive"],
      default: "pending",
    },
  },
  { timestamps: true }
);

CollegeSchema.index({ name: "text", "location.city": 1 });
module.exports = mongoose.model("College", CollegeSchema);
