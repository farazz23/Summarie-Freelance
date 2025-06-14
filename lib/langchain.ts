import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function fetchAndExtractPdfText(fileUrl: string) {
  const response = await fetch(fileUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch file: ${response.statusText}`);
  }

  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const loader = new PDFLoader(new Blob([arrayBuffer]));

  // 🔧 Await the .load() function to get parsed documents
  const data = await loader.load();

  // ✅ Extract and join page content
  return data.map((doc) => doc.pageContent).join('\n');
}
