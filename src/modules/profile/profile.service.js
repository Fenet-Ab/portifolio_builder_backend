const prisma = require("../../config/prisma");


class ProfileService {


    async createProfile(userId, profileData) {
        const profile = await prisma.profile.upsert({
            where: { userId },
            update: profileData,
            create: {
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



    async updateProfile(userId, profileData) {
        const profile = await prisma.profile.upsert({
            where: { userId },
            update: profileData,
            create: {
                ...profileData,
                userId
            }
        });
        return profile;
    }

    async deleteProfile(userId) {
        const existingProfile = await prisma.profile.findUnique({
            where: { userId }
        });

        if (!existingProfile) {
            throw new Error("Profile not found");
        }

        await prisma.profile.delete({
            where: { userId }
        });

        return { message: "Profile deleted successfully" };
    }



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






const profileService = new ProfileService();

module.exports = {
    createProfile: profileService.createProfile.bind(profileService),
    getMyProfile: profileService.getMyProfile.bind(profileService),
    updateProfile: profileService.updateProfile.bind(profileService),
    publishProfile: profileService.publishProfile.bind(profileService),
    deleteProfile: profileService.deleteProfile.bind(profileService),
};