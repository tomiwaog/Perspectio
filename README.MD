# **Perspectio Project**

**Perspectio** stimulates human gut-level impressions of perceived traits about a subject being tested. The system analyzes factors like visual biases, cultural norms, nonverbal communication, facial expression, and body language psychology.

**Note:** Perspectio measures **perceived** traits, not actual traits.

---

## **Practical Applications / Use Cases**

* **Bias Detection and Auditing Tool**
  Stimulate and detect biases based on social factors.

* **Employability Analysis (Perceived)**
  Analyze profile photos and social media posts for perceived professional traits.

* **Retail High-Profile Analysis**
  Identify potential high-revenue clients, especially when powered with supporting tools.

* **Personal Brand Management**
  Improve photo likeability and increase photo reach/popularity.

---

## **Dependencies**

* **Server:** Node.js

---

## **How to Run**

### 1. **Set up OpenAI API Key**

Fetch your OpenAI key from [OpenAI](https://openai.com).
Set your API key in the environment:

```bash
OPENAI_API_KEY="sk-proj-ddhdhdjdjd"
```

### 2. **Install Node.js and Dependencies**

Ensure you have Node.js installed, then run the following command to install dependencies:

```bash
npm install
```

### 3. **Start the Node.js Server**

Launch the server by running:

```bash
node index.js
```

### 4. **Program Entry Point**

The main API endpoint for predictions is:

```bash
http://localhost:5000/v1/predictions
```

---

## **API Usage**

### **Test Endpoint Example:**

#### **Request:**

```json
{
    "image_url": "https://test.png",
    "perception_type": "ambition"
}
```

#### **Response:**

```json
{
    "query": "Use facial expression and demeanor to predict the ambitions and professional outlook of the subject in the image",
    "image_url": "https://test.png",
    "score": 92,
    "confidence": 0.8,
    "label": "high",
    "extras": "The individual in the image appears confident and professional. His smile is genuine and eyes are focused, which often indicate positivity and determination. The formal attire suggests a business or formal context, supporting an impression of professionalism and possibly high aspirations."
}
```

---

### **Test Image Without Query:**

#### **Request (without query):**

```json
{
    "image_url": "https://test.png"
}
```

---

## **Client-Side Integration**

A client-side application can send a request to the endpoint at `http://localhost:5000/v1/predictions`. The business logic for handling the response should be implemented based on the results returned by Perspectio.

**Example:**
The file `./client/consumerTest.js` provides a sample client service for consuming the API response and implementing further logic.

---

## **Supported HTTP Verbs:**

* **POST**

### **Versioning with Semantic Versioning (SemVer)**

Perspectio follows **semantic versioning (SemVer)** for consistent and predictable version updates. This approach helps users understand the nature of changes in each version release.

---
## **Perspectio v2.0 - New Features**
---

### Cache for Faster Image Analysis

Version 2.0.0 introduces an **image analysis cache** to significantly improve response times and reduce processing costs. This new feature stores the results of previously analyzed images, so that when the same image is requested again, it can be served from the cache instead of re-running the analysis. This provides:

* **Faster Analysis:** Cached results are returned almost instantly for previously analyzed images.
* **Cost Efficiency:** By reducing the need for repeated analysis, we save on processing costs, making the service more affordable for users.

This cache system ensures that frequent requests for the same image are handled efficiently, providing quicker results without the need for redundant computations.

### Option to specify Analysis Type
Version 2.0 requires user callers to specify the type of perspective models needed.

#### Perspective Types / Models
Ambition Profiler
Likeability Factor

## References
- **Fiske’s Stereotype Content Model**  
  [Stereotype Content Model - Wikipedia](https://en.wikipedia.org/wiki/Stereotype_content_model)

- **Goffman’s Dramaturgical Model (Impression Management)**  
  Erving Goffman, *The Presentation of Self in Everyday Life* (1956)

- **Halo Effect & Fundamental Attribution Error**  
  Thorndike, E. L. (1920). *A Constant Error in Psychological Ratings*  
  Ross, L. (1977). *The intuitive psychologist and his shortcomings*

- **Facial Trait Inference**  
  Oosterhof, N. N., & Todorov, A. (2008). *The functional basis of face evaluation*. Proceedings of the National Academy of Sciences.

- **First Impression Theory**  
  Willis, J., & Todorov, A. (2006). *First impressions: Making up your mind after a 100-ms exposure to a face*. Psychological Science.
