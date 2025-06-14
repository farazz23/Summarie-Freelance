import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINIAI_API_KEY || "",
});

const generateSummaryFromGeminiAI = async (pdfText: string) => {
  try {
    const prompt = `${SUMMARY_SYSTEM_PROMPT}\n\nTransform this document into an engaging, easy-to-read summary with relevant emojis and markdown formatting:\n\n${pdfText}`;

    const result = await genAI.models.generateContent({
      model: "gemini-1.5-flash", // or gemini-pro / gemini-1.5-pro if needed
      config: {
        temperature: 0.7,
        maxOutputTokens: 1500
      },
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const text = result?.text?.trim();
    if (!text) {
      throw new Error("Empty response from gemini AI")
    }

    return text;
  } catch (error: any) {
    console.error("❌ Gemini summary error:", error);
    // return "❌ An unexpected error occurred while generating the summary.";
    throw error;
  }
};

export default generateSummaryFromGeminiAI;
