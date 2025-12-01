const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Contract"],
      default: "Full-Time",
    },
    skillsRequired: [{ type: String }],
    salaryRange: { type: String },
    location: { type: String },
    eligibility: { type: String },
    description: { type: String },
    status: { type: String, enum: ["open", "closed"], default: "open" },
  },
  { timestamps: true }
);

JobSchema.index({ companyId: 1 });
module.exports = mongoose.model("Job", JobSchema);
