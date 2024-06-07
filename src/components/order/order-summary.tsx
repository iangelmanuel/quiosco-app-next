'use client'

import { useMemo } from 'react'
import { useStore } from '@/store/store'
import { ProductDetails } from './product-details'
import { formatCurrency } from '@/utils/format-currency'

export const OrderSummary = () => {
  const order = useStore((state) => state.order)
  const total = useMemo(
    () => order.reduce((acc, item) => acc + item.quantity * item.price, 0),
    [order]
  )
  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>
      <div className="my-5">
        {order.length === 0 ? (
          <p className="text-center my-10">El carrito esta vacio</p>
        ) : (
          order.map((item) => <ProductDetails key={item.id} item={item} />)
        )}
        <p className="text-2xl mt-20 text-center">
          Total a pagar:{''}
          <span className="font-bold">{formatCurrency(total)}</span>
        </p>
      </div>
    </aside>
  )
}
