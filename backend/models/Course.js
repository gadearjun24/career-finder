// File: models/Course.js
const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true,
    },

    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },

    duration: { type: String, required: true, trim: true },
    intake: { type: Number, default: 0 },
    feePerYear: { type: Number, default: 0 },

    mode: {
      type: String,
      enum: ["Offline", "Online", "Hybrid"],
      default: "Offline",
    },

    eligibility: { type: String, trim: true },
    admissionProcess: { type: String, trim: true },

    tags: [{ type: String, trim: true }],

    placementRate: { type: Number, default: 0 },
    approvedBy: { type: String, trim: true },

    // For analytics
    interestedCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);



module.exports = mongoose.model("Course", CourseSchema);
