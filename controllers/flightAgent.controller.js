const searchFlights = require("../services/duffelSearch.service")
const chooseFlight = require("../services/aiDecision.service")
const bookFlight = require("../services/duffelBooking.service")
const emailService = require("../services/email.service")
const { mapBookingForEmail } = require("../utils/duffelMapper");
const { getOfferDetails } = require("../services/flightFullDetail.service");

exports.runAgent = async (req, res, next) => {
  try {
    const input = req.body

    // 1. Search flights
    const offers = await searchFlights(input)

    // // 2. AI selects best offer
    const decision = await chooseFlight(offers, input)

    // 3. Book selected offer
    // const order = await bookFlight(decision.offer_id, input)

    const orderDetails = await getOfferDetails(decision.selected_offer_id)
    // 4 Get flight full details 


    const bookingResponse = await bookFlight(orderDetails, input)
    // 4. Send confirmation

    const order = bookingResponse.data;


    const emailPayload = mapBookingForEmail(order);

    await emailService.send({
      email: input.user_email,
      booking: emailPayload
    });



    res.json({
      success: true,
      order_id: order.id,
      passenger_ids: emailPayload.passengers,
      payment_required_by: emailPayload.paymentDeadline
    });



  } catch (err) {
    next(err)
  }
}

