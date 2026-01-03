const { log } = require("console");
const duffel = require("../config/duffel");

async function resolveLocation(query) {
  const res = await duffel.suggestions.list({
    query,
    
    limit: 5,
  });

  if (!res.data || res.data.length === 0) {
    throw new Error(`No location found for "${query}"`);
  }

  // Prefer airports over cities
  const airport =
    res.data.find(p => p.type === "airport") ||
    res.data.find(p => p.type === "city");


  return airport.iata_city_code;

}

module.exports = resolveLocation;
