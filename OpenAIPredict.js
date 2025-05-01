const OpenAI = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateAmbitionPrediction({ query, image_url }) {
  if (!image_url) {
    throw new Error('image_url is required for visual analysis.');
  }

  const prompt = `
    You are an AI image analysis assistant trained in interpreting human expressions and demeanor.

    Analyze the image and evaluate the ambitions and outlook of the individuals shown, based on their facial expressions, body language, posture, and visual context.

    Return a structured JSON response with the following keys:
    - description (summary of the team’s appearance and demeanor)
    - score (0–100 scale, representing perceived ambition)
    - confidence (0.5–1.0 scale, how sure you are about this judgment)

    User's query: "${query || 'Use facial expression and demeanor to predict the ambitions of this person'}"

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
