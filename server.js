
const express = require('express');
const { paymentMiddleware } = require('x402-express');
require('dotenv').config();
const app = express();
const flightRoutes = require("./routes/flightAgent")
const errorHandler = require("./middleware/errorHandler")
const { agentx402, flightPayment } = require("./middleware/x402");
const  runAgent  = require('./controllers/flightAgent.controller');
const validateInput = require('./middleware/validateInput');

const PORT = process.env.PORT || 8000;
app.use(express.json())



app.use(agentx402)

// app.use(flightPayment)



app.use("/x402/ai/", flightRoutes)


app.get("/.well-known/x402-verification.json", async (req, res) => {

  res.json({

     "x402": "715a624b3198" 

  })
})

app.use(errorHandler)





app.listen(PORT, async () => {

  console.log("Server listening on port 8000");
});