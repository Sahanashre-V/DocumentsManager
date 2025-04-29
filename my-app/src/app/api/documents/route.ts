import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

//POST
export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); 

    // console.log(body)

    const newDocument = await prisma.regulatory_documents.create({
      data: {
        regulation_name: body.regulation_name,
        jurisdiction: body.jurisdiction,
        effective_date: new Date(body.effective_date),
        last_updated: new Date(body.last_updated),
        description: body.description,
        document_type: body.document_type,
        original_url: body.original_url,
        html_url: body.html_url,
        s3_url: body.s3_url,
        user_id: body.user_id,
        community_status: body.community_status,
        file_hash: body.file_hash,
        processed_status: body.processed_status,
      },
    });

    return NextResponse.json(newDocument, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

// GET 
export async function GET() {
  try {
    const documents = await prisma.regulatory_documents.findMany();
    return NextResponse.json(documents, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
