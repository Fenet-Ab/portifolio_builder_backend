const express = require("express");

const router = express.Router();

const blogPostController = require("./blogPost.controller");
const authMiddleware = require("../../middleware/auth.middleware");

router.post(
    "/",
    authMiddleware,
    blogPostController.create
);

router.get(
    "/",
    authMiddleware,
    blogPostController.getAll
);

router.get(
    "/:id",
    authMiddleware,
    blogPostController.getById
);

router.put(
    "/:id",
    authMiddleware,
    blogPostController.update
);

router.delete(
    "/:id",
    authMiddleware,
    blogPostController.delete
);

module.exports = router;
