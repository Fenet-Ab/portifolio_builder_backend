const express = require("express");

const router = express.Router();

const socialLinkController = require("./socialLink.controller");
const authMiddleware = require("../../middleware/auth.middleware");

router.post(
    "/",
    authMiddleware,
    socialLinkController.create
);

router.get(
    "/",
    authMiddleware,
    socialLinkController.getAll
);

router.get(
    "/:id",
    authMiddleware,
    socialLinkController.getById
);

router.put(
    "/:id",
    authMiddleware,
    socialLinkController.update
);

router.delete(
    "/:id",
    authMiddleware,
    socialLinkController.delete
);

module.exports = router;
