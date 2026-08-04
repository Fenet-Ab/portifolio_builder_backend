const express = require("express");
const profileController = require("./profile.controller")
const authMiddleware = require("../../middleware/auth.middleware");
const { profile } = require("console");


const router = express.Router();
// create profile
router.post("/", authMiddleware, profileController.create);

// get profile
router.get("/me", authMiddleware, profileController.getMyProfile);

// update profile
router.put("/", authMiddleware, profileController.update);

// publish profile
router.patch("/publish", authMiddleware, profileController.publish);



module.exports = router;

