const schema = require("../schemas/flightRequest.schema")

module.exports = (req, res, next) => {
  for (const field of schema.required) {
    if (!req.body[field]) {
      return res.status(400).json({ error: `${field} is required` })
    }
  }
  next()
}
