const express = require("express");
const router = express.Router();
const {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    incrementInterest,
} = require("../controllers/courseController");

// 🔐 Auth middleware
const { protect, authorize } = require("../middleware/auth");

/* ============================================================
   📘 COURSE ROUTES
   Base path → /api/courses
   ============================================================ */

/**
 * @route   GET /api/courses
 * @desc    Get all courses (optional ?collegeId=xxx)
 * @access  Public
 */
router.get("/", getCourses);

/**
 * @route   POST /api/courses
 * @desc    Add new course
 * @access  Private (College or Admin)
 */
router.post("/", protect, authorize("admin","college"), createCourse);

/**
 * @route   GET /api/courses/:id
 * @desc    Get single course with learning path
 * @access  Public
 */
router.get("/:id", getCourseById);

/**
 * @route   PUT /api/courses/:id
 * @desc    Update course details
 * @access  Private (College or Admin)
 */
router.put("/:id", protect, authorize("admin","college"), updateCourse);

/**
 * @route   DELETE /api/courses/:id
 * @desc    Delete course and learning path
 * @access  Private (College or Admin)
 */
router.delete("/:id", protect, authorize("admin","college"), deleteCourse);

/**
 * @route   POST /api/courses/:id/interested
 * @desc    Increment interest count for analytics
 * @access  Public
 */
router.post("/:id/interested", incrementInterest);

exports.courseRouter = router;
