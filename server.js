
const express = require('express');
const { paymentMiddleware } =require('x402-express');
require('dotenv').config();
const app = express();
const flightRoutes = require("./routes/flightAgent")
const errorHandler = require("./middleware/errorHandler")

const network = "base-sepolia";
const PORT = process.env.PORT || 8000;
const facilitatorObj = { url: "https://x402.org/facilitator" };


app.use(
  paymentMiddleware(
    "0xe6e8aEE83b272ad56CB3090391674472Fe089382", 
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