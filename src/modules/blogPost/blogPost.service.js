const prisma = require("../../config/prisma");

class BlogPostService {

    // Create BlogPost
    async createBlogPost(userId, blogPostData) {

        // Optionally, generate slug if not provided, assuming title is provided
        let slug = blogPostData.slug;
        if (!slug && blogPostData.title) {
            slug = blogPostData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        }

        const blogPost = await prisma.blogPost.create({
            data: {
                ...blogPostData,
                slug: slug || undefined, // Prisma will require slug as it's unique and required in schema
                userId
            }
        });

        return blogPost;
    }

    // Get All BlogPosts
    async getBlogPosts(userId) {

        return await prisma.blogPost.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: "desc"
            }
        });

    }

    // Get One BlogPost
    async getBlogPostById(userId, blogPostId) {

        const blogPost = await prisma.blogPost.findFirst({
            where: {
                id: blogPostId,
                userId
            }
        });

        if (!blogPost) {
            throw new Error("Blog Post not found");
        }

        return blogPost;
    }

    // Update BlogPost
    async updateBlogPost(userId, blogPostId, blogPostData) {

        const existingBlogPost = await prisma.blogPost.findFirst({
            where: {
                id: blogPostId,
                userId
            }
        });

        if (!existingBlogPost) {
            throw new Error("Blog Post not found");
        }

        if (blogPostData.title && !blogPostData.slug) {
             blogPostData.slug = blogPostData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        }

        return await prisma.blogPost.update({
            where: {
                id: blogPostId
            },
            data: blogPostData
        });

    }

    // Delete BlogPost
    async deleteBlogPost(userId, blogPostId) {

        const existingBlogPost = await prisma.blogPost.findFirst({
            where: {
                id: blogPostId,
                userId
            }
        });

        if (!existingBlogPost) {
            throw new Error("Blog Post not found");
        }

        await prisma.blogPost.delete({
            where: {
                id: blogPostId
            }
        });

        return {
            message: "Blog Post deleted successfully"
        };

    }

}

module.exports = new BlogPostService();
