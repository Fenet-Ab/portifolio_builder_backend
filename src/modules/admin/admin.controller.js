const adminService = require('./admin.service');

class AdminController{
    async registerAdmin(req,res){
        try{
            
            const newAdmin = await adminService.registerAdmin(req.body);
            res.status(201).json(newAdmin);
        }catch(error){
            res.status(400).json({error:error.message});
        }
    }
}
module.exports = new AdminController();
