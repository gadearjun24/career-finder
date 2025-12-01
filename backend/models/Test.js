const mongoose = require("mongoose");

/* ------------------------------------------------------------------
   ✅ Competency Model Explanation (used below)
   Each question will contribute scores to one or more of these dimensions:
   - analytical
   - verbal
   - creative
   - scientific
   - social
   - technical
   ------------------------------------------------------------------ */

/* --------------------- Option Schema --------------------- */
const OptionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    weight: {
      type: Number,
      default: 1, // optional scoring multiplier
    },
    isCorrect: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

/* --------------------- Question Schema --------------------- */
const QuestionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["MCQ", "TrueFalse", "Numeric", "Scenario", "Descriptive"],
      default: "MCQ",
    },

    // The correct answer or expected value
    correctAnswer: mongoose.Schema.Types.Mixed,

    marks: {
      type: Number,
      default: 1,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },

    // 🔹 Competency Mapping (core of Option 3)
    competencies: {
      analytical: { type: Number, default: 0 }, // logical reasoning, math
      verbal: { type: Number, default: 0 }, // communication, comprehension
      creative: { type: Number, default: 0 }, // imagination, design
      scientific: { type: Number, default: 0 }, // biology, physics, reasoning
      social: { type: Number, default: 0 }, // empathy, cooperation, behavior
      technical: { type: Number, default: 0 }, // computer, engineering logic
    },

    options: [OptionSchema],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

/* --------------------- Test Schema --------------------- */
const TestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    description: {
      type: String,
      trim: true,
    },

    duration: {
      type: Number,
      default: 30, // minutes
    },

    questionCount: {
      type: Number,
      default: 25,
    },

    totalMarks: {
      type: Number,
      default: 0,
    },

    randomizeQuestions: {
      type: Boolean,
      default: true,
    },

    // Who created the test (admin or super user)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Actual questions
    questions: {
      type: [QuestionSchema],
      validate: (arr) => arr.length > 0,
    },

    // Whether this test is visible to users
    isActive: {
      type: Boolean,
      default: true,
    },

    // ✅ Precomputed overall competency profile (average of all question mappings)
    competencyProfile: {
      analytical: { type: Number, default: 0 },
      verbal: { type: Number, default: 0 },
      creative: { type: Number, default: 0 },
      scientific: { type: Number, default: 0 },
      social: { type: Number, default: 0 },
      technical: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

/* ------------------------------------------------------------------
   ⚙️ Pre-save Middleware:
   Auto-calculate total marks and overall competency profile
   ------------------------------------------------------------------ */
TestSchema.pre("save", function (next) {
  // total marks
  this.totalMarks = this.questions.reduce((sum, q) => sum + (q.marks || 1), 0);

  // aggregate competency profile
  const totals = {
    analytical: 0,
    verbal: 0,
    creative: 0,
    scientific: 0,
    social: 0,
    technical: 0,
  };

  for (const q of this.questions) {
    for (const key in totals) {
      totals[key] += q.competencies[key] || 0;
    }
  }

  const count = this.questions.length || 1;
  for (const key in totals) {
    this.competencyProfile[key] = parseFloat((totals[key] / count).toFixed(2));
  }

  next();
});

/* ------------------------------------------------------------------
   🧠 Indexes
   ------------------------------------------------------------------ */
TestSchema.index({ title: "text", description: "text" });
TestSchema.index({ isActive: 1 });
TestSchema.index({ "competencyProfile.analytical": 1 });
TestSchema.index({ "competencyProfile.technical": 1 });
TestSchema.index({ createdBy: 1 });

/* ------------------------------------------------------------------
   ✅ Export Model
   ------------------------------------------------------------------ */
module.exports = mongoose.model("Test", TestSchema);
