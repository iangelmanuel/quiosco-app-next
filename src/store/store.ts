import { create } from 'zustand'
import type { OrderItem } from '@/types'
import { Product } from '@prisma/client'

interface Store {
  order: OrderItem[]
  addToCart: (product: Product) => void
  increaseQuantity: (id: Product['id']) => void
  decreaseQuantity: (id: Product['id']) => void
  deleteItem: (id: Product['id']) => void
  clearOrder: () => void
}

export const useStore = create<Store>((set, get) => ({
  order: [],

  addToCart: (product) => {
    const { categoryId, image, ...rest } = product
    let orderItems: OrderItem[] = []

    if (get().order.find((item) => item.id === product.id)) {
      orderItems = get().order.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: item.price * (item.quantity + 1),
            }
          : item
      )
    } else {
      orderItems = [
        ...get().order,
        {
          ...rest,
          quantity: 1,
          subtotal: 1 * product.price,
        },
      ]
    }

    set(() => ({
      order: orderItems,
    }))
  },

  increaseQuantity: (id) => {
    set((state) => ({
      order: state.order.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: item.price * (item.quantity + 1),
            }
          : item
      ),
    }))
  },

  decreaseQuantity: (id) => {
    const order = get().order.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity - 1,
            subtotal: item.price * (item.quantity - 1),
          }
        : item
    )

    set(() => ({
      order,
    }))
  },

  deleteItem: (id) => {
    set((state) => ({
      order: state.order.filter((item) => item.id !== id),
    }))
  },

  clearOrder: () => {
    set(() => ({
      order: [],
    }))
  },
}))
