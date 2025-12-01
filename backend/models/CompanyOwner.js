const mongoose = require("mongoose");

const CompanyOwnerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    organizationName: { type: String, required: true, trim: true },
    industry: { type: String, trim: true },
    contactNumber: String,
    linkedCompanies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }],
  },
  { timestamps: true }
);

CompanyOwnerSchema.index({ userId: 1 });
module.exports = mongoose.model("CompanyOwner", CompanyOwnerSchema);
