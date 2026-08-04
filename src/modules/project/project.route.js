const express = require("express");

const router = express.Router();

const projectController = require("./project.controller");
const authMiddleware = require("../../middleware/auth.middleware");

// Create Project
router.post(
    "/",
    authMiddleware,
    projectController.create
);

// Get All Projects
router.get(
    "/",
    authMiddleware,
    projectController.getAll
);

// Get One Project
router.get(
    "/:id",
    authMiddleware,
    projectController.getById
);

// Update Project
router.put(
    "/:id",
    authMiddleware,
    projectController.update
);

// Delete Project
router.delete(
    "/:id",
    authMiddleware,
    projectController.delete
);

module.exports = router;