const mongoose = require("mongoose");

/* ------------------------------------------------------------------
   ✅ TestResult Schema
   Stores a student's detailed test attempt and computed competency profile
   ------------------------------------------------------------------ */
const TestResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true,
      index: true,
    },

    // Raw question-level responses
    responses: [
      {
        questionId: mongoose.Schema.Types.ObjectId,
        selectedOption: mongoose.Schema.Types.Mixed,
        isCorrect: { type: Boolean },
        marksObtained: { type: Number, default: 0 },

        // 🔹 Track competency contribution per question
        competencies: {
          analytical: { type: Number, default: 0 },
          verbal: { type: Number, default: 0 },
          creative: { type: Number, default: 0 },
          scientific: { type: Number, default: 0 },
          social: { type: Number, default: 0 },
          technical: { type: Number, default: 0 },
        },
      },
    ],

    // 🔹 Aggregated Scores
    totalScore: { type: Number, default: 0 },
    totalPossible: { type: Number, default: 0 },
    percentage: { type: Number, default: 0 },

    // 🔹 Computed Competency Scores (normalized 0–100)
    competencyScores: {
      analytical: { type: Number, default: 0 },
      verbal: { type: Number, default: 0 },
      creative: { type: Number, default: 0 },
      scientific: { type: Number, default: 0 },
      social: { type: Number, default: 0 },
      technical: { type: Number, default: 0 },
    },

    // Status & attempt metadata
    attemptNumber: { type: Number, default: 1 },
    completedAt: { type: Date, default: Date.now },
    durationTaken: { type: Number, default: 0 }, // in minutes
  },
  { timestamps: true }
);

/* ------------------------------------------------------------------
   ⚙️ Pre-save Middleware:
   Auto-compute totals & percentages
   ------------------------------------------------------------------ */
TestResultSchema.pre("save", function (next) {
  if (!this.responses?.length) return next();

  let totalMarks = 0;
  let obtained = 0;

  const compTotals = {
    analytical: 0,
    verbal: 0,
    creative: 0,
    scientific: 0,
    social: 0,
    technical: 0,
  };

  for (const res of this.responses) {
    obtained += res.marksObtained || 0;
    totalMarks += 1; // can adjust if marks vary

    // aggregate competency contribution
    for (const key in compTotals) {
      compTotals[key] += res.competencies[key] || 0;
    }
  }

  const count = this.responses.length || 1;
  for (const key in compTotals) {
    this.competencyScores[key] = parseFloat(
      ((compTotals[key] / count) * 100).toFixed(2)
    );
  }

  this.totalScore = obtained;
  this.totalPossible = totalMarks;
  this.percentage = parseFloat(
    ((obtained / (totalMarks || 1)) * 100).toFixed(2)
  );

  next();
});

/* ------------------------------------------------------------------
   🧠 Indexes for fast recommendations
   ------------------------------------------------------------------ */
TestResultSchema.index({ userId: 1, createdAt: -1 });
TestResultSchema.index({ "competencyScores.analytical": 1 });
TestResultSchema.index({ "competencyScores.technical": 1 });

module.exports = mongoose.model("TestResult", TestResultSchema);
