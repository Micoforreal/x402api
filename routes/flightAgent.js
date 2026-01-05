const router = require("express").Router()
const runAgent = require("../controllers/flightAgent.controller")
const validateInput = require("../middleware/validateInput")
const payment = require("../controllers/flightPayment.controller")
router.post("/flight-agent", validateInput, runAgent.runAgent)

router.post("/flight-payment",payment.Payment)


module.exports = router
