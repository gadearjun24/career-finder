// File: models/Recommendation.js
const mongoose = require("mongoose");

/* ------------------------------------------------------------------
   ✅ Recommendation Schema (Production-Ready)
   ------------------------------------------------------------------
   Each record is generated when a student finishes a test.
   It captures the user’s competency vector, computed matches to courses,
   and meta-data useful for dashboards and re-generation.
-------------------------------------------------------------------*/

const RecommendedCourseSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
    },
    similarityScore: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
      index: true,
    },
    rank: {
      type: Number,
      default: 0,
      index: true,
    },
    reasoning: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

/* ------------------------------------------------------------------
   🧠 Recommendation Schema
-------------------------------------------------------------------*/
const RecommendationSchema = new mongoose.Schema(
  {
    // 🔹 Ownership
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    testResultId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestResult",
      required: true,
      index: true,
    },

    // 🔹 Snapshot of competency profile at generation
    competencyVector: {
      analytical: { type: Number, default: 0 },
      verbal: { type: Number, default: 0 },
      creative: { type: Number, default: 0 },
      scientific: { type: Number, default: 0 },
      social: { type: Number, default: 0 },
      technical: { type: Number, default: 0 },
    },

    // 🔹 Recommended course list
    recommendedCourses: [RecommendedCourseSchema],

    // 🔹 Summary
    topCompetencies: {
      type: [String],
      default: [],
      index: true,
    },

    averageScore: {
      type: Number,
      default: 0, // avg of top 10 course similarityScores
    },

    totalCourses: {
      type: Number,
      default: 0,
    },

    // 🔹 Lifecycle & metadata
    version: {
      type: Number,
      default: 1, // increment if you regenerate for the same test result
    },

    generatedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },

    expiresAt: {
      type: Date, // optional expiration for re-generation logic
    },

    status: {
      type: String,
      enum: ["active", "stale", "expired"],
      default: "active",
    },

    meta: {
      filters: { type: Object }, // optional: store course filter criteria used
      candidateCount: { type: Number, default: 0 },
      generationTimeMs: { type: Number, default: 0 },
      algorithm: { type: String, default: "cosine_similarity_v1" },
    },
  },
  { timestamps: true }
);

/* ------------------------------------------------------------------
   ⚙️ Middleware — Pre-save hook
   ------------------------------------------------------------------
   Automatically compute:
   - average similarity score
   - totalCourses
   - sort courses by similarity
-------------------------------------------------------------------*/
RecommendationSchema.pre("save", function (next) {
  if (
    Array.isArray(this.recommendedCourses) &&
    this.recommendedCourses.length
  ) {
    // sort descending
    this.recommendedCourses.sort(
      (a, b) => b.similarityScore - a.similarityScore
    );

    // assign rank
    this.recommendedCourses.forEach((rc, i) => (rc.rank = i + 1));

    // compute aggregates
    const top10 = this.recommendedCourses.slice(0, 10);
    const avg =
      top10.reduce((sum, c) => sum + (c.similarityScore || 0), 0) /
      (top10.length || 1);
    this.averageScore = Number(avg.toFixed(4));
    this.totalCourses = this.recommendedCourses.length;
  } else {
    this.averageScore = 0;
    this.totalCourses = 0;
  }

  next();
});

/* ------------------------------------------------------------------
   🧩 Indexes for performance
-------------------------------------------------------------------*/
RecommendationSchema.index({ userId: 1, generatedAt: -1 });
RecommendationSchema.index({ testResultId: 1 });
RecommendationSchema.index({ averageScore: -1 });
RecommendationSchema.index({ "recommendedCourses.similarityScore": -1 });
RecommendationSchema.index({ "recommendedCourses.courseId": 1 });

/* ------------------------------------------------------------------
   🔍 Virtuals & Methods
-------------------------------------------------------------------*/

// Compute vector magnitude (useful for analytics)
RecommendationSchema.methods.vectorMagnitude = function () {
  const v = Object.values(this.competencyVector);
  const sumSq = v.reduce((sum, x) => sum + x * x, 0);
  return Math.sqrt(sumSq);
};

// Get top N courses
RecommendationSchema.methods.topCourses = function (limit = 5) {
  return (this.recommendedCourses || [])
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, limit);
};

// Mark record as stale (e.g., after X days)
RecommendationSchema.methods.markStale = async function () {
  this.status = "stale";
  await this.save();
  return this;
};

/* ------------------------------------------------------------------
   🧠 Auto-expire old recommendations
   (Optional: TTL index — runs only if you enable it)
-------------------------------------------------------------------*/
// This will automatically delete documents after their expiresAt date
RecommendationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

/* ------------------------------------------------------------------
   ✅ Export model
-------------------------------------------------------------------*/
module.exports = mongoose.model("Recommendation", RecommendationSchema);
