const duffel = require("../config/duffel")

module.exports = async function searchFlights(input) {
  const offerRequest = await duffel.offerRequests.create({
    slices: [
      {
        origin: input.origin,
        destination: input.destination,
        departure_date: input.departure_date
      }
    ],
    passengers: [{ type: "adult" }],
    cabin_class: input.cabin_class || "economy"
  })

  const offers = await duffel.offers.list({
    offer_request_id: offerRequest.data.id
  })

  return offers.data
}
