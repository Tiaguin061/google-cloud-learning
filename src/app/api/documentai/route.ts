import { NextResponse } from 'next/server';
import { getPagesWithParagraphs, processDocument } from './functions';

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
      processName: `2213411578b89edb`,
      projectId: `670086991862`,
      locations: `us`,
    });

    const pages = getPagesWithParagraphs(document);

    return NextResponse.json({
      error: null,
      result: pages,
    });
  } catch (error: any) {
    console.log(error.response.data)
    return NextResponse.json({
      error: {
        type: 'File',
        message: error.details
      },
      result: null,
    });

  }
}