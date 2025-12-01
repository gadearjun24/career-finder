const mongoose = require("mongoose");

const StudentProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    academic: {
      schoolName: { type: String, trim: true },
      stream: { type: String, trim: true },
      grade: { type: String, trim: true },
      marks: { type: String, trim: true },
      achievements: { type: String, trim: true },
    },

    preferences: {
      careerInterests: [{ type: String, trim: true }],
      preferredLocations: [{ type: String, trim: true }],
      studyMode: { type: String, enum: ["Online", "Offline", "Hybrid"] },
    },

    skills: [{ type: String, trim: true }],
    personalityType: { type: String, trim: true },

    testHistory: [
      {
        testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
        score: { type: Number },
        dateTaken: { type: Date },
      },
    ],

    recommendedCareers: [{ type: String, trim: true }],
    profileCompletion: { type: Number, default: 0 },
  },
  { timestamps: true }
);

StudentProfileSchema.index({ userId: 1 });
module.exports = mongoose.model("StudentProfile", StudentProfileSchema);
