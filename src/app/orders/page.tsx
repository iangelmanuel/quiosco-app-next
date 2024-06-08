'use client'

import useSWR from 'swr'
import { Logo } from '@/components/iu/logo'
import type { OrderWithProducts } from '@/types'
import { LastOrderItems } from '@/components/order/last-order-items'

export default function OrdersPage() {
  const url = '/admin/orders/api'
  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data)

  const {
    data: orders,
    error,
    isLoading,
  } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false,
  })

  if (isLoading) return <p className="text-center mt-10">Cargando...</p>
  if (orders)
    return (
      <>
        <h1 className="text-center mt-20 font-black text-6xl">
          Ordenes Listas
        </h1>
        <Logo />
        {orders.length ? (
          <div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10">
            {orders.map((order) => (
              <LastOrderItems key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <p className="text-center my-10">No hay ordenes Lisas</p>
        )}
      </>
    )
}
