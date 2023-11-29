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
  projectId: string;
  locations: string;
}

export type PageResult = {
  pageParagraphs: string[];
  pageNumber: number;
}

export interface ProcessDocumentResponse {
  document: DocumentTypeResponse;
  humanReviewStatus: any;
}
