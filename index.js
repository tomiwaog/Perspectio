// app.js

const express = require('express');
const PredictionService = require('./PredictionService'); // Import the prediction service
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// POST /v1/predictions endpoint
app.post('/v1/predictions', async (req, res) => {
    const { query, image_url } = req.body;

    // Validate input
    if (!query && !image_url) {
        return res.status(400).json({ error: 'At least one of "query" or "image_url" must be provided.' });
    }

    try {
        // Get prediction result from the service layer
        const predictionService = new PredictionService();
        const result = await predictionService.predictScore({ query, image_url });
        return res.status(200).json(result);
    } catch (error) {
        // Return error response if prediction fails
        return res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`AIPredictor API v1 listening on port ${PORT}`);
});
