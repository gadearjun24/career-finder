const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    industry: String,
    website: String,
    logo: String,
    location: {
      city: String,
      state: String,
      country: { type: String, default: "India" },
    },
    description: String,
    size: String,
    status: {
      type: String,
      enum: ["pending", "active", "inactive"],
      default: "pending",
    },
  },
  { timestamps: true }
);

CompanySchema.index({ name: "text", "location.city": 1 });
module.exports = mongoose.model("Company", CompanySchema);
