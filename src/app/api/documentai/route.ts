import { DocumentProcessorServiceClient } from '@google-cloud/documentai';
import { NextResponse } from 'next/server';

export type ParagraphTextAnchor = {
  textSegments: Array<{
    startIndex: string,
    endIndex: string;
  }>;
  content: string;
}

export type Paragraph = {
  layout: {
    textAnchor: ParagraphTextAnchor;
  }
}

export type DocumentPages = {
  detectedLanguages: Array<{}>;
  blocks: Array<{}>;
  paragraphs: Array<Paragraph>;
  lines: Array<{}>;
  tokens: Array<{}>;
  pageNumber: number;
}

export type DocumentTypeResponse = {
  text: string;
  pages: Array<DocumentPages>;
}

export type ProcessDocumentProps = {
  file: File
  processName: string;
}

export type PageResult = {
  pageParagraphs: string[];
  pageNumber: number;
}

export interface ProcessDocumentResponse {
  document: DocumentTypeResponse;
  humanReviewStatus: any;
}

export const documentAiClient = new DocumentProcessorServiceClient({
  apiEndpoint: 'documentai.googleapis.com',
  projectId: 'next-auth-404513'
});

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
  processName
}: ProcessDocumentProps) {
  const fileBuffer = await file.arrayBuffer();
  const encodedImage = Buffer.from(fileBuffer).toString('base64');

  const request = {
    name: processName,
    rawDocument: {
      content: encodedImage,
      mimeType: 'application/pdf',
    },
  };

  const [result] = await documentAiClient.processDocument(request);

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

export async function POST(request: Request) {
  const result = await request.formData();

  const file = result?.get('file') as File | null;

  if (!file) {
    return NextResponse.json({
      error: {
        type: 'FileIsRequired',
        message: 'file is required'
      },
      result: null,
    });
  }

  if (file.type !== 'application/pdf') {
    return NextResponse.json({
      error: {
        type: 'FileUnsupported',
        message: 'Arquivos suportados são apenas PDF'
      },
      result: null,
    });
  }

  try {
    const document = await processDocument({
      file,
      processName: `projects/670086991862/locations/us/processors/2213411578b89edb`,
    });

    const pages = getPagesWithParagraphs(document);

    return NextResponse.json({
      error: null,
      result: pages,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: {
        type: 'File',
        message: error.details
      },
      result: null,
    });

  }
}