const bcrypt = require("bcrypt");
const prisma = require("../../config/prisma");
const generateToken = require("../../utils/jwt");


class AuthService {


    async register(userData) {

        const {
            name,
            email,
            username,
            password
        } = userData;


        // check existing email
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        });


        if (existingUser) {
            throw new Error("Email already registered");
        }



        // check username
        const existingUsername = await prisma.user.findUnique({
            where: {
                username
            }
        });


        if (existingUsername) {
            throw new Error("Username already taken");
        }



        // hash password

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );



        // create user

        const user = await prisma.user.create({

            data: {
                name,
                email,
                username,
                password: hashedPassword
            }

        });



        const token = generateToken(user);



        // remove password

        user.password = undefined;



        return {
            user,
            token
        };

    }



    async login(email, password) {


        const user = await prisma.user.findUnique({

            where: {
                email
            }

        });



        if (!user) {
            throw new Error("Invalid credentials");
        }



        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );


        if (!passwordMatch) {

            throw new Error("Invalid credentials");

        }



        const token = generateToken(user);



        user.password = undefined;



        return {
            user,
            token
        };


    }



}


module.exports = new AuthService();