// src/app/api/search/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.trim() || ''

  // Input validation
  if (query.length < 2) {
    return NextResponse.json(
      { error: 'Search query must be at least 2 characters' },
      { status: 400 }
    )
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { category: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } }
        ]
      },
      take: 5,
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
        category: true,
        description: true
      }
    })

    const response = NextResponse.json(products)
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30')
    return response

  } catch (error: unknown) {
    console.error('Search failed for query:', query, 'Error:', error)
    
    // Type-safe error handling
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'An unknown error occurred'
    
    return NextResponse.json(
      { 
        error: 'Failed to search products',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    )
  }
}