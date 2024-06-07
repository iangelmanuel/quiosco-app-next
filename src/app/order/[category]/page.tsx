import { ProductCard } from '@/components/products/product-card'
import { prisma } from '@/lib/prisma'

async function getProducts(category: string) {
  return await prisma.product.findMany({
    where: { category: { slug: category } },
  })
}

export default async function CategoryDinamicPage({
  params,
}: {
  params: { category: string }
}) {
  const products = await getProducts(params.category)
  return (
    <>
      <h1 className="text-2xl my-10">
        Elige y personaliza tu pedido a continuación
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}
