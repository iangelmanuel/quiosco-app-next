import { Heading } from '@/components/iu/Heading'
import { AddProductForm } from '@/components/products/add-product-form'
import ProductForm from '@/components/products/product-form'

export default function NewProductPage() {
  return (
    <>
      <Heading>Hello Page</Heading>
      <AddProductForm>
        <ProductForm />
      </AddProductForm>
    </>
  )
}
