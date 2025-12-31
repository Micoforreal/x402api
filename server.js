
const express = require('express');
const { paymentMiddleware } =require('x402-express');
require('dotenv').config();
const app = express();
const flightRoutes = require("./routes/flightAgent")
const errorHandler = require("./middleware/errorHandler")

const network = "solana";
const PORT = process.env.PORT || 8000;
const facilitatorObj = { url: "https://facilitator.payai.network" };


app.use(
  paymentMiddleware(
    "6cNGSrsCjbuMfHgryZPGQn8UwApsikYgqwV98F8jCvpr", 
        {
      // Protected endpoint for authentication
      "POST /x402/ai/flight-agent": {
        scheme: "exact",
        price: "$0.02",
        network: network,

      },




    },
    facilitatorObj,


  )
);


app.use(express.json())

app.use("/x402/ai", flightRoutes)

app.get("/.well-known/x402-verification.json", async(req, res)=>{

  res.json({

    "x402": "23996ad3f4a2" 
  
  })
})

app.use(errorHandler)




app.listen(PORT, async () => {

  console.log("Server listening on port 8000");
});