const express = require("express");

const router = express.Router();

const experienceController = require("./experiance.controller");
const authMiddleware = require("../../middleware/auth.middleware");

router.post(
    "/",
    authMiddleware,
    experienceController.create
);

router.get(
    "/",
    authMiddleware,
    experienceController.getAll
);

router.get(
    "/:id",
    authMiddleware,
    experienceController.getById
);

router.put(
    "/:id",
    authMiddleware,
    experienceController.update
);

router.delete(
    "/:id",
    authMiddleware,
    experienceController.delete
);

module.exports = router;