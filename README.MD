# About Perspectio
The Project stimulates human's gut level impression of perceived traits about subject being tested.
The output reflects subjective social impressions and may be influenced by visual biases, cultural norms, Nonverbal communication, facial expression and Body language Psychology.
Note: This measure perceived traits as opposed to actual traits.

## Practical Application / Use Cases
<ul>
    <li>Bias Detection and Auditing Tool - Stimulate biases based on social factors</li>
    <li>Employability Analysis (Perceived) - Profile Photo Analysis, Social Media Post Analysis</li>
    <li>Retail High Profile Analysis - Identify potential High Revenue clients, can be impactful when powered with supporting tools.</li>
</ul>

## How to Use
### Install NodeJS
Install NodeJs and package dependencies (npm install)
### Run the NodeJs Server
The index.js is the entry point for the Prediction Service.
```
node index.js
```

### Program Entry Point:

http://localhost:5000/v1/predictions
### Test Endpoint
```
{
    "query": "Use facial expression and demeanor to predict the ambitions and professional outlook of the subject in the image",
    "image_url": "https://test.png"
}
```

### Supported HTTP Verbs
POST

### Sample Input and Output

#### Supported Output
JSON



#### Sample Input
```
{
    "query": "Use facial expression and demeanor to predict the ambitions and professional outlook of the subject in the image",
    "image_url": "https://test.png"
}
```

#### Sample Output
```
{
    "query": "Use facial expression and demeanor to predict the ambitions and professional outlook of the subject in the image",
    "image_url": "https://test.png",
    "score": 92,
    "confidence": 0.8,
    "label": "high",
    "extras": "The individual in the image appears confident and professional. His smile is genuine and eyes are focused, which often indicate positivity and determination. The formal attire suggests a business or formal context, supporting an impression of professionalism and possibly high aspirations."
}
```

## Client Side
A consume client can ping the endpoint http://localhost:5000/v1/predictions and implement its business logic for handling the response from the Perspectio Service.

The file "./client/consumerTest.js" is a sample client service utilizing the response to make additional business logic.