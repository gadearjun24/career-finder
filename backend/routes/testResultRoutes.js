const express = require("express");
const router = express.Router();
const {
  submitTest,
  getLatestResult,
  getUserResults,
  getResultsByTest,
  deleteTestResult,
  getGlobalAnalytics,
} = require("../controllers/testResultController");
const { protect, authorize } = require("../middleware/auth");

/* ------------------------------------------------------------------
   ROUTES
   ------------------------------------------------------------------ */

// Student
router.post("/submit", protect, authorize("student"), submitTest);
router.get("/my/latest", protect, authorize("student"), getLatestResult);
router.get("/my", protect, authorize("student"), getUserResults);

// Admin
router.get(
  "/analytics/global",
  protect,
  authorize("admin"),
  getGlobalAnalytics
);
router.get("/test/:testId", protect, authorize("admin"), getResultsByTest);
router.delete("/:id", protect, authorize("admin", "student"), deleteTestResult);

exports.testResultRouter = router;
