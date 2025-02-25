const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const mapController = require("../controllers/map.controller");
const { query } = require("express-validator");

// 🗺️ Get Coordinates (Geocoding)
router.get(
  "/get-coordinates",
  query("address")
    .isString()
    .withMessage("Address must be a string")
    .isLength({ min: 3 })
    .withMessage("Address must be at least 3 characters long"),
  authMiddleware.authUser,
  mapController.getCoordinates
);

// 🚗 Get Distance & Time (Routing) - ALLOWING PLACE NAMES
router.get(
  "/get-distance-time",
  query("origin")
    .isString()
    .withMessage("Origin must be a string (place name or coordinates)")
    .isLength({ min: 3 })
    .withMessage("Origin must be at least 3 characters long"),
  query("destination")
    .isString()
    .withMessage("Destination must be a string (place name or coordinates)")
    .isLength({ min: 3 })
    .withMessage("Destination must be at least 3 characters long"),
  authMiddleware.authUser,
  mapController.getDistanceTime
);

// 🔍 Get Autocomplete Suggestions
router.get(
  "/get-suggestions",
  query("input")
    .isString()
    .withMessage("Query must be a string")
    .isLength({ min: 3 })
    .withMessage("Query must be at least 3 characters long"),
  authMiddleware.authUser,
  mapController.getAutoCompleteSuggestions
);

module.exports = router;
