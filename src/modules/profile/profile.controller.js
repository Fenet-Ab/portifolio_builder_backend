const profileService = require("./profile.service");


class ProfileController {


    async create(req, res) {

        try {

            const profile = await profileService.createProfile(
                req.user.userId,
                req.body
            );


            res.status(201).json({
                success: true,
                data: profile
            });


        } catch (error) {

            res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }




    async getMyProfile(req, res) {

        try {

            const profile = await profileService.getMyProfile(
                req.user.userId
            );


            res.status(200).json({
                success: true,
                data: profile
            });


        } catch (error) {

            res.status(404).json({
                success: false,
                message: error.message
            });

        }

    }




    async update(req, res) {

        try {

            const profile = await profileService.updateProfile(
                req.user.userId,
                req.body
            );


            res.status(200).json({
                success: true,
                data: profile
            });


        } catch (error) {

            res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }





    async publish(req, res) {

        try {

            const profile =
                await profileService.publishProfile(
                    req.user.userId
                );


            return res.status(200).json({

                success: true,

                message: "Portfolio published successfully",

                data: profile

            });


        } catch (error) {

            return res.status(400).json({

                success: false,

                message: error.message

            });

        }

    }

}


module.exports = new ProfileController();