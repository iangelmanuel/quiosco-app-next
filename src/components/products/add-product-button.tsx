'use client'

import { useStore } from '@/store/store'
import type { Product } from '@prisma/client'

type AddProductButtonProps = {
  product: Product
}

export const AddProductButton = ({ product }: AddProductButtonProps) => {
  const addToCart = useStore((state) => state.addToCart)
  return (
    <button
      type="button"
      onClick={() => addToCart(product)}
      className="mt-5 bg-indigo-600 hover:bg-indigo-800 text-white font-bold p-3 uppercase w-full"
    >
      Agregar al Carrito
    </button>
  )
}
