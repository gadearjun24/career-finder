const express = require("express");
const router = express.Router();
const {
  createTest,
  getAllTests,
  getTestById,
  updateTest,
  deleteTest,
  getRandomizedTest,
  toggleTestStatus,
  getTestsByCompetency,
} = require("../controllers/testController.js");
const { protect, authorize } = require("../middleware/auth");

/* ------------------------------------------------------------------
   ROUTES
   ------------------------------------------------------------------ */

// Public
router.get("/", getAllTests);
router.get("/:id", getTestById);
router.get("/:id/randomized", protect, authorize("student"), getRandomizedTest);

// Admin Protected Routes
router.post("/", protect, authorize("admin"), createTest);
router.put("/:id", protect, authorize("admin"), updateTest);
router.delete("/:id", protect, authorize("admin"), deleteTest);
router.patch("/:id/toggle", protect, authorize("admin"), toggleTestStatus);
router.get(
  "/filter/by-competency",
  protect,
  authorize("admin"),
  getTestsByCompetency
);

exports.testRouter = router;
