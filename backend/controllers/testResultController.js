const mongoose = require("mongoose");
const Test = require("../models/Test");
const TestResult = require("../models/TestResult");
const Recommendation = require("../models/Recommendation");

/* =====================================================================
   🧠 TEST RESULT CONTROLLER — PRODUCTION READY
   ===================================================================== */

/* ---------------------------------------------------------------------
   🔧 Utility: Compute competency averages
   --------------------------------------------------------------------- */
const computeCompetencyAverages = (responses) => {
  const totals = {
    analytical: 0,
    verbal: 0,
    creative: 0,
    scientific: 0,
    social: 0,
    technical: 0,
  };
  let count = responses.length || 1;

  for (const r of responses) {
    for (const key in totals) {
      totals[key] += r.competencies?.[key] || 0;
    }
  }

  const result = {};
  for (const key in totals) {
    result[key] = parseFloat(((totals[key] / count) * 100).toFixed(2));
  }
  return result;
};

/* ---------------------------------------------------------------------
   1️⃣ SUBMIT TEST RESULT  (Student)
   --------------------------------------------------------------------- */
exports.submitTest = async (req, res) => {
  try {
    const userId = req.user._id;
    const { testId, answers, durationTaken } = req.body;

    if (!testId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Invalid submission payload." });
    }

    // Fetch test with all questions
    const test = await Test.findById(testId);
    if (!test || !test.isActive) {
      return res.status(404).json({ message: "Test not found or inactive." });
    }

    const responses = [];
    let totalScore = 0;

    for (const ans of answers) {
      const question = test.questions.id(ans.questionId);
      if (!question) continue;

      const isCorrect =
        ans.selectedOption === question.correctAnswer ||
        question.options.find(
          (opt) => opt._id.toString() === ans.selectedOption && opt.isCorrect
        );

      const marksObtained = isCorrect ? question.marks : 0;

      // Push question-level result
      responses.push({
        questionId: question._id,
        selectedOption: ans.selectedOption,
        isCorrect,
        marksObtained,
        competencies: question.competencies,
      });

      totalScore += marksObtained;
    }

    // Compute aggregates
    const competencyScores = computeCompetencyAverages(responses);
    const totalPossible = test.totalMarks || test.questions.length;
    const percentage = parseFloat(
      ((totalScore / (totalPossible || 1)) * 100).toFixed(2)
    );

    // Count existing attempts
    const previousAttempts = await TestResult.countDocuments({
      userId,
      testId,
    });

    // Save test result
    const newResult = new TestResult({
      userId,
      testId,
      responses,
      totalScore,
      totalPossible,
      percentage,
      competencyScores,
      attemptNumber: previousAttempts + 1,
      durationTaken,
      completedAt: new Date(),
    });

    await newResult.save();

    // Create or update recommendation
    await generateRecommendation(userId, newResult);

    res.status(201).json({
      success: true,
      message: "Test submitted successfully.",
      result: newResult,
    });
  } catch (err) {
    console.error("❌ Error submitting test:", err);
    res.status(500).json({ message: "Server error while submitting test." });
  }
};

/* ---------------------------------------------------------------------
   2️⃣ GENERATE RECOMMENDATION (private helper)
   --------------------------------------------------------------------- */
const generateRecommendation = async (userId, resultDoc) => {
  try {
    const { competencyScores } = resultDoc;

    // Try to find existing recommendation for this user
    const existing = await Recommendation.findOne({
      userId,
      testResultId: resultDoc._id,
    });

    if (existing) return existing;

    // Basic stub for later recommendation computation
    const rec = new Recommendation({
      userId,
      testResultId: resultDoc._id,
      competencyVector: competencyScores,
      topCompetencies: Object.entries(competencyScores)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([key]) => key),
    });

    await rec.save();
    return rec;
  } catch (err) {
    console.error("⚠️ Error generating recommendation:", err);
  }
};

/* ---------------------------------------------------------------------
   3️⃣ GET USER’S LATEST TEST RESULT
   --------------------------------------------------------------------- */
exports.getLatestResult = async (req, res) => {
  try {
    const userId = req.user._id;
    const result = await TestResult.findOne({ userId })
      .sort({ createdAt: -1 })
      .populate("testId", "title duration competencyProfile");

    if (!result)
      return res.status(404).json({ message: "No test results found." });

    res.json({
      success: true,
      result,
    });
  } catch (err) {
    console.error("❌ Error fetching latest result:", err);
    res.status(500).json({ message: "Failed to fetch latest result." });
  }
};

/* ---------------------------------------------------------------------
   4️⃣ GET ALL TEST RESULTS (Student Dashboard)
   --------------------------------------------------------------------- */
exports.getUserResults = async (req, res) => {
  try {
    const userId = req.user._id;

    const results = await TestResult.find({ userId })
      .populate("testId", "title duration")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: results.length,
      results,
    });
  } catch (err) {
    console.error("❌ Error fetching results:", err);
    res.status(500).json({ message: "Failed to fetch test results." });
  }
};

/* ---------------------------------------------------------------------
   5️⃣ GET TEST RESULTS BY TEST ID (Admin Analytics)
   --------------------------------------------------------------------- */
exports.getResultsByTest = async (req, res) => {
  try {
    const { testId } = req.params;

    const results = await TestResult.find({ testId })
      .populate("userId", "name email role")
      .sort({ createdAt: -1 });

    if (!results.length)
      return res
        .status(404)
        .json({ message: "No results found for this test." });

    // Compute average performance metrics
    const avg = {
      percentage: 0,
      competencies: {
        analytical: 0,
        verbal: 0,
        creative: 0,
        scientific: 0,
        social: 0,
        technical: 0,
      },
    };

    results.forEach((r) => {
      avg.percentage += r.percentage;
      for (const key in avg.competencies) {
        avg.competencies[key] += r.competencyScores[key] || 0;
      }
    });

    const n = results.length;
    avg.percentage = parseFloat((avg.percentage / n).toFixed(2));
    for (const key in avg.competencies) {
      avg.competencies[key] = parseFloat(
        (avg.competencies[key] / n).toFixed(2)
      );
    }

    res.json({
      success: true,
      total: n,
      averagePerformance: avg,
      results,
    });
  } catch (err) {
    console.error("❌ Error fetching test results by ID:", err);
    res.status(500).json({ message: "Failed to fetch test analytics." });
  }
};

/* ---------------------------------------------------------------------
   6️⃣ DELETE A USER’S RESULT (Admin or Owner)
   --------------------------------------------------------------------- */
exports.deleteTestResult = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await TestResult.findById(id);

    if (!result) return res.status(404).json({ message: "Result not found." });

    // Only admin or the student who owns the result can delete
    if (
      req.user.role !== "admin" &&
      result.userId.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this result." });
    }

    await result.deleteOne();
    res.json({ success: true, message: "Test result deleted successfully." });
  } catch (err) {
    console.error("❌ Error deleting test result:", err);
    res.status(500).json({ message: "Failed to delete test result." });
  }
};

/* ---------------------------------------------------------------------
   7️⃣ AGGREGATED ANALYTICS (Admin Dashboard)
   --------------------------------------------------------------------- */
exports.getGlobalAnalytics = async (req, res) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: null,
          totalResults: { $sum: 1 },
          avgPercentage: { $avg: "$percentage" },
          avgCompetencies: {
            $avg: {
              $objectToArray: "$competencyScores",
            },
          },
        },
      },
    ];

    const stats = await TestResult.aggregate(pipeline);
    res.json({
      success: true,
      stats: stats[0] || {},
    });
  } catch (err) {
    console.error("❌ Error generating analytics:", err);
    res.status(500).json({ message: "Failed to generate analytics." });
  }
};
