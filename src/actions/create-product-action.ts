'use server'

import { prisma } from '@/lib/prisma'
import { ProductSchema } from '@/schema'

export async function createProduct(data: unknown) {
  const result = ProductSchema.safeParse(data)
  if (!result.success) return { errors: result.error.issues }

  try {
    await prisma.product.create({ data: result.data })
  } catch (error) {
    console.log(error)
  }
}
