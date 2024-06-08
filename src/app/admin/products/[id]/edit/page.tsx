import { notFound } from 'next/navigation'
import { Heading } from '@/components/iu/Heading'
import { EditProductForm } from '@/components/products/edit-product-form'
import ProductForm from '@/components/products/product-form'
import { prisma } from '@/lib/prisma'
import { GoBackButton } from '@/components/iu/go-back-button'

async function getProductById(id: number) {
  return await prisma.product.findUnique({
    where: { id },
  })
}

export default async function EditProductPage({
  params,
}: {
  params: { id: string }
}) {
  const product = await getProductById(Number(params.id))
  if (!product) notFound()
  return (
    <>
      <Heading>
        Editar Producto # {product.id} {product.name}
      </Heading>
      <GoBackButton />
      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  )
}
