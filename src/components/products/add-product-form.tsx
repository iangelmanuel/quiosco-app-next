'use client'

import { toast } from 'react-toastify'
import { ProductSchema } from '@/schema'
import { createProduct } from '@/actions/create-product-action'
import { redirect } from 'next/navigation'

export const AddProductForm = ({ children }: { children: React.ReactNode }) => {
  const handleAction = async (formData: FormData) => {
    const data = {
      name: formData.get('name')!,
      price: Number(formData.get('price'))!,
      categoryId: Number(formData.get('categoryId'))!,
      image: formData.get('image')!,
    }
    const result = ProductSchema.safeParse(data)

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message)
      })
      return
    }
    const response = await createProduct(result.data)

    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message)
      })
      return
    }
    toast.success('Product creado correctamente')
    redirect('/admin/products')
  }
  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
      <form action={handleAction} className="space-y-5">
        {children}
        <input
          type="submit"
          value="Añadir Producto"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
        />
      </form>
    </div>
  )
}
