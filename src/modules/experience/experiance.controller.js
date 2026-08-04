const experienceService = require("./experiance.service");

class ExperienceController {

    async create(req, res) {

        try {

            const experience = await experienceService.createExperience(
                req.user.userId,
                req.body
            );

            return res.status(201).json({
                success: true,
                message: "Experience created successfully",
                data: experience
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

            const experiences = await experienceService.getExperiences(
                req.user.userId
            );

            return res.status(200).json({
                success: true,
                data: experiences
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

            const experience = await experienceService.getExperienceById(
                req.user.userId,
                req.params.id
            );

            return res.status(200).json({
                success: true,
                data: experience
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

            const experience = await experienceService.updateExperience(
                req.user.userId,
                req.params.id,
                req.body
            );

            return res.status(200).json({
                success: true,
                message: "Experience updated successfully",
                data: experience
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

            const result = await experienceService.deleteExperience(
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

module.exports = new ExperienceController();