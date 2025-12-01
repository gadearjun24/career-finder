// File: models/LearningPath.js
const mongoose = require("mongoose");

/**
 * 🔹 Resource Schema
 * Supports both online (video, article, quiz) and offline (textbook, lecture, lab) learning materials.
 */
const ResourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },

    type: {
      type: String,
      enum: [
        "video", // e-learning video
        "article", // blog, research paper
        "quiz", // test or self-assessment
        "project", // hands-on activity
        "document", // PDFs, notes
        "lecture", // in-person or recorded lecture
        "lab", // workshop or physical experiment
        "textbook", // textbook reference
        "assignment", // homework or field task
        "seminar", // academic event
        "tutorial", // guided walkthrough
        "reference", // supporting reading material
      ],
      required: true,
    },

    description: { type: String, trim: true },
    url: { type: String, trim: true }, // used for online content
    duration: { type: String, trim: true }, // "1 hr", "Week 2", etc.

    // For offline resources — textbook or physical session references
    referenceDetails: {
      bookTitle: { type: String, trim: true },
      author: { type: String, trim: true },
      edition: { type: String, trim: true },
      chapter: { type: String, trim: true },
      pages: { type: String, trim: true },
      labRoom: { type: String, trim: true },
      instructor: { type: String, trim: true },
    },

    isMandatory: { type: Boolean, default: true },
  },
  { _id: false }
);

/**
 * 🔹 Module Schema
 * Each module contains resources and learning goals.
 */
const ModuleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    overview: { type: String, trim: true },
    estimatedTime: { type: String, trim: true },
    prerequisites: [{ type: String, trim: true }],
    keySkills: [{ type: String, trim: true }],
    resources: [ResourceSchema],
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Test" }, // optional
  },
  { _id: false }
);

/**
 * 🔹 Stage Schema
 * Represents a milestone or major section in the learning journey.
 */
const StageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    order: { type: Number, default: 1 },
    modules: [ModuleSchema],
  },
  { _id: false }
);

/**
 * 🔹 Learning Path Schema
 * Global roadmap for a specific course.
 */
const LearningPathSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    title: { type: String, required: true, trim: true },
    overview: { type: String, trim: true },
    difficultyLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    mode: {
      type: String,
      enum: ["Online", "Offline", "Hybrid"],
      default: "Online",
    },
    estimatedDuration: { type: String, trim: true }, // e.g., "3 months"

    stages: [StageSchema],

    externalLinks: [
      {
        title: { type: String, trim: true },
        url: { type: String, trim: true },
      },
    ],

    totalModules: { type: Number, default: 0 },
    totalResources: { type: Number, default: 0 },
    averageCompletionTime: { type: Number, default: 0 },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

LearningPathSchema.index({ courseId: 1, title: 1 });
LearningPathSchema.index({ mode: 1, difficultyLevel: 1 });

module.exports = mongoose.model("LearningPath", LearningPathSchema);
