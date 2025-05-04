// app.js

const express = require('express');
const PredictionService = require('./PredictionService'); // Import the prediction service
const { Level } = require('level');
const app = express();
const PORT = process.env.PORT || 5000;
const predictionDB = new Level('data/predictionDB', { valueEncoding: 'json' });

app.use(express.json());

// POST /v1/predictions endpoint
app.post('/v1/predictions', async (req, res) => {
    const { query, image_url, perception_type } = req.body;

    // Validate input
    if (!query && !image_url) {
        return res.status(400).json({ error: 'At least one of "query" or "image_url" must be provided.' });
    }
    if (!perception_type) {
        return res.status(400).json({ error: 'Bad perception Type' });
    }
    const key = `${image_url || ''}|${perception_type}`;
    try {
        let result;
        result = await predictionDB.get(key);
        if (result === undefined) {
            // Get prediction result from the service layer
            console.log('Not found in DB. Fetching from prediction service...');
            const predictionService = new PredictionService();
            result = await predictionService.predictScore({ query, image_url, perception_type });
            await predictionDB.put(key, JSON.stringify(result));
        } else {
            console.log('Found in DB');
            result = await predictionDB.get(key);
            result = JSON.parse(result);  // Only parse if the result is found
        }
        return res.status(200).json(result);
    } catch (error) {
        // Return error response if prediction fails
        return res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`AIPredictor API v2 listening on port ${PORT}`);
});
