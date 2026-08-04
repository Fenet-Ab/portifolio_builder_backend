const express = require("express");

const router = express.Router();

const certificateController = require("./certificate.controller");
const authMiddleware = require("../../middleware/auth.middleware");

router.post(
    "/",
    authMiddleware,
    certificateController.create
);

router.get(
    "/",
    authMiddleware,
    certificateController.getAll
);

router.get(
    "/:id",
    authMiddleware,
    certificateController.getById
);

router.put(
    "/:id",
    authMiddleware,
    certificateController.update
);

router.delete(
    "/:id",
    authMiddleware,
    certificateController.delete
);

module.exports = router;
