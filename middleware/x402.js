const { paymentMiddleware } = require('x402-express');
const { getOrderDetails } = require('../services/flightFullDetail.service');

const facilitatorObj = { url: "https://facilitator.payai.network" };
const network = "solana";
const address = "6cNGSrsCjbuMfHgryZPGQn8UwApsikYgqwV98F8jCvpr";
const agentx402 = paymentMiddleware(
    address,
    {
        // Protected endpoint for authentication
        "POST /x402/ai/flight-agent": {
            scheme: "exact",
            price: "$0.02",
            network: network,
            asset:"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"

        },
        

    },
    
    facilitatorObj,


)

const flightPayment = async (req, res, next) => {

    if (req.method !== "POST" || req.path !== "/x402/ai/flight-payment") {
        return next(); 
    }
    try {



        const order_id = req.body.order_id;


        if (!order_id) {
            return res.status(400).json({ error: "order_id is required" });
        }

        const details = await getOrderDetails(order_id);

        const price = details.total_amount

        // const middleware = paymentMiddleware(
        //     address,
        //     {
        //         "POST /x402/ai/flight-payment": {
        //             scheme: "exact",
        //             price: `$${price}`,
        //             network: network,
        //         },
        //     },
        //     facilitatorObj
        // );
        // return middleware(req, res, next);
        console.log(details)
    } catch (error) {
        return res.status(400).json({ error: error });
    }

};




module.exports = { agentx402, flightPayment };

