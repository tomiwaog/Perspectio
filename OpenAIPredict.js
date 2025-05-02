const OpenAI = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateAmbitionPrediction({ query, image_url }) {
  if (!image_url) {
    throw new Error('image_url is required for visual analysis.');
  }

  const prompt = `
  You are an AI image analysis assistant trained to evaluate human demeanor from images, including visual indicators of motivation, ambition, or disengagement.

  Analyze the image objectively and critically. Focus on facial expressions, body language, eye contact, posture, and clothing to assess the individual’s perceived level of ambition, motivation, or lack thereof. Avoid romanticizing or sugarcoating—if signs point to disengagement, apathy, or low drive, state that clearly. Do not assume positivity unless justified by clear visual cues.

  Return a JSON object with the following fields:
  - description: A concise summary of visual cues (facial expression, posture, grooming, attire) and what they suggest about the person’s attitude or drive.
  - score: A number between 0–100 representing **perceived ambition or drive**, where 0 means extremely unambitious or disengaged, 100 means highly driven and focused.
  - confidence: A number between 0.5–1.0 representing how confident you are in this assessment based on image clarity and cues.

  User's query: "${query || 'Assess this person’s level of ambition or motivation from their expression and demeanor.'}"

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
