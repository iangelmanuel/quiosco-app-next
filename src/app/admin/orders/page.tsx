import { Heading } from '@/components/iu/Heading'
import { OrderCard } from '@/components/order/order-card'
import { prisma } from '@/lib/prisma'

async function getPendingOrders() {
  return await prisma.order.findMany({
    where: {
      status: false,
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  })
}

export default async function OrdersPage() {
  const orders = await getPendingOrders()
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
