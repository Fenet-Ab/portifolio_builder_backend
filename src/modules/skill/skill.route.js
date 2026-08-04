const express = require("express");

const router = express.Router();

const skillController = require("./skill.controller");
const authMiddleware = require("../../middleware/auth.middleware");

router.post(
    "/",
    authMiddleware,
    skillController.create
);

router.get(
    "/",
    authMiddleware,
    skillController.getAll
);

router.get(
    "/:id",
    authMiddleware,
    skillController.getById
);

router.put(
    "/:id",
    authMiddleware,
    skillController.update
);

router.delete(
    "/:id",
    authMiddleware,
    skillController.delete
);

module.exports = router;