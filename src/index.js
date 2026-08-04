
// const adminRoutes = require("./modules/admin/admin.route");
const authRoutes = require("./modules/auth/auth.route")
const profileRoutes = require("./modules/profile/profile.route")
const projectRoutes = require("./modules/project/project.route");
const skillRoutes = require("./modules/skill/skill.route");
const experienceRoutes = require("./modules/experience/experiance.route");
const certificateRoutes = require("./modules/certificate/certificate.route");
const socialLinkRoutes = require("./modules/socialLink/socialLink.route");
const blogPostRoutes = require("./modules/blogPost/blogPost.route");
const publicPortfolioRoute = require("./modules/publicPortfolio/publicPortfolio.route");



const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 5000



// app api
app.use(cors())
app.use(express.json())
// app.use("/api/admin", adminRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/profile", profileRoutes)
app.use("/api/projects", projectRoutes);
app.use("/api/skill", skillRoutes);
app.use("/api/experiance", experienceRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/social-links", socialLinkRoutes);
app.use("/api/blog-posts", blogPostRoutes);
app.use("/api/public", publicPortfolioRoute);

app.listen(PORT, () => {
    console.log(`server is live now  http://localhost:${PORT}`)
})