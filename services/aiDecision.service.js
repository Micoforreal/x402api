const decisionAgent = require("../agents/decision.agent")

module.exports = async function chooseFlight(offers, input) {
  return decisionAgent.run({ offers, input })
}
