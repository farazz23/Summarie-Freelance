'use server'

import { getDBConnection } from "@/lib/dbConnection";
import generateSummaryFromGeminiAI from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { formatFileNameAsTitle } from "@/utils/formatFileNameAsTitle";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
interface PDFSummaryType {
  userId?: string,
  fileUrl: string,
  summary: string,
  title: string,
  fileName: string
}



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
          console.log("Summary from OpenAI Text:", summary);
        } catch (geminiError) {
          console.log("Gemini API failed after OpenAI quota exceeded: ", geminiError)
          throw new Error("Unable to Generate PDF at this time")
        }
      }
    }


    //TODO: if something wrong happens.... 
    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary",
        data: null,
      };
    }

    const formattedFileName = formatFileNameAsTitle(fileName)

    //TODO: finally returning the summary to the frontend response...
    return {
      success: true,
      message: "Summary generated successfully",
      data: {
        summary,
        title: formattedFileName
      }, // ✅ returning the actual summary, not raw text
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

async function savePDFSummary({ userId, fileUrl, summary, title, fileName }: {
  userId: string,
  fileUrl: string,
  summary: string,
  title: string,
  fileName: string

}) {
  try {
    const sql = await getDBConnection();
    await sql`INSERT INTO pdf_summaries (
                 user_id,
                    original_file_url,
                       summary_text,
                          title,
                              file_name
              )  VALUES (
                     ${userId},
                       ${fileUrl},
                        ${summary},
                          ${title},
                           ${fileName}
);`;
    console.log("I have inserted the pdf... ")
  } catch (err: any) {
    console.error("Error saving PDF summary", err)
    throw new Error
  }
}

export async function storePDFSumaryAction({
  fileUrl, summary, title, fileName
}: PDFSummaryType) {
  //user is logged in and has a userid or not
  // save pdf summary into the database
  let saveSummary: any;
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not found"
      }
    }

    saveSummary = await savePDFSummary({
      userId, fileUrl, summary, title, fileName
    });

    if (!savePDFSummary) {
      return {
        success: false,
        message: "Failed to save PDF Summary, Please try again..."
      }
    }


  } catch (err: any) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Error uploading saving pDF summary"
    }
  }


  // Revalidate cache
  revalidatePath(`/summaries/${saveSummary.data.id}`)

  return {
    success: true,
    message: 'PDF sumary saved successfully',
    data: {
      id: saveSummary.id
    }
  }

}


