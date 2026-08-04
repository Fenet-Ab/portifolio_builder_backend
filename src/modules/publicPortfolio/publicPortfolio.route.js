const router = require("express").Router();

const controller =
    require("./publicPortfolio.controller");



router.get(
    "/:username",
    controller.getPortfolio
);



module.exports = router;