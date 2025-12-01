// File: controllers/learningPathController.js
const LearningPath = require("../models/LearningPath");
const Course = require("../models/Course");

/* ============================================================
   🧭 LEARNING PATH CONTROLLER
   Defines course-specific learning journey (roadmap)
   ============================================================ */

/**
 * @desc    Create new learning path for a course
 * @route   POST /api/learning-paths
 * @access  Private (college or admin)
 */
exports.createLearningPath = async (req, res) => {
  try {
    const { courseId, title, stages } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found." });

    const existing = await LearningPath.findOne({ courseId });
    if (existing)
      return res
        .status(400)
        .json({ message: "Learning path already exists for this course." });

    const totalModules = stages?.reduce(
      (acc, s) => acc + (s.modules?.length || 0),
      0
    );
    const totalResources = stages?.reduce(
      (acc, s) =>
        acc +
        s.modules?.reduce((m, mod) => m + (mod.resources?.length || 0), 0),
      0
    );

    const newPath = await LearningPath.create({
      ...req.body,
      totalModules,
      totalResources,
    });

    res
      .status(201)
      .json({ message: "Learning path created successfully.", path: newPath });
  } catch (err) {
    console.error("Create Learning Path Error:", err);
    res.status(500).json({ message: "Error creating learning path." });
  }
};

/**
 * @desc    Get all learning paths (optional filtering)
 * @route   GET /api/learning-paths
 * @access  Public
 */
exports.getLearningPaths = async (req, res) => {
  try {
    const { courseId, difficultyLevel, mode } = req.query;
    const query = {};
    if (courseId) query.courseId = courseId;
    if (difficultyLevel) query.difficultyLevel = difficultyLevel;
    if (mode) query.mode = mode;

    const paths = await LearningPath.find(query)
      .populate("courseId", "title collegeId")
      .sort({ createdAt: -1 });

    res.json({ count: paths.length, paths });
  } catch (err) {
    console.error("Fetch Learning Paths Error:", err);
    res.status(500).json({ message: "Error fetching learning paths." });
  }
};

/**
 * @desc    Get a single learning path (detailed)
 * @route   GET /api/learning-paths/:id
 * @access  Public
 */
exports.getLearningPathById = async (req, res) => {
  try {
    const path = await LearningPath.findById(req.params.id).populate(
      "courseId",
      "title collegeId"
    );
    if (!path)
      return res.status(404).json({ message: "Learning path not found." });

    res.json(path);
  } catch (err) {
    console.error("Get Learning Path Error:", err);
    res.status(500).json({ message: "Error fetching learning path." });
  }
};

/**
 * @desc    Update learning path
 * @route   PUT /api/learning-paths/:id
 * @access  Private
 */
exports.updateLearningPath = async (req, res) => {
  try {
    const path = await LearningPath.findById(req.params.id);
    if (!path)
      return res.status(404).json({ message: "Learning path not found." });

    Object.assign(path, req.body);

    // Recalculate totals
    path.totalModules = path.stages?.reduce(
      (acc, s) => acc + (s.modules?.length || 0),
      0
    );
    path.totalResources = path.stages?.reduce(
      (acc, s) =>
        acc +
        s.modules?.reduce((m, mod) => m + (mod.resources?.length || 0), 0),
      0
    );

    await path.save();
    res.json({ message: "Learning path updated.", path });
  } catch (err) {
    console.error("Update Learning Path Error:", err);
    res.status(500).json({ message: "Error updating learning path." });
  }
};

/**
 * @desc    Delete learning path
 * @route   DELETE /api/learning-paths/:id
 * @access  Private
 */
exports.deleteLearningPath = async (req, res) => {
  try {
    const path = await LearningPath.findById(req.params.id);
    if (!path)
      return res.status(404).json({ message: "Learning path not found." });

    await path.deleteOne();
    res.json({ message: "Learning path deleted successfully." });
  } catch (err) {
    console.error("Delete Learning Path Error:", err);
    res.status(500).json({ message: "Error deleting learning path." });
  }
};

/**
 * @desc    Add a new module or stage dynamically
 * @route   POST /api/learning-paths/:id/add-module
 * @access  Private
 */
exports.addStage = async (req, res) => {
  try {
    const path = await LearningPath.findById(req.params.id);
    if (!path)
      return res.status(404).json({ message: "Learning path not found." });

    const { stage } = req.body;
    if (!stage?.title)
      return res.status(400).json({ message: "Stage title is required." });

    path.stages.push(stage);
    path.totalModules += stage.modules?.length || 0;
    path.totalResources += stage.modules?.reduce(
      (sum, m) => sum + (m.resources?.length || 0),
      0
    );

    await path.save();
    res.json({ message: "Stage added successfully.", path });
  } catch (err) {
    console.error("Add Stage Error:", err);
    res.status(500).json({ message: "Error adding stage." });
  }
};
