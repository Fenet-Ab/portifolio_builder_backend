const bcrypt = require("bcrypt");
const prisma = require("../../config/prisma");

class AdminService{
    async registerAdmin (adminData){
        const {name,email,password}=adminData;

        // check if email already exists 
        const existngAdmin = await prisma.admin.findUnique({
            where:{
                email:email
            }
        })

        if(existngAdmin){
            throw new Error("Email already exists");
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password,10);

        // check if there is already an admin in the database

        const countAdmin = await prisma.admin.count();
        if (countAdmin >1){
            throw new Error("only one admin is allowed")

        }

        // create new admin
        const newAdmin = await prisma.admin.create({
            data:{
                name:name,
                email:email,
                password:hashedPassword
            }
        });
       
        // change the password to undefined before returning the new admin object
        newAdmin.password = undefined;
        return newAdmin;



};


}
module.exports = new AdminService();