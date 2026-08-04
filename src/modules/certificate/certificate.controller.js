const certificateService = require("./certificate.service");

class CertificateController {

    async create(req, res) {
        try {
            const certificate = await certificateService.createCertificate(
                req.user.userId,
                req.body
            );
            return res.status(201).json({
                success: true,
                message: "Certificate created successfully",
                data: certificate
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
            const certificates = await certificateService.getCertificates(
                req.user.userId
            );
            return res.status(200).json({
                success: true,
                data: certificates
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
            const certificate = await certificateService.getCertificateById(
                req.user.userId,
                req.params.id
            );
            return res.status(200).json({
                success: true,
                data: certificate
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
            const certificate = await certificateService.updateCertificate(
                req.user.userId,
                req.params.id,
                req.body
            );
            return res.status(200).json({
                success: true,
                message: "Certificate updated successfully",
                data: certificate
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
            const result = await certificateService.deleteCertificate(
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

module.exports = new CertificateController();
