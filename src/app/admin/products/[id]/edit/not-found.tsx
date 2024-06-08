import Link from 'next/link'
import { Heading } from '@/components/iu/Heading'

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Heading>Producto no encontrado</Heading>
      <Link
        href="/admin/products"
        className="bg-amber-400 text-black px-10 py-3 text-xl text-center font-bold cursor-pointer w-full lg:w-auto"
      >
        Volver a productos
      </Link>
    </div>
  )
}
