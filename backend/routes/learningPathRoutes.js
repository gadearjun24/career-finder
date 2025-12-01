const express = require("express");
const router = express.Router();
const {
  createLearningPath,
  getLearningPaths,
  getLearningPathById,
  updateLearningPath,
  deleteLearningPath,
  addStage,
} = require("../controllers/learningPathController");

// 🔐 Auth middleware
const { protect, authorize } = require("../middleware/auth");

/* ============================================================
   🧭 LEARNING PATH ROUTES
   Base path → /api/learning-paths
   ============================================================ */

/**
 * @route   GET /api/learning-paths
 * @desc    Get all learning paths (optionally filtered)
 * @access  Public
 */
router.get("/", getLearningPaths);

/**
 * @route   POST /api/learning-paths
 * @desc    Create new learning path
 * @access  Private (College or Admin)
 */
router.post("/", protect, authorize("admin", "college"), createLearningPath);

/**
 * @route   GET /api/learning-paths/:id
 * @desc    Get detailed learning path
 * @access  Public
 */
router.get("/:id", getLearningPathById);

/**
 * @route   PUT /api/learning-paths/:id
 * @desc    Update existing learning path
 * @access  Private (College or Admin)
 */
router.put("/:id", protect, authorize("admin", "college"), updateLearningPath);

/**
 * @route   DELETE /api/learning-paths/:id
 * @desc    Delete a learning path
 * @access  Private (College or Admin)
 */
router.delete(
  "/:id",
  protect,
  authorize("admin", "college"),
  deleteLearningPath
);

/**
 * @route   POST /api/learning-paths/:id/add-stage
 * @desc    Add a new stage dynamically
 * @access  Private (College or Admin)
 */
router.post("/:id/add-stage", protect, authorize("admin", "college"), addStage);

exports.learningPathRouter = router;
