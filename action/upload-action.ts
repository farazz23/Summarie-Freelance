'use server'

import generateSummaryFromGeminiAI from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";

export async function generatePDFSummary(uploadResponse: [
  {
    serverData: {
      userID: string,
      file: {
        url: string,
        name: string
      }
    }
  }
]) {
  if (!uploadResponse) {
    return { success: false, message: "File upload failed", data: null };
  }

  const {
    serverData: {
      userID,
      file: { url: pdfUrl, name: fileName },
    }
  } = uploadResponse[0];

  if (!pdfUrl) {
    return { success: false, message: "No PDF URL found", data: null };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log("Extracted PDF Text:", pdfText);

    // Get summary from OpenAI
    let summary;
    try {
      summary = await generateSummaryFromOpenAI(pdfText);
      console.log("Summary from Gemini Text:", { summary });
    } catch (err: any) {
      console.error("Unable to generate summary:", err.message || err);
      console.log("The problem ocuurs here....")
      if (err instanceof Error && err.message == "RATE LIMIT EXCEEDED") {
        try {
          summary = await generateSummaryFromGeminiAI(pdfText);
          console.log("Summary from OpenAI Text:", { summary });
        } catch (geminiError) {
          console.log("Gemini API failed after OpenAI quota exceeded: ", geminiError)
          throw new Error("Unable to Generate PDF at this time")
        }
      }
    }

    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary",
        data: null,
      };
    }

    return {
      success: true,
      message: "Summary generated successfully",
      data: summary, // ✅ returning the actual summary, not raw text
    };
  } catch (error: any) {
    console.error("PDF extraction failed:", error.message || error);

    return {
      success: false,
      message: "Failed to extract PDF text",
      data: null,
    };
  }
}


