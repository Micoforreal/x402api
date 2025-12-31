const { Duffel } = require("@duffel/api")


module.exports = new Duffel({
  token: process.env.DUFFEL_API_KEY
})
