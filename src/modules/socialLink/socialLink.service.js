const prisma = require("../../config/prisma");

class SocialLinkService {

    // Create SocialLink
    async createSocialLink(userId, socialLinkData) {

        const socialLink = await prisma.socialLink.create({
            data: {
                ...socialLinkData,
                userId
            }
        });

        return socialLink;
    }

    // Get All SocialLinks
    async getSocialLinks(userId) {

        return await prisma.socialLink.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: "desc"
            }
        });

    }

    // Get One SocialLink
    async getSocialLinkById(userId, socialLinkId) {

        const socialLink = await prisma.socialLink.findFirst({
            where: {
                id: socialLinkId,
                userId
            }
        });

        if (!socialLink) {
            throw new Error("Social Link not found");
        }

        return socialLink;
    }

    // Update SocialLink
    async updateSocialLink(userId, socialLinkId, socialLinkData) {

        const existingSocialLink = await prisma.socialLink.findFirst({
            where: {
                id: socialLinkId,
                userId
            }
        });

        if (!existingSocialLink) {
            throw new Error("Social Link not found");
        }

        return await prisma.socialLink.update({
            where: {
                id: socialLinkId
            },
            data: socialLinkData
        });

    }

    // Delete SocialLink
    async deleteSocialLink(userId, socialLinkId) {

        const existingSocialLink = await prisma.socialLink.findFirst({
            where: {
                id: socialLinkId,
                userId
            }
        });

        if (!existingSocialLink) {
            throw new Error("Social Link not found");
        }

        await prisma.socialLink.delete({
            where: {
                id: socialLinkId
            }
        });

        return {
            message: "Social Link deleted successfully"
        };

    }

}

module.exports = new SocialLinkService();
