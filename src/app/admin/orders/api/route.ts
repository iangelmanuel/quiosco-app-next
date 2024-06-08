import { prisma } from '@/lib/prisma'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const orders = await prisma.order.findMany({
    where: {
      status: false,
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  })
  return NextResponse.json(orders)
}
