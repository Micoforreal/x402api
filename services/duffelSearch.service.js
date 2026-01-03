const duffel = require("../config/duffel");
const resolveLocation = require("./resolveLocation");

module.exports = async function searchFlights(input) {

  const origin = await resolveLocation(input.origin);
  const destination = await resolveLocation(input.destination)

  const offerRequest = await duffel.offerRequests.create({
    slices: [
      {
        origin: origin,
        destination: destination,
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
