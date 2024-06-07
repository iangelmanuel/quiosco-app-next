'use client'

import { useMemo } from 'react'
import { useStore } from '@/store/store'
import { createOrder } from '@/actions/create-order-action'
import { ProductDetails } from './product-details'
import { formatCurrency } from '@/utils/format-currency'
import { OrderSchema } from '@/schema'
import { toast } from 'react-toastify'

export const OrderSummary = () => {
  const order = useStore((state) => state.order)
  const clearOrder = useStore((state) => state.clearOrder)
  const total = useMemo(
    () => order.reduce((acc, item) => acc + item.quantity * item.price, 0),
    [order]
  )

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      total,
      order,
    }
    const result = OrderSchema.safeParse(data)

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message)
      })
      return
    }

    const response = await createOrder(data)
    if (response?.errors) {
      response.errors.forEach((error) => {
        toast.error(error.message)
      })
    }

    if (!response?.errors) {
      toast.success('Pedido creado correctamente')
      clearOrder()
    }
  }
  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>
      {order.length === 0 ? (
        <p className="text-center my-10">El pedido esta vacio</p>
      ) : (
        <>
          {order.map((item) => (
            <ProductDetails key={item.id} item={item} />
          ))}
          <div className="my-5">
            <p className="text-2xl mt-20 text-center">
              Total a pagar:{''}
              <span className="font-bold">{formatCurrency(total)}</span>
            </p>

            <form action={handleCreateOrder} className="w-full mt-10 space-y-5">
              <input
                type="text"
                placeholder="Tu nombre"
                className="bg-white border border-gray-100 p-2 w-full"
                name="name"
              />
              <input
                type="submit"
                className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold"
                value="Confirmar Pedido"
              />
            </form>
          </div>
        </>
      )}
    </aside>
  )
}
