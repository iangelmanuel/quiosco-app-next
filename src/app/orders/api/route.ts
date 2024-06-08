import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      where: {
        status: true,
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
  } catch (error) {
    console.log(error)
  }
}
