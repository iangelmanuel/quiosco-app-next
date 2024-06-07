'use client'

import type { Category } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

type CategoryIconProps = {
  category: Category
}

export const CategoryIcon = ({ category }: CategoryIconProps) => {
  const params = useParams<{ category: string }>()
  return (
    <div
      className={`${
        category.slug === params.category ? 'bg-amber-400' : ''
      } flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
    >
      <div className="w-16 h-16 relative">
        <Image fill src={`/icon_${category.slug}.svg`} alt={category.name} />
      </div>

      <Link href={`/order/${category.slug}`} className="font-bold text-xl">
        {category.name}
      </Link>
    </div>
  )
}
