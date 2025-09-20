import fs from 'fs/promises';
import path from 'path';
// ✅ GOOD
import pdfParse from 'pdf-parse';


export async function extractTextFromPDF(file) {
  const filePath = path.resolve(file.path);
  const fileBuffer = await fs.readFile(filePath);
  const pdfData = await pdfParse(fileBuffer);
  await fs.unlink(filePath); // Clean up
  return pdfData.text;
}
