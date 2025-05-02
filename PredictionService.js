const generateAmbitionPrediction = require('./OpenAIPredict');

// Mock function to simulate an AI model
// function generatePrediction({ query, image_url }) {
//     const score = Math.floor(Math.random() * 101); // Random int between 0–100
//     const confidence = parseFloat((Math.random() * 0.5 + 0.5).toFixed(2)); // 0.5–1.0
//     const label = score > 70 ? 'high' : score > 40 ? 'medium' : 'low';

//     return { score, confidence, label };
// }

async function generateOpenAIAmbitionPrediction({ query, image_url }) {
    const result = await generateAmbitionPrediction({
        query: query,
        image_url: image_url
      });
      console.log(result);
      return result;
}


  
class PredictionService {
    async predictScore({ query, image_url }) {
        const predictionResult = await generateOpenAIAmbitionPrediction({ query, image_url }); // Replace with Actual AI Model/ API

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
