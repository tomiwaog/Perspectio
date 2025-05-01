const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const AIPREDICTOR_URL = 'http://localhost:5000/v1/predictions'; // Internal call

// Decision logic
function decideAction(score) {
    if (score <45) return 'low';
    else if (score <65) return 'okay';
    else if (score <80) return 'medium';
    else if (score >=80) return 'high';
    return 'archive';
}

// Action handler
function handleAction(action, payload) {
    switch (action) {
        case 'low':
            console.log("Asset got a low score!!");
            break;
        case 'okay':
            console.log("Asset got an okay score!!");
            break;
        case 'medium':
            console.log("Asset got a medium score!!");
            break;
        case 'high':
            console.log("Asset got high score!!");
            break;
        default:
            console.log(`Unknown action`, action);
    }
}

// Consumer endpoint
app.post('/v1/consume', async (req, res) => {
    const { query, image_url } = req.body;

    if (!query && !image_url) {
        return res.status(400).json({ error: 'Provide query or image_url' });
    }

    try {
        const predictionRes = await axios.post(AIPREDICTOR_URL, { query, image_url });
        const { score, confidence, label } = predictionRes.data;

        const action = decideAction(score);
        handleAction(action, { query, image_url, score, confidence, label });

        return res.status(200).json({
            message: `Action "${action}" performed.`,
            data: { score, confidence, label }
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to process request.' });
    }
});

// Start server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Hosted Consumer running on port ${PORT}`);
});
