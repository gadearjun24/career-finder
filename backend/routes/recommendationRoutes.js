// routes/recommendationRoutes.js
const express = require("express");
const router = express.Router();
const recCtrl = require("../controllers/recommendationController");
const { protect, authorize } = require("../middleware/auth");

// Students / authenticated users
router.post(
  "/for-result",
  protect,
  authorize("student", "admin", "college", "company"),
  recCtrl.recommendForTestResult
);
router.post(
  "/for-user",
  protect,
  authorize("student", "admin"),
  recCtrl.recommendForUser
);
router.get(
  "/my",
  protect,
  authorize("student", "admin"),
  recCtrl.getMyRecommendations
);

// Admin
router.get(
  "/analytics/top-courses",
  protect,
  authorize("admin"),
  recCtrl.topRecommendedCourses
);
router.get("/:id", protect, authorize("admin"), recCtrl.getRecommendationById);
router.delete(
  "/:id",
  protect,
  authorize("admin", "student"),
  recCtrl.deleteRecommendation
);

exports.recommendationRouter = router;
