const prisma = require("../../config/prisma");

class CertificateService {

    // Create Certificate
    async createCertificate(userId, certificateData) {

        const certificate = await prisma.certificate.create({
            data: {
                ...certificateData,
                userId
            }
        });

        return certificate;
    }

    // Get All Certificates
    async getCertificates(userId) {

        return await prisma.certificate.findMany({
            where: {
                userId
            },
            orderBy: {
                issueDate: "desc"
            }
        });

    }

    // Get One Certificate
    async getCertificateById(userId, certificateId) {

        const certificate = await prisma.certificate.findFirst({
            where: {
                id: certificateId,
                userId
            }
        });

        if (!certificate) {
            throw new Error("Certificate not found");
        }

        return certificate;
    }

    // Update Certificate
    async updateCertificate(userId, certificateId, certificateData) {

        const existingCertificate = await prisma.certificate.findFirst({
            where: {
                id: certificateId,
                userId
            }
        });

        if (!existingCertificate) {
            throw new Error("Certificate not found");
        }

        return await prisma.certificate.update({
            where: {
                id: certificateId
            },
            data: certificateData
        });

    }

    // Delete Certificate
    async deleteCertificate(userId, certificateId) {

        const existingCertificate = await prisma.certificate.findFirst({
            where: {
                id: certificateId,
                userId
            }
        });

        if (!existingCertificate) {
            throw new Error("Certificate not found");
        }

        await prisma.certificate.delete({
            where: {
                id: certificateId
            }
        });

        return {
            message: "Certificate deleted successfully"
        };

    }

}

module.exports = new CertificateService();
