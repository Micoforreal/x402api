const searchFlights = require("../services/duffelSearch.service")
const chooseFlight = require("../services/aiDecision.service")
const bookFlight = require("../services/duffelBooking.service")
const emailService = require("../services/email.service")
const getDetails = require("../services/flightFullDetail.service")

exports.runAgent = async (req, res, next) => {
  try {
    const input = req.body

    // 1. Search flights
    const offers = await searchFlights(input)

    // // 2. AI selects best offer
    const decision = await chooseFlight(offers, input)

    // 3. Book selected offer
    // const order = await bookFlight(decision.offer_id, input)

    // 4 Get flight full details 

    const orderDetails = await getDetails(decision.selected_offer_id)

    const order = await bookFlight(orderDetails, input)
    // 4. Send confirmation
    await emailService.send(input.user_email, order)

    res.json({
      status: "booked",
      order_id: order
    })
  } catch (err) {
    next(err)
  }
}
