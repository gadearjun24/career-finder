const mongoose = require("mongoose");

const CollegeOwnerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    organizationName: { type: String, required: true, trim: true },
    contactNumber: { type: String, trim: true },
    designation: { type: String, trim: true, default: "Director" },
    linkedColleges: [{ type: mongoose.Schema.Types.ObjectId, ref: "College" }],
  },
  { timestamps: true }
);

CollegeOwnerSchema.index({ userId: 1 });
module.exports = mongoose.model("CollegeOwner", CollegeOwnerSchema);
