const generateOpenPerception = require('./OpenAIPredict');

// Mock function to simulate an AI model
// function generatePrediction({ query, image_url }) {
//     const score = Math.floor(Math.random() * 101); // Random int between 0–100
//     const confidence = parseFloat((Math.random() * 0.5 + 0.5).toFixed(2)); // 0.5–1.0
//     const label = score > 70 ? 'high' : score > 40 ? 'medium' : 'low';

//     return { score, confidence, label };
// }

async function generatePerceptionService({ query, image_url, perception_type }) {
    const perception_prompt = `
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

    if (perception_type == "ambition") {
        const result = await generateOpenPerception({
            prompt: perception_prompt,
            image_url: image_url
          });
          console.log(result);
          return result;
    } else {
        throw new Error('New Perception Type coming soon.');
    }
}


  
class PredictionService {
    async predictScore({ query, image_url, perception_type }) {
        const predictionResult = await generatePerceptionService({ query, image_url, perception_type }); // Replace with Actual AI Model/ API

        // Validate the response structure
        const score = predictionResult?.score ?? null;
        const confidence = predictionResult?.confidence ?? null;
        const label = score >= 90 ? 'elite' : score >= 70 ? 'high' : score >= 40 ? 'medium' : 'low';

        const extras = predictionResult?.description ?? 'unknown';
        if (score === null || confidence === null || extras === 'unknown') {
            throw new Error('Prediction result is incomplete or invalid.');
        }

        return {
            query: query || null,
            image_url: image_url || null,
            score,
            confidence,
            label,
            extras
        };
    }
}

module.exports = PredictionService;
