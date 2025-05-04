const OpenAI = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateOpenPerception({ prompt, image_url }) {
  if (!image_url) {
    throw new Error('image_url is required for visual analysis.');
  }

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

module.exports = generateOpenPerception;
