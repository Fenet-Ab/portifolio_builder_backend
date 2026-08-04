const prisma = require("../../config/prisma");

class ExperienceService {

    // Create Experience
    async createExperience(userId, experienceData) {

        const experience = await prisma.experience.create({
            data: {
                ...experienceData,
                userId
            }
        });

        return experience;
    }

    // Get All Experiences
    async getExperiences(userId) {

        return await prisma.experience.findMany({
            where: {
                userId
            },
            orderBy: {
                startDate: "desc"
            }
        });

    }

    // Get One Experience
    async getExperienceById(userId, experienceId) {

        const experience = await prisma.experience.findFirst({
            where: {
                id: experienceId,
                userId
            }
        });

        if (!experience) {
            throw new Error("Experience not found");
        }

        return experience;
    }

    // Update Experience
    async updateExperience(userId, experienceId, experienceData) {

        const existingExperience = await prisma.experience.findFirst({
            where: {
                id: experienceId,
                userId
            }
        });

        if (!existingExperience) {
            throw new Error("Experience not found");
        }

        return await prisma.experience.update({
            where: {
                id: experienceId
            },
            data: experienceData
        });

    }

    // Delete Experience
    async deleteExperience(userId, experienceId) {

        const existingExperience = await prisma.experience.findFirst({
            where: {
                id: experienceId,
                userId
            }
        });

        if (!existingExperience) {
            throw new Error("Experience not found");
        }

        await prisma.experience.delete({
            where: {
                id: experienceId
            }
        });

        return {
            message: "Experience deleted successfully"
        };

    }

}

module.exports = new ExperienceService();