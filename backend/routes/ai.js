import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const router = express.Router();

// Check if API key is loaded
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY not found in environment variables");
  console.log("📝 Get your API key from: https://makersuite.google.com/app/apikey");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Chat history for context-aware conversations
const chatSessions = new Map();

router.post("/ask-ai", async (req, res) => {
  try {
    const { prompt, sessionId, useContext = true } = req.body;
    
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: "Invalid prompt provided" });
    }

    console.log("📝 Received prompt:", prompt);
    
    // FIXED: Use the correct model name
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",  // Changed from "gemini-pro"
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        // maxOutputTokens: 1000,
        maxOutputTokens: 2000,
      }
    });

    let reply;

    if (useContext && sessionId) {
      // Use chat session for context-aware conversation
      if (!chatSessions.has(sessionId)) {
        chatSessions.set(sessionId, model.startChat({
          history: []
        }));
      }
      
      const chat = chatSessions.get(sessionId);
      const result = await chat.sendMessage(prompt);
      reply = result.response.text();
    } else {
      // Single message without context
      const result = await model.generateContent(prompt);
      reply = result.response.text();
    }

    console.log("🤖 Gemini Response:", reply);
    res.json({ reply });

  } catch (err) {
    console.error("❌ Error in /ask-ai:", err);
    
    if (err.message.includes('API_KEY_INVALID')) {
      res.status(401).json({ error: "Invalid Gemini API key" });
    } else if (err.message.includes('QUOTA_EXCEEDED')) {
      res.status(429).json({ 
        error: "Quota exceeded. Please try again later.",
        retryAfter: 60
      });
    } else if (err.message.includes('SAFETY')) {
      res.status(400).json({ 
        error: "Content blocked by safety filters. Please rephrase your message." 
      });
    } else if (err.message.includes('BLOCKED')) {
      res.status(400).json({ 
        error: "Content was blocked. Please try a different message." 
      });
    } else if (err.message.includes('not found')) {
      res.status(400).json({ 
        error: "Model not available. Please check available models at /api/models" 
      });
    } else {
      res.status(500).json({ error: err.message || "Unknown error occurred" });
    }
  }
});

router.get("/models", async (req, res) => {
  try {
    const models = await genAI.listModels();
    
    const availableModels = models.map(model => ({
      name: model.name,
      displayName: model.displayName,
      description: model.description,
      supportedGenerationMethods: model.supportedGenerationMethods
    }));

    console.log("📋 Available Gemini models:", availableModels);
    res.json({ models: availableModels });
    
  } catch (err) {
    console.error("❌ Error listing models:", err);
    res.status(500).json({ error: err.message });
  }
});

// New endpoint to clear chat session
router.delete("/chat-session/:sessionId", (req, res) => {
  const { sessionId } = req.params;
  if (chatSessions.has(sessionId)) {
    chatSessions.delete(sessionId);
    res.json({ message: "Chat session cleared" });
  } else {
    res.status(404).json({ error: "Session not found" });
  }}
);

export default router;

