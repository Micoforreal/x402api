const router = require("express").Router()
const controller = require("../controllers/flightAgent.controller")
const validateInput = require("../middleware/validateInput")

router.post("/flight-agent", validateInput, controller.runAgent)

module.exports = router
