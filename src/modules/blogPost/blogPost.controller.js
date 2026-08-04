const blogPostService = require("./blogPost.service");

class BlogPostController {

    async create(req, res) {
        try {
            const blogPost = await blogPostService.createBlogPost(
                req.user.userId,
                req.body
            );
            return res.status(201).json({
                success: true,
                message: "Blog Post created successfully",
                data: blogPost
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async getAll(req, res) {
        try {
            const blogPosts = await blogPostService.getBlogPosts(
                req.user.userId
            );
            return res.status(200).json({
                success: true,
                data: blogPosts
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async getById(req, res) {
        try {
            const blogPost = await blogPostService.getBlogPostById(
                req.user.userId,
                req.params.id
            );
            return res.status(200).json({
                success: true,
                data: blogPost
            });
        } catch (error) {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    async update(req, res) {
        try {
            const blogPost = await blogPostService.updateBlogPost(
                req.user.userId,
                req.params.id,
                req.body
            );
            return res.status(200).json({
                success: true,
                message: "Blog Post updated successfully",
                data: blogPost
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async delete(req, res) {
        try {
            const result = await blogPostService.deleteBlogPost(
                req.user.userId,
                req.params.id
            );
            return res.status(200).json({
                success: true,
                message: result.message
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

}

module.exports = new BlogPostController();
