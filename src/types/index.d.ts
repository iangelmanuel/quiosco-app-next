import { Product } from '@prisma/client'

export type OrderItem = Pick<Product, 'id' | 'name' | 'price'> & {
  quantity: number
  subtotal: number
}
