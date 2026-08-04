const publicPortfolioService =
    require("./publicPortfolio.service");


class PublicPortfolioController {


    async getPortfolio(req, res) {


        try {


            const portfolio =
                await publicPortfolioService.getPortfolio(
                    req.params.username
                );


            res.status(200).json({

                success: true,

                data: portfolio

            });



        } catch (error) {


            res.status(404).json({

                success: false,

                message: error.message

            });


        }


    }


}


module.exports = new PublicPortfolioController();