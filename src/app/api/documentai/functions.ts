import { DocumentProcessorServiceClient } from '@google-cloud/documentai';
import { DocumentPages, DocumentTypeResponse, PageResult, ParagraphTextAnchor, ProcessDocumentProps, ProcessDocumentResponse } from './types';

export const documentAiClient = new DocumentProcessorServiceClient({
  apiEndpoint: 'documentai.googleapis.com',
  projectId: 'next-auth-404513',
});

// const accessToken = process.env.GOOGLE_ACCESS_TOKEN ?? 'Configure your access token';

export function extractSegmentsByText(text: string, textAnchor: ParagraphTextAnchor) {
  if (!textAnchor.textSegments || textAnchor.textSegments.length === 0) {
    return '';
  }

  const startIndex = Number(textAnchor.textSegments[0].startIndex) || 0;
  const endIndex = Number(textAnchor.textSegments[0].endIndex);

  return text.substring(startIndex, endIndex);
};

export async function processDocument({
  file,
  processName,
  projectId,
  locations,
}: ProcessDocumentProps) {
  const fileBuffer = await file.arrayBuffer();
  const encodedImage = Buffer.from(fileBuffer).toString('base64');

  const request = {
    name: `projects/${projectId}/locations/${locations}/processors/${processName}`,
    rawDocument: {
      content: encodedImage,
      mimeType: 'application/pdf',
    },
  };

  const [result] = await documentAiClient.processDocument(request);

  // const response = await axios.post(`https://us-documentai.googleapis.com/v1/projects/${projectId}/locations/${locations}/processors/${processName}:process`, {
  //   "rawDocument": {
  //     "mimeType": "application/pdf",
  //     "content": encodedImage
  //   }
  // }, {
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`
  //   }
  // });

  // const result = response.data;

  const { document } = result as ProcessDocumentResponse;

  return document;
}

export function getParagraphsByPage(text: string, page: DocumentPages) {
  const { paragraphs } = page;

  let paragraphsSeparated: string[] = [];

  for (const paragraph of paragraphs) {
    const paragraphText = extractSegmentsByText(text, paragraph.layout.textAnchor);

    paragraphsSeparated.push(paragraphText)
  }

  return paragraphsSeparated;
}

export function getPagesWithParagraphs(document: DocumentTypeResponse) {
  const pagesFromDocument = document?.pages;

  let pagesResults: Array<PageResult> = [];

  const { text } = document;

  for (const page of pagesFromDocument) {
    const pageParagraphs = getParagraphsByPage(text, page);

    pagesResults.push({
      pageParagraphs,
      pageNumber: page.pageNumber
    })
  }

  return pagesResults;
}