const prisma = require("../../config/prisma");


class ProfileService {


    async createProfile(userId, profileData) {

        const existingProfile = await prisma.profile.findUnique({
            where: {
                userId
            }
        });


        if (existingProfile) {
            throw new Error("Profile already exists");
        }


        const profile = await prisma.profile.create({

            data: {
                ...profileData,
                userId
            }

        });


        return profile;
    }



    async getMyProfile(userId) {


        const profile = await prisma.profile.findUnique({

            where: {
                userId
            },

            include: {

                user: {

                    select: {

                        id: true,
                        name: true,
                        email: true,
                        username: true,

                        projects: true,

                        skills: true,

                        experiences: true,

                        certificates: true,

                        socialLinks: true,

                        blogPosts: true

                    }

                }

            }

        });


        if (!profile) {
            throw new Error("Profile not found");
        }


        return profile;

    }



    // async updateProfile(userId, profileData) {


    //     const profile = await prisma.profile.update({

    //         where: {
    //             userId
    //         },

    //         data: profileData

    //     });


    //     return profile;

    // }



    async publishProfile(userId) {

        const profile = await prisma.profile.findUnique({

            where: {
                userId
            }

        });


        if (!profile) {

            throw new Error("Profile not found");

        }


        const updatedProfile = await prisma.profile.update({

            where: {
                userId
            },

            data: {
                isPublished: true
            }

        });


        return updatedProfile;

    }
}






module.exports = new ProfileService();