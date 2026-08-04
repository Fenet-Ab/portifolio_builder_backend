const prisma = require("../../config/prisma");

class ProjectService {

    // Create a project
    async createProject(userId, projectData) {

        const project = await prisma.project.create({
            data: {
                ...projectData,
                userId
            },
            select: {
                id: true,
                title: true,
                description: true,
                userId: true
            }
        });

        return project;
    }

    // Get all projects of the logged-in user
    async getProjects(userId) {

        const projects = await prisma.project.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return projects;
    }

    // Get one project by ID
    async getProjectById(userId, projectId) {

        const project = await prisma.project.findFirst({
            where: {
                id: projectId,
                userId
            }
        });

        if (!project) {
            throw new Error("Project not found");
        }

        return project;
    }

    // Update a project
    async updateProject(userId, projectId, projectData) {

        const existingProject = await prisma.project.findFirst({
            where: {
                id: projectId,
                userId
            }
        });

        if (!existingProject) {
            throw new Error("Project not found");
        }

        const updatedProject = await prisma.project.update({
            where: {
                id: projectId
            },
            data: projectData
        });

        return updatedProject;
    }

    // Delete a project
    async deleteProject(userId, projectId) {

        const existingProject = await prisma.project.findFirst({
            where: {
                id: projectId,
                userId
            }
        });

        if (!existingProject) {
            throw new Error("Project not found");
        }

        await prisma.project.delete({
            where: {
                id: projectId
            }
        });

        return {
            message: "Project deleted successfully"
        };
    }

}

module.exports = new ProjectService();