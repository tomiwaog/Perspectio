const OpenAI = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateAmbitionPrediction({ query, image_url }) {
  if (!image_url) {
    throw new Error('image_url is required for visual analysis.');
  }

  const prompt = `
  You are an AI image analysis assistant trained to evaluate human ambition and drive based solely on visual demeanor, posture, expression, and overall presence.

  Critically analyze the image and assess the individual’s *perceived level of ambition, intensity, and drive*. Use clear visual signals such as focus in the eyes, tension in posture, assertiveness in stance, grooming, attire, and body language. Be willing to identify signs of apathy, disinterest, or mediocrity if present.

  Do not give benefit of the doubt. Do not infer inner positivity if the visual cues suggest otherwise. A high score should only be given to individuals who display *exceptional* visual markers of drive, clarity of purpose, or commanding presence. The scale is elite-calibrated: average or ambiguous individuals should not score highly.

  Return a JSON object with the following fields:
  - description: A blunt, observation-driven summary of the individual's demeanor, focusing on ambition-related cues (e.g., intensity, alertness, lethargy, passivity, etc.).
  - score: A number from 0 to 100 representing perceived ambition and drive, where:
    - 90–100 = Elite-level intensity and purpose
    - 70–89 = High-performing or clearly driven
    - 40–69 = Average or inconsistent drive
    - 0–39 = Low ambition, disinterest, or passive demeanor
  - confidence: A number from 0.5 to 1.0, indicating how visually clear the cues are for this judgment

  User's query: "${query || 'Assess this individual’s ambition and drive based on visual demeanor.'}"

  Return ONLY the JSON object.
    `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          { type: 'image_url', image_url: { url: image_url } }
        ]
      }
    ],
    max_tokens: 500
  });

  const message = response.choices[0].message.content;
  console.log(message);
  try {
    // Remove the code block wrapper ``` from MarkDown format
    const cleaned = message
      .replace(/^```json\s*/, '')  // remove ```json at the beginning
      .replace(/```$/, '')         // remove trailing ```
      .trim();                     // clean any leftover spaces
  
    const result = JSON.parse(cleaned);
    return result;
  } catch (err) {
    console.error('Failed to parse JSON from AI response:', err.message);
    throw new Error('Invalid JSON structure returned by AI.');
  }  
}

module.exports = generateAmbitionPrediction;
