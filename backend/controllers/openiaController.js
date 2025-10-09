// controllers/openaiController.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// ensure API key present
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error(
    "ERROR: GEMINI_API_KEY missing in .env. Please add your Google Generative AI API key."
  );
  // if running as dev, exit to avoid confusing errors later:
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Helper: try to list models (prints some models your key can access)
// This helps debug 404 "model not found" issues.
async function listModelsOnce() {
  try {
    const iter = genAI.listModels();
    console.log("Listing available models (first 50):");
    let i = 0;
    // genAI.listModels may return an async iterable
    for await (const m of iter) {
      console.log(`${i++}: ${m.name}`);
      if (i >= 50) break;
    }
  } catch (err) {
    console.warn(
      "Could not list models (this is non-fatal):",
      err?.message ?? err
    );
  }
}
listModelsOnce().catch(() => {
  /* ignore */
});

// Choose a model (allow override via .env)
const MODEL_NAME = "gemini-2.5-flash";
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

// Robust extractor for the SDK response
const extractTextFromResult = (result) => {
  if (!result) return "";

  // SDK shapes vary between versions; try several patterns:
  // 1) result.response.text() -> function
  try {
    const resp = result.response;
    if (!resp) return JSON.stringify(result);

    // function
    if (typeof resp.text === "function") {
      return resp.text();
    }
    // property string
    if (typeof resp.text === "string") {
      return resp.text;
    }
    // sometimes response.items or response.output exist
    if (Array.isArray(resp.items)) {
      return resp.items
        .map((it) => {
          // adapt for common shapes
          if (it?.content?.[0]?.text) return it.content[0].text;
          if (it?.text) return it.text;
          return "";
        })
        .join("\n")
        .trim();
    }
    // fallback to JSON
    return JSON.stringify(result);
  } catch (e) {
    return JSON.stringify(result);
  }
};

const generateResponse = async (prompt, maxTokens = 500, temperature = 0.5) => {
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
    // Helpful error logging (status and body usually included in SDK error)
    console.error("Error generating response:");
    console.error(err && err.status ? `Status: ${err.status}` : "");
    console.error(err && err.statusText ? `StatusText: ${err.statusText}` : "");
    console.error(err?.message ?? err);
    // rethrow a cleaner error message to the controller
    throw new Error(
      "Failed to generate response. Check server logs for API error details."
    );
  }
};

// -------- Controllers --------
export const summaryController = async (req, res) => {
  try {
    const { text } = req.body;
    const summary = await generateResponse(`Summarize this: ${text}`);
    res.status(200).json({ summary });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const paragraphController = async (req, res) => {
  try {
    const { text } = req.body;
    const paragraph = await generateResponse(
      `Write a detailed paragraph about: ${text}`
    );
    res.status(200).json({ paragraph });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const chatbotController = async (req, res) => {
  try {
    const { text } = req.body;
    const answer = await generateResponse(
      `Answer in a friendly tone: ${text}`,
      300,
      0.7
    );
    res.status(200).json({ answer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const jsconverterController = async (req, res) => {
  try {
    const { text } = req.body;
    const code = await generateResponse(
      `Convert these instructions into JavaScript code: ${text}`,
      400,
      0.25
    );
    res.status(200).json({ code });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
