import { prisma } from '@/lib/prisma'
import { CategoryIcon } from '../iu/category-icon'

async function getCategories() {
  return await prisma.category.findMany()
}

export const OrderSidebar = async () => {
  const categories = await getCategories()
  return (
    <aside className="md:w-72 md:h-screen bg-white">
      <nav className="mt-10">
        {categories.map((category) => (
          <CategoryIcon key={category.id} category={category} />
        ))}
      </nav>
    </aside>
  )
}
