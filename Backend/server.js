const express = require('express');
const cors = require('cors');
const {GoogleGenerativeAI} = require('@google/generative-ai')
const bodyParser = require('body-parser')
const { dot, norm } = require('mathjs');
const { EMAILS_DB, KB_ARTICLES } = require('./dataset.js'); 
require('dotenv').config();
const axios = require('axios');


const app = express();
const PORT = process.env.PORT || 3001;

let USE_SIMULATION_MODE = false;
let activeModel = null;
let embeddingModel = null;

// CONFIGURATION & AUTO-DETECT
const apiKey = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

//  INITIALIZATION 
async function initializeAI() {
    console.log("🔍 Initializing Backend...");
    
    if (!apiKey) {
        console.log("No API Key found. Using SIMULATION MODE.");
        USE_SIMULATION_MODE = true;
        return;
    }

    try {
        // Try to ping the API with the most stable model
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        await model.generateContent("Test connection"); 

        activeModel = model;
        embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });
        console.log("Google API Connected! Using Gemini 1.5 Flash.");
        
        // Index KB if we have the API
        await indexKnowledgeBaseAPI();
    } catch (error) {
        console.log("API Connection Failed (404/Auth Error).");
        console.log(" ACTIVATING FAILSAFE: SIMULATION MODE.");
        console.log("    (The app will run perfectly using local logic)");
        USE_SIMULATION_MODE = true;
    }
}

app.use(cors());
app.use(bodyParser.json());

let KB_WITH_EMBEDDINGS = [];
function cosineSimilarity(vecA, vecB) { 
    return dot(vecA, vecB) / (norm(vecA) * norm(vecB)); 
}

async function indexKnowledgeBaseAPI() {
    if (USE_SIMULATION_MODE) return;
    try {
        const promises = KB_ARTICLES.map(async (article) => {
            const result = await embeddingModel.embedContent(article.content);
            return { ...article, embedding: result.embedding.values };
        });
        KB_WITH_EMBEDDINGS = await Promise.all(promises);
        console.log(` Indexed ${KB_WITH_EMBEDDINGS.length} KB articles (Vectors).`);
    } catch (e) { 
        console.log("Indexing failed, using fallback.");
    }
}

//  SIMULATION ALGORITHMS 

// Simulated Tagging Strict Customer Isolation
function simulatePredictTag(history, newEmail) {
    const newWords = newEmail.toLowerCase().split(/\s+/);
    let bestTag = "general_issue";
    let maxScore = 0;

    // Scan ONLY this customer's history
    history.forEach(h => {
        const hWords = h.body.toLowerCase();
        let score = 0;
        newWords.forEach(w => {
            if (w.length > 3 && hWords.includes(w)) score++;
        });
        if (score > maxScore) {
            maxScore = score;
            bestTag = h.tag;
        }
    });

    return {
        tag: bestTag,
        confidence: maxScore > 0 ? Math.min(0.6 + (maxScore * 0.1), 0.95) : 0.45,
        reason: maxScore > 0 
            ? `Matches historical ticket patterns for '${bestTag}'` 
            : "No direct historical match found (Low Confidence)."
    };
}

// Simulated Sentiment Keyword Analysis
function simulateAnalyzeSentiment(text) {
    const t = text.toLowerCase();
    const negatives = ['fail', 'error', 'unable', 'stuck', 'denied', 'lag', 'broken', 'incorrect', 'crash', 'not working'];
    const positives = ['thanks', 'great', 'working', 'resolved', 'helpful', 'good'];
    
    let score = 0; 
    negatives.forEach(w => { if(t.includes(w)) score--; });
    positives.forEach(w => { if(t.includes(w)) score++; });

    if (score < 0) return { sentiment: "negative", score: 0.85, reasoning: `Detected negative terms (e.g., '${negatives.find(w=>t.includes(w)) || 'error'}').` };
    if (score > 0) return { sentiment: "positive", score: 0.9, reasoning: "Detected positive phrasing." };
    return { sentiment: "neutral", score: 0.6, reasoning: "Factual statement with neutral tone." };
}

//  Simulated RAG Keyword Overlap
function simulateRagQuery(query) {
    const qWords = new Set(query.toLowerCase().split(/\s+/).filter(w => w.length > 3));
    
    const scoredDocs = KB_ARTICLES.map(doc => {
        const contentWords = new Set(doc.content.toLowerCase().split(/\s+/));
        const titleWords = new Set(doc.title.toLowerCase().split(/\s+/));
        
        let hits = 0;
        qWords.forEach(w => {
            if (contentWords.has(w)) hits += 1;
            if (titleWords.has(w)) hits += 3; // Boost title matches
        });
        return { ...doc, score: hits };
    }).sort((a, b) => b.score - a.score).slice(0, 2);

    const topDoc = scoredDocs[0];
    const answer = (topDoc && topDoc.score > 0)
        ? `Based on our '${topDoc.title}' guide: ${topDoc.content}` 
        : "I couldn't find specific information in the knowledge base.";

    return {
        answer: answer,
        retrieved_docs: scoredDocs.map(d => ({ title: d.title, score: (d.score * 0.2).toFixed(2) }))
    };
}


// api routes


initializeAI().catch(err => console.error("Initialization failed:", err));

// Health Check Route
app.get('/api/health', (req, res) => res.json({ 
    status: 'ok', 
    mode: USE_SIMULATION_MODE ? 'Simulation (Local)' : 'Google Gemini API' 
}));

//Tagging Route
app.post('/api/predict-tag', async (req, res) => {
    const { customer_id, email_body } = req.body;
    const history = EMAILS_DB.filter(e => e.customer_id === customer_id);
    
    if (history.length === 0) return res.json({ tag: "unknown", confidence: 0, reason: "New customer" });

    if (USE_SIMULATION_MODE) {
        return res.json(simulatePredictTag(history, email_body));
    }

    try {
        const prompt = `You are an email classifier for Customer ${customer_id}.
        Ref: ${history.map(h => `"${h.body}"->${h.tag}`).join('; ')}
        Classify new email: "${email_body}"
        Return ONLY JSON: { "tag": "string", "confidence": 0.0, "reason": "string" }`;

        const result = await activeModel.generateContent(prompt);
        const rawText = result.response.text().replace(/```json|```/g, '').trim();
        if (!rawText) throw new Error("Invalid response format");
        res.json(JSON.parse(rawText));
    } catch (err) {
        console.error("Error in /api/predict-tag:", err);
        res.json(simulatePredictTag(history, email_body));
    }
});

// Sentiment Analysis Route
app.post('/api/analyze-sentiment', async (req, res) => {
    const { email_body } = req.body;
    
    if (USE_SIMULATION_MODE) return res.json(simulateAnalyzeSentiment(email_body));

    try {
        const prompt = `Analyze sentiment: "${email_body}"
        Return ONLY JSON: { "sentiment": "positive/negative/neutral", "score": 0.0, "reasoning": "string" }`;
        const result = await activeModel.generateContent(prompt);
        const rawText = result.response.text().replace(/```json|```/g, '').trim();
        if (!rawText) throw new Error("Invalid response format");
        res.json(JSON.parse(rawText));
    } catch (err) {
        console.error("Error in /api/analyze-sentiment:", err);
        res.json(simulateAnalyzeSentiment(email_body));
    }
});

// RAG KB Query Route
app.post('/api/kb-query', async (req, res) => {
    const { query } = req.body;

    if (USE_SIMULATION_MODE) return res.json(simulateRagQuery(query));

    try {
        if (KB_WITH_EMBEDDINGS.length === 0) throw new Error("Index not ready");
        const qEmb = await embeddingModel.embedContent(query);
        const hits = KB_WITH_EMBEDDINGS
            .map(doc => ({ ...doc, score: cosineSimilarity(qEmb.embedding.values, doc.embedding) }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 2);

        const context = hits.map(h => `[${h.title}]: ${h.content}`).join('\n\n');
        const prompt = `Context:\n${context}\n\nQuestion: "${query}"\nAnswer based ONLY on context.`;
        const result = await activeModel.generateContent(prompt);
        res.json({
            answer: result.response.text(),
            retrieved_docs: hits.map(h => ({ title: h.title, score: h.score.toFixed(2) }))
        });
    } catch (err) {
        console.error("Error in /api/kb-query:", err);
        res.json(simulateRagQuery(query));
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
