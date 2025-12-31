const duffel = require("../config/duffel")

module.exports = async function bookFlight(orderDetails, input) {
  const order = await duffel.orders.create({ 
    type: "hold",
    selected_offers: [orderDetails.offerId],
    passengers: [
      {
        phone_number: "+442080160508",
        email: input.user_email,
        born_on: "1980-07-24",
        title: "mr",
        gender: "m",
        family_name: "Stark",
        given_name: "Tony",
        id: orderDetails.passengerIds[0]
      }
    ]
  })



  console.log(order);
  return order
}
