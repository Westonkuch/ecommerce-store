import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // ✅ named import


export const runtime = 'nodejs'; // Ensure this is present

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params; // ✅ await the params
    const productId = parseInt(id, 10);
  
    if (isNaN(productId)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }
  
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
  
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
  
    return NextResponse.json(product);
  }
  