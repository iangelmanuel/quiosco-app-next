'use client'

import { Heading } from '@/components/iu/heading'
import { OrderCard } from '@/components/order/order-card'
import { OrderWithProducts } from '@/types'
import useSWR from 'swr'

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
        <Heading>Administrar Ordenes</Heading>
        {orders.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:gric-cols-3 gap-5 mt-5">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <p className="text-center">No hay ordenes pendientes</p>
        )}
      </>
    )
}
