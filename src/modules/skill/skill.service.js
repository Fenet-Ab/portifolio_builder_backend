const prisma = require("../../config/prisma");

class SkillService {

    // Create Skill
    async createSkill(userId, skillData) {

        const skill = await prisma.skill.create({
            data: {
                ...skillData,
                userId
            }
        });

        return skill;
    }

    // Get All Skills
    async getSkills(userId) {

        return await prisma.skill.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: "desc"
            }
        });

    }

    // Get One Skill
    async getSkillById(userId, skillId) {

        const skill = await prisma.skill.findFirst({
            where: {
                id: skillId,
                userId
            }
        });

        if (!skill) {
            throw new Error("Skill not found");
        }

        return skill;
    }

    // Update Skill
    async updateSkill(userId, skillId, skillData) {

        const existingSkill = await prisma.skill.findFirst({
            where: {
                id: skillId,
                userId
            }
        });

        if (!existingSkill) {
            throw new Error("Skill not found");
        }

        return await prisma.skill.update({
            where: {
                id: skillId
            },
            data: skillData
        });

    }

    // Delete Skill
    async deleteSkill(userId, skillId) {

        const existingSkill = await prisma.skill.findFirst({
            where: {
                id: skillId,
                userId
            }
        });

        if (!existingSkill) {
            throw new Error("Skill not found");
        }

        await prisma.skill.delete({
            where: {
                id: skillId
            }
        });

        return {
            message: "Skill deleted successfully"
        };

    }

}

module.exports = new SkillService();