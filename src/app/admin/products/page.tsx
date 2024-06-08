import { redirect } from 'next/navigation'
import { Heading } from '@/components/iu/Heading'
import { ProductTable } from '@/components/products/products-table'
import { Pagination } from '@/components/products/pagination'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { ProductSearch } from '@/components/products/product-search'

async function productCount() {
  return await prisma.product.count()
}

async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize

  return await prisma.product.findMany({
    take: 10,
    skip,
    include: {
      category: true,
    },
  })
}

export type ProductWithCategory = Awaited<ReturnType<typeof getProducts>>

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  const page = Number(searchParams.page) || 1
  const pageSize = 10

  const productsData = getProducts(page, pageSize)
  const totalProductsData = productCount()
  const [products, totalProducts] = await Promise.all([
    productsData,
    totalProductsData,
  ])

  const totalPages = Math.ceil(totalProducts / pageSize)
  if (page > totalPages) redirect('/admin/products')
  return (
    <>
      <Heading>Productos</Heading>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
        <Link
          href="/admin/products/new"
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
        >
          Crear Producto
        </Link>
        <ProductSearch />
      </div>
      <ProductTable products={products} />
      <Pagination page={page} totalPages={totalPages} />
    </>
  )
}
