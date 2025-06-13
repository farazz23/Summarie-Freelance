'use server'

import { fetchAndExtractPdfText } from "@/lib/langchain";

// import { fetchAndExtractPdfText } from "@/lib/langchain"

// export async function generatePDFSummary(uploadResponse: [
//   {
//     serverData: {
//       userID: string,
//       file: {
//         url: string,
//         name: string
//       }
//     }
//   }
// ]) {
//   if (!uploadResponse) {
//     return {
//       success: false,
//       message: "File upload failed",
//       data: null,
//     }
//   }

//   const {
//     serverData: {
//       userID,
//       file: { url: pdfUrl, name: fileName },
//     }
//   } = uploadResponse[0]

//   if (!pdfUrl) {
//     return {
//       success: false,
//       messag: "File upload failed",
//       data: null
//     }
//   }

//   try {
//     // const pdfText = await fetchAndExtractPdfText(pdfUrl);
//     // console.log(pdfText)

//     const pdfText = await fetchAndExtractPdfText(pdfUrl);
//     console.log("Extracted PDF Text:", pdfText);

//     // Optional: Generate summary with OpenAI / LangChain LLM later
//     return {
//       success: true,
//       data: pdfText,
//     };
//   } catch (error: any) {
//     return {
//       success: false,
//       message: "Failed to extract PDF text",
//       data: null,
//     };
//   }



// }




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

    // Optional: Generate summary with OpenAI / LangChain LLM later
    return {
      success: true,
      data: pdfText,
    };
  } catch (error: any) {
    return {
      success: false,
      message: "Failed to extract PDF text",
      data: null,
    };
  }
}
