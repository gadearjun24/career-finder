// File: controllers/courseController.js
const Course = require("../models/Course");
const College = require("../models/College");
const LearningPath = require("../models/LearningPath");

/* ============================================================
   📘  COURSE CONTROLLER
   Handles course management within a college.
   ============================================================ */

/**
 * @desc    Add new course to a college
 * @route   POST /api/courses
 * @access  Private (college owner or admin)
 */
exports.createCourse = async (req, res) => {
  try {
    const { collegeId, title, description, duration, intake, feePerYear } =
      req.body;

    // Validate ownership or admin
    if (req.user.role !== "admin" && req.user.role !== "college") {
      return res
        .status(403)
        .json({ message: "Only colleges or admins can create courses." });
    }

    // Ensure college exists
    const college = await College.findById(collegeId);
    if (!college)
      return res.status(404).json({ message: "College not found." });

    const newCourse = await Course.create({ ...req.body });

    // Auto-increment totalCourses count
    college.totalCourses = (college.totalCourses || 0) + 1;
    await college.save();

    res
      .status(201)
      .json({ message: "Course created successfully.", course: newCourse });
  } catch (err) {
    console.error("Create Course Error:", err);
    res
      .status(500)
      .json({ message: "Server error creating course.", error: err.message });
  }
};

/**
 * @desc    Get all courses (optionally by college)
 * @route   GET /api/courses?collegeId=xxx
 * @access  Public
 */
exports.getCourses = async (req, res) => {
  try {
    const { collegeId, search, mode } = req.query;
    const query = {};

    if (collegeId) query.collegeId = collegeId;
    if (mode) query.mode = mode;
    if (search) query.title = { $regex: search, $options: "i" };

    const courses = await Course.find(query).populate(
      "collegeId",
      "name location"
    );

    res.json({ count: courses.length, courses });
  } catch (err) {
    console.error("Get Courses Error:", err);
    res.status(500).json({ message: "Error fetching courses." });
  }
};

/**
 * @desc    Get single course with linked learning path
 * @route   GET /api/courses/:id
 * @access  Public
 */
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "collegeId",
      "name location logo"
    );
    if (!course) return res.status(404).json({ message: "Course not found." });

    const learningPath = await LearningPath.findOne({ courseId: course._id });
    res.json({ course, learningPath });
  } catch (err) {
    console.error("Get Course Error:", err);
    res.status(500).json({ message: "Error fetching course." });
  }
};

/**
 * @desc    Update course details
 * @route   PUT /api/courses/:id
 * @access  Private (college owner or admin)
 */
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found." });

    // Authorization: owner or admin
    if (req.user.role !== "admin" && req.user.role !== "college") {
      return res
        .status(403)
        .json({ message: "Not authorized to update this course." });
    }

    Object.assign(course, req.body);
    await course.save();

    res.json({ message: "Course updated successfully.", course });
  } catch (err) {
    console.error("Update Course Error:", err);
    res.status(500).json({ message: "Error updating course." });
  }
};

/**
 * @desc    Delete course (and its learning path)
 * @route   DELETE /api/courses/:id
 * @access  Private
 */
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found." });

    // Delete learning path if exists
    await LearningPath.deleteMany({ courseId: course._id });
    await course.deleteOne();

    res.json({ message: "Course and related learning paths deleted." });
  } catch (err) {
    console.error("Delete Course Error:", err);
    res.status(500).json({ message: "Error deleting course." });
  }
};

/**
 * @desc    Increment interest counter for analytics
 * @route   POST /api/courses/:id/interested
 * @access  Public
 */
exports.incrementInterest = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found." });

    course.interestedCount += 1;
    await course.save();

    res.json({ message: "Interest recorded.", count: course.interestedCount });
  } catch (err) {
    console.error("Interest Error:", err);
    res.status(500).json({ message: "Error updating interest." });
  }
};
