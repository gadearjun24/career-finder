const mongoose = require("mongoose");

const InternshipSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    title: { type: String, required: true },
    duration: { type: String },
    stipend: { type: String },
    skillsRequired: [{ type: String }],
    eligibility: { type: String },
    description: { type: String },
    status: { type: String, enum: ["open", "closed"], default: "open" },
  },
  { timestamps: true }
);

InternshipSchema.index({ companyId: 1 });
module.exports = mongoose.model("Internship", InternshipSchema);
