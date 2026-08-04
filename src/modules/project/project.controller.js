const projectService = require("./project.service");

class ProjectController {

    // Create Project
    async create(req, res) {

        try {

            const project = await projectService.createProject(
                req.user.userId,
                req.body
            );

            return res.status(201).json({
                success: true,
                message: "Project created successfully",
                data: project
            });

        } catch (error) {

            return res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }

    // Get All Projects
    async getAll(req, res) {

        try {

            const projects = await projectService.getProjects(
                req.user.userId
            );

            return res.status(200).json({
                success: true,
                data: projects
            });

        } catch (error) {

            return res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }

    // Get Single Project
    async getById(req, res) {

        try {

            const project = await projectService.getProjectById(
                req.user.userId,
                req.params.id
            );

            return res.status(200).json({
                success: true,
                data: project
            });

        } catch (error) {

            return res.status(404).json({
                success: false,
                message: error.message
            });

        }

    }

    // Update Project
    async update(req, res) {

        try {

            const project = await projectService.updateProject(
                req.user.userId,
                req.params.id,
                req.body
            );

            return res.status(200).json({
                success: true,
                message: "Project updated successfully",
                data: project
            });

        } catch (error) {

            return res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }

    // Delete Project
    async delete(req, res) {

        try {

            const result = await projectService.deleteProject(
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

module.exports = new ProjectController();