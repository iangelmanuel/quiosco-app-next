import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Heading } from '@/components/iu/Heading'
import { ProductSearch } from '@/components/products/product-search'
import { ProductTable } from '@/components/products/products-table'

async function searchProducts(searchTerm: string) {
  return await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: 'insensitive',
      },
    },
    include: {
      category: true,
    },
  })
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { search: string }
}) {
  const searchTerm = searchParams.search
  const products = await searchProducts(searchTerm)
  return (
    <>
      <Heading>Resultados de Búsqueda: {searchParams.search}</Heading>
      <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
        <Link
          href="/admin/products/new"
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
        >
          Crear Producto
        </Link>
        <ProductSearch />
      </div>

      {products.length ? (
        <ProductTable products={products} />
      ) : (
        <p className="text-center text-gray-600 mt-10">
          No se encontraron productos
        </p>
      )}
    </>
  )
}
