'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { OrderIdSchema } from '@/schema'

export async function completeOrder(formData: FormData) {
  try {
    const data = {
      orderId: formData.get('order-id'),
    }
    const result = OrderIdSchema.safeParse(data)
    if (!result.success) throw new Error(result.error.errors[0].message)

    const order = await prisma.order.update({
      where: {
        id: result.data.orderId,
      },
      data: {
        status: true,
      },
    })

    revalidatePath('/admin/orders')
    return order
  } catch (error) {
    console.log(error)
  }
}
