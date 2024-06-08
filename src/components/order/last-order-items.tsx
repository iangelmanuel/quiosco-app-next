import type { OrderWithProducts } from '@/types'

type LastOrderItemsProps = {
  order: OrderWithProducts
}

export const LastOrderItems = ({ order }: LastOrderItemsProps) => {
  return (
    <div className="bg-white shadow p-5 space-y-5 rounded-lg">
      <p className="text-2xl font-bold text-slate-600">Cliente: {order.name}</p>
      <ul
        role="list"
        className="divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
      >
        {order.orderProducts.map((product) => (
          <li key={product.id} className="flex py-6 text-lg">
            <p>
              <span className="font-bold">({product.quantity})</span>{' '}
              {product.product.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
