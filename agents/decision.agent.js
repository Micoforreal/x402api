const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

function safeParseJSON(text) {
  try {
    return JSON.parse(text);
  } catch {
    throw new Error("LLM did not return valid JSON");
  }
}

exports.run = async ({ offers, input }) => {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0,

    messages: [
      {
        role: "system",
        content: `
You are a flight recommendation engine.

RULES:
- You MUST return ONLY valid JSON
- NO explanations
- NO markdown
- NO text outside JSON

Your task:
- Choose the best flight offer based on user preferences

Output schema:
{
  "selected_offer_id": "string",
  "reason": "short explanation",
  "price": "string",
  "stops": number,
  "duration": "ISO 8601 duration"
}
        `.trim()
      },
      {
        role: "user",
        content: JSON.stringify({
          preferences: input.preferences_text || "",
          offers: offers.map(o => ({
            id: o.id,
            price: o.total_amount,
            stops: o.slices[0].segments.length - 1,
            duration: o.slices[0].duration
          }))
        })
      }
    ]
  });

  const response = completion.choices[0].message.content;

  console.log(response);
  return safeParseJSON(response);

};
