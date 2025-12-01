const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    collegeId: { type: mongoose.Schema.Types.ObjectId, ref: "College" },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
    internshipId: { type: mongoose.Schema.Types.ObjectId, ref: "Internship" },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reviewNotes: String,
  },
  { timestamps: true }
);

ApplicationSchema.index({ studentId: 1 });
module.exports = mongoose.model("Application", ApplicationSchema);
