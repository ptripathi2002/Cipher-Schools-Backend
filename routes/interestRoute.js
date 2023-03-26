const express = require("express");
const {
  createInterest,
  getAllInterests,
  getSingleInterest,
  deleteInterest,
  updateInterest,
} = require("../controllers/interestController");
const protect = require("../middleWare/authMiddleware");

const router = express.Router();

router.post("/", protect, createInterest);
router.patch("/:id", protect, updateInterest);
router.get("/", protect, getAllInterests);
router.get("/:id", protect, getSingleInterest);
router.delete("/:id", protect, deleteInterest);
module.exports = router;
