// controllers/openaiController.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// ensure API key present
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error(
    "ERROR: GEMINI_API_KEY missing in .env. Please add your Google Generative AI API key."
  );
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Preferred model (override via env)
const PREFERRED_MODEL = "gemini-2.5-flash-lite";

let model = null;
let initPromise = null;

// Robust extractor for the SDK result shapes
const extractTextFromResult = (result) => {
  if (!result) return "";
  try {
    const resp = result.response ?? result;
    if (!resp) return JSON.stringify(result);

    if (typeof resp.text === "function") return resp.text();
    if (typeof resp.text === "string") return resp.text;

    if (Array.isArray(resp.items)) {
      return resp.items
        .map((it) => {
          if (!it) return "";
          if (
            Array.isArray(it.content) &&
            it.content[0] &&
            typeof it.content[0].text === "string"
          )
            return it.content[0].text;
          if (typeof it.text === "string") return it.text;
          return "";
        })
        .join("\n")
        .trim();
    }

    if (Array.isArray(resp.output)) {
      return resp.output
        .map((o) => (typeof o === "string" ? o : JSON.stringify(o)))
        .join("\n")
        .trim();
    }

    return typeof resp === "string" ? resp : JSON.stringify(resp);
  } catch (e) {
    return JSON.stringify(result);
  }
};

// Initialize model with robust fallbacks
async function initializeModel() {
  try {
    // 1) Try to list models if the SDK exposes listModels in any shape
    const available = [];

    try {
      if (typeof genAI.listModels === "function") {
        const maybe = genAI.listModels();

        // If it's an async iterable (has Symbol.asyncIterator), iterate
        if (maybe && typeof maybe[Symbol.asyncIterator] === "function") {
          for await (const m of maybe) {
            available.push(m?.name ?? m);
          }
        } else {
          // maybe is a Promise that resolves to an array or single value
          const resolved = await maybe;
          if (Array.isArray(resolved)) {
            resolved.forEach((m) => available.push(m?.name ?? m));
          } else if (resolved) {
            available.push(resolved?.name ?? resolved);
          }
        }
      } else if (typeof genAI.getModels === "function") {
        // Some SDKs might have getModels returning a promise/array
        const resolved = await genAI.getModels();
        if (Array.isArray(resolved))
          resolved.forEach((m) => available.push(m?.name ?? m));
      }
    } catch (listErr) {
      // listing failed — not fatal; we'll fallback to direct model creation below
      console.warn(
        "Model listing failed (non-fatal):",
        listErr?.message ?? listErr
      );
    }

    if (available.length > 0) {
      console.log("Available models discovered:", available);
      // if preferred present, use it; else choose first
      const chosenName = available.includes(PREFERRED_MODEL)
        ? PREFERRED_MODEL
        : available[0];
      model = genAI.getGenerativeModel({ model: chosenName });
      console.log("Using model:", chosenName);
      return chosenName;
    }

    // 2) Fallback: create the model with PREFERRED_MODEL and perform a tiny smoke test
    console.log(
      "No model list available. Attempting to use preferred model:",
      PREFERRED_MODEL
    );
    model = genAI.getGenerativeModel({ model: PREFERRED_MODEL });

    // perform a tiny test call to validate that the model is available for this key/SDK
    try {
      await model.generateContent({
        contents: [{ role: "user", parts: [{ text: "ping" }] }],
        generationConfig: { maxOutputTokens: 1, temperature: 0 },
      });
      console.log("Model validated:", PREFERRED_MODEL);
      return PREFERRED_MODEL;
    } catch (testErr) {
      // Provide detailed log + helpful instruction
      console.error("Model test call failed:", testErr?.message ?? testErr);
      throw new Error(
        `Model "${PREFERRED_MODEL}" failed validation for this key/SDK. ` +
          `If you recently changed SDK versions or model names, either update GEMINI_MODEL env or upgrade/downgrade the SDK. ` +
          `Original error: ${testErr?.message ?? String(testErr)}`
      );
    }
  } catch (err) {
    console.error(
      "Failed to initialize generative model:",
      err?.message ?? err
    );
    throw err;
  }
}

initPromise = initializeModel();

// generateResponse waits for init to complete
const generateResponse = async (prompt, maxTokens = 500, temperature = 0.5) => {
  await initPromise;
  if (!model) throw new Error("Generative model is not initialized.");

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature,
        maxOutputTokens: maxTokens,
      },
    });
    return extractTextFromResult(result);
  } catch (err) {
    console.error("Error generating response:");
    if (err && err.status) console.error(`Status: ${err.status}`);
    if (err && err.statusText) console.error(`StatusText: ${err.statusText}`);
    console.error(err?.message ?? err);
    throw new Error(
      "Failed to generate response. See server logs for API error details."
    );
  }
};

// -------- Controllers --------
export const summaryController = async (req, res) => {
  try {
    const { text } = req.body || {};
    if (!text || typeof text !== "string") {
      return res
        .status(400)
        .json({ message: "Please provide 'text' in request body." });
    }
    const enhancedPrompt = `You are an expert content analyst and professional summarizer with deep expertise in extracting key insights and distilling complex information into clear, concise summaries.

Your task: Create a comprehensive yet concise summary of the following text.

Guidelines:
- Identify and highlight the main ideas, key points, and essential arguments
- Preserve the original meaning and context without adding personal interpretations
- Use clear, professional language that's accessible to a broad audience
- Structure the summary logically with smooth transitions between ideas
- Maintain objectivity and factual accuracy
- Include any critical data points, statistics, or evidence mentioned
- Capture the author's tone and perspective where relevant
- Ensure the summary is self-contained and understandable without reading the original

Text to summarize:
${text}

Provide a well-structured summary that captures the essence and most important information from the text above.`;
    const summary = await generateResponse(enhancedPrompt, 600, 0.3);
    res.status(200).json({ summary });
  } catch (err) {
    console.error("summaryController error:", err?.message ?? err);
    res.status(500).json({ message: err?.message ?? "Internal server error" });
  }
};

export const paragraphController = async (req, res) => {
  try {
    const { text } = req.body || {};
    if (!text || typeof text !== "string") {
      return res
        .status(400)
        .json({ message: "Please provide 'text' in request body." });
    }
    const enhancedPrompt = `You are an accomplished writer and content creator with expertise in crafting engaging, informative, and well-structured paragraphs across diverse topics.

Your task: Write a detailed, comprehensive paragraph about the following topic.

Guidelines:
- Begin with a compelling topic sentence that clearly introduces the main idea
- Develop the topic with rich, specific details, examples, and relevant information
- Ensure logical flow and coherent progression of ideas
- Use varied sentence structures to maintain reader engagement
- Include relevant context, background information, or implications where appropriate
- Employ descriptive language and precise vocabulary to enhance clarity and impact
- Maintain an appropriate tone (informative, persuasive, or narrative as fits the topic)
- Conclude with a strong closing sentence that reinforces the main point or provides insight
- Aim for depth and substance while remaining focused and cohesive
- Ensure factual accuracy and provide meaningful content

Topic:
${text}

Write a comprehensive, well-crafted paragraph that thoroughly explores this topic.`;
    const paragraph = await generateResponse(enhancedPrompt, 700, 0.7);
    res.status(200).json({ paragraph });
  } catch (err) {
    console.error("paragraphController error:", err?.message ?? err);
    res.status(500).json({ message: err?.message ?? "Internal server error" });
  }
};

export const chatbotController = async (req, res) => {
  try {
    const { text } = req.body || {};
    if (!text || typeof text !== "string") {
      return res
        .status(400)
        .json({ message: "Please provide 'text' in request body." });
    }
    const enhancedPrompt = `You are an intelligent, helpful, and empathetic AI assistant with broad knowledge across multiple domains. You excel at understanding user needs and providing valuable, accurate, and contextually appropriate responses.

Your communication style:
- Warm, friendly, and approachable while maintaining professionalism
- Clear and concise, avoiding unnecessary jargon unless the topic requires it
- Empathetic and attentive to the user's emotional context and underlying needs
- Patient and willing to explain complex concepts in simple terms
- Honest about limitations - if you're unsure, acknowledge it
- Proactive in offering additional relevant information or follow-up suggestions

Response guidelines:
- Understand the intent behind the question, not just the literal words
- Provide accurate, well-informed answers based on reliable knowledge
- Structure responses logically with the most important information first
- Use examples, analogies, or clarifications when they add value
- Be conversational and engaging, as if talking to a friend
- Adapt your tone to match the seriousness or casualness of the query
- When appropriate, ask clarifying questions to provide better assistance

User's question or message:
${text}

Provide a helpful, thoughtful, and friendly response that addresses the user's needs comprehensively.`;
    const answer = await generateResponse(enhancedPrompt, 800, 0.8);
    res.status(200).json({ answer });
  } catch (err) {
    console.error("chatbotController error:", err?.message ?? err);
    res.status(500).json({ message: err?.message ?? "Internal server error" });
  }
};

export const jsconverterController = async (req, res) => {
  try {
    const { text } = req.body || {};
    if (!text || typeof text !== "string") {
      return res
        .status(400)
        .json({ message: "Please provide 'text' in request body." });
    }
    const enhancedPrompt = `You are a senior software engineer and JavaScript expert with deep knowledge of modern JavaScript (ES6+), best practices, design patterns, and clean code principles.

Your task: Convert the following natural language instructions into high-quality, production-ready JavaScript code.

Code quality standards:
- Write clean, readable, and maintainable code following industry best practices
- Use modern JavaScript syntax (ES6+): arrow functions, destructuring, template literals, async/await, etc.
- Implement proper error handling with try-catch blocks where appropriate
- Follow consistent naming conventions (camelCase for variables/functions, PascalCase for classes)
- Add clear, concise comments only where the code logic isn't self-explanatory
- Ensure the code is modular, reusable, and follows SOLID principles
- Consider edge cases and input validation
- Optimize for performance where relevant without sacrificing readability
- Use appropriate data structures and algorithms for efficiency
- Include proper function documentation (JSDoc style) for complex functions
- Avoid code smells: no magic numbers, no deeply nested logic, DRY principle
- Make the code type-safe aware (even though it's JavaScript, consider what would work well with TypeScript)

Instructions to convert:
${text}

Provide the JavaScript code implementation with:
1. Clean, well-structured code
2. Inline comments for complex logic (if needed)
3. Brief explanation of the approach (if the solution is non-trivial)
4. Any assumptions you made

Generate production-quality JavaScript code now.`;
    const code = await generateResponse(enhancedPrompt, 1000, 0.2);
    res.status(200).json({ code });
  } catch (err) {
    console.error("jsconverterController error:", err?.message ?? err);
    res.status(500).json({ message: err?.message ?? "Internal server error" });
  }
};

export const healthController = async (req, res) => {
  try {
    await initPromise;
    res.status(200).json({ ok: true, modelInitialized: !!model });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Model initialization failed",
      details: err?.message ?? String(err),
    });
  }
};

export const scifiImageController = async (req, res) => {
  try {
    const { text } = req.body || {};
    if (!text || typeof text !== "string") {
      return res
        .status(400)
        .json({ message: "Please provide 'text' in request body." });
    }

    // Enhance the prompt with professional sci-fi artistic direction
    const enhancedImagePrompt = `Cinematic sci-fi concept art, ${text}, photorealistic, 8K ultra detailed, dramatic volumetric lighting, vibrant colors, epic atmosphere, professional grade, sharp focus, futuristic technology, intricate details`;

    // Using Hugging Face's FREE Stable Diffusion API
    const HF_API_KEY =
      process.env.HUGGINGFACE_API_KEY ||
      "hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

    // Free Stable Diffusion model on Hugging Face (NEW ENDPOINT)
    const MODEL_URL =
      "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0";

    const response = await fetch(MODEL_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: enhancedImagePrompt,
        parameters: {
          negative_prompt:
            "blurry, low quality, distorted, ugly, bad anatomy, worst quality, low resolution, cartoonish, flat lighting",
          num_inference_steps: 50,
          guidance_scale: 7.5,
          width: 1024,
          height: 1024,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Hugging Face API error:", errorText);
      throw new Error(
        `Image generation failed: ${response.status} ${response.statusText}`
      );
    }

    // Get the image as a buffer
    const imageBuffer = await response.arrayBuffer();

    // Convert to base64
    const base64Image = `data:image/png;base64,${Buffer.from(
      imageBuffer
    ).toString("base64")}`;

    res.status(200).json({ image: base64Image });
  } catch (err) {
    console.error("scifiImageController error:", err?.message ?? err);
    res.status(500).json({
      message: err?.message ?? "Internal server error",
      hint: "Please get a free Hugging Face API key from https://huggingface.co/settings/tokens",
    });
  }
};
