const socialLinkService = require("./socialLink.service");

class SocialLinkController {

    async create(req, res) {
        try {
            const socialLink = await socialLinkService.createSocialLink(
                req.user.userId,
                req.body
            );
            return res.status(201).json({
                success: true,
                message: "Social Link created successfully",
                data: socialLink
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
            const socialLinks = await socialLinkService.getSocialLinks(
                req.user.userId
            );
            return res.status(200).json({
                success: true,
                data: socialLinks
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
            const socialLink = await socialLinkService.getSocialLinkById(
                req.user.userId,
                req.params.id
            );
            return res.status(200).json({
                success: true,
                data: socialLink
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
            const socialLink = await socialLinkService.updateSocialLink(
                req.user.userId,
                req.params.id,
                req.body
            );
            return res.status(200).json({
                success: true,
                message: "Social Link updated successfully",
                data: socialLink
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
            const result = await socialLinkService.deleteSocialLink(
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

module.exports = new SocialLinkController();
