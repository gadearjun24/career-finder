const mongoose = require("mongoose");

const AnalyticsSchema = new mongoose.Schema(
  {
    entityType: {
      type: String,
      enum: ["college", "company"],
      required: true,
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    totalLeads: { type: Number, default: 0 },
    totalApplications: { type: Number, default: 0 },
    totalAccepted: { type: Number, default: 0 },
    conversionRate: { type: Number, default: 0 },
    mostPopularCourse: String,
    mostAppliedJob: String,
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

AnalyticsSchema.index({ entityType: 1, entityId: 1 });
module.exports = mongoose.model("Analytics", AnalyticsSchema);
