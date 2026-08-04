const prisma = require("../../config/prisma");


class PublicPortfolioService {


    async getPortfolio(username) {


        const user = await prisma.user.findUnique({

            where: {
                username
            },

            include: {

                profile: true,

                projects: true,

                skills: true,

                experiences: true,

                certificates: true,

                socialLinks: true

            }

        });



        if (!user) {

            throw new Error("Portfolio not found");

        }



        if (!user.profile || !user.profile.isPublished) {

            throw new Error("Portfolio is not published");

        }



        return {

            username: user.username,

            profile: user.profile,

            projects: user.projects,

            skills: user.skills,

            experiences: user.experiences,

            certificates: user.certificates,

            socialLinks: user.socialLinks

        };


    }


}


module.exports = new PublicPortfolioService();