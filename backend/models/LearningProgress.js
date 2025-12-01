// File: models/LearningProgress.js
const mongoose = require("mongoose");

/**
 * 🔹 ModuleProgress Schema
 * Tracks how much of a module is completed by a student.
 */
const ModuleProgressSchema = new mongoose.Schema(
  {
    moduleTitle: { type: String, required: true },
    completedResources: [String],
    totalResources: { type: Number, default: 0 },
    isCompleted: { type: Boolean, default: false },
    progressPercentage: { type: Number, default: 0 },
  },
  { _id: false }
);

/**
 * 🔹 StageProgress Schema
 * Tracks the completion of stages and modules within each stage.
 */
const StageProgressSchema = new mongoose.Schema(
  {
    stageTitle: { type: String, required: true },
    completedModules: { type: Number, default: 0 },
    totalModules: { type: Number, default: 0 },
    progressPercentage: { type: Number, default: 0 },
    modules: [ModuleProgressSchema],
  },
  { _id: false }
);

/**
 * 🔹 LearningProgress Schema
 * Tracks each student's overall progress through a specific Learning Path.
 */
const LearningProgressSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    learningPathId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LearningPath",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    stagesProgress: [StageProgressSchema],

    overallProgress: { type: Number, default: 0 },
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
    isCompleted: { type: Boolean, default: false },

    // Analytics
    timeSpentHours: { type: Number, default: 0 },
    lastAccessed: { type: Date, default: Date.now },
    ratingGiven: { type: Number, min: 0, max: 5 },

    // Mode reference
    mode: {
      type: String,
      enum: ["Online", "Offline", "Hybrid"],
      default: "Online",
    },
  },
  { timestamps: true }
);

LearningProgressSchema.index(
  { studentId: 1, learningPathId: 1 },
  { unique: true }
);
LearningProgressSchema.index({ courseId: 1 });
LearningProgressSchema.index({ mode: 1 });

module.exports = mongoose.model("LearningProgress", LearningProgressSchema);
