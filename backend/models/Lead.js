// File: models/Lead.js
const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // role: student
      required: true,
    },
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    matchScore: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["new", "contacted", "shortlisted", "rejected"],
      default: "new",
    },
    remarks: { type: String, trim: true },
  },
  { timestamps: true }
);

LeadSchema.index({ collegeId: 1, studentId: 1 });
LeadSchema.index({ status: 1 });

module.exports = mongoose.model("Lead", LeadSchema);
