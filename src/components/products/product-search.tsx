'use client'

import { useRouter } from 'next/navigation'
import { SearchSchema } from '@/schema'
import { toast } from 'react-toastify'

export const ProductSearch = () => {
  const router = useRouter()

  const handleSearchAction = (formData: FormData) => {
    const data = {
      search: formData.get('search'),
    }
    const result = SearchSchema.safeParse(data)

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message)
      })
      return
    }
    router.push(`/admin/products/search?search=${result.data.search}`)
  }
  return (
    <form action={handleSearchAction} className="flex items-center">
      <input
        type="search"
        name="search"
        placeholder="Buscar Productos"
        className="p-2 placeholder-gray400 w-full"
      />
      <input
        type="submit"
        value="Buscar"
        className="bg-indigo-600 p-2 uppercase text-white cursor-pointer"
      />
    </form>
  )
}
