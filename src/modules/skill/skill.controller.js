const skillService = require("./skill.service");

class SkillController {

    async create(req, res) {

        try {

            const skill = await skillService.createSkill(
                req.user.userId,
                req.body
            );

            return res.status(201).json({
                success: true,
                message: "Skill created successfully",
                data: skill
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

            const skills = await skillService.getSkills(
                req.user.userId
            );

            return res.status(200).json({
                success: true,
                data: skills
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

            const skill = await skillService.getSkillById(
                req.user.userId,
                req.params.id
            );

            return res.status(200).json({
                success: true,
                data: skill
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

            const skill = await skillService.updateSkill(
                req.user.userId,
                req.params.id,
                req.body
            );

            return res.status(200).json({
                success: true,
                message: "Skill updated successfully",
                data: skill
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

            const result = await skillService.deleteSkill(
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

module.exports = new SkillController();