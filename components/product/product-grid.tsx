import { ProductCard } from "@/components/product/product-card"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/products"

interface ProductGridProps {
  products: Product[]
  className?: string
  priorityCount?: number
}

export function ProductGrid({
  products,
  className,
  priorityCount = 0,
}: ProductGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4",
        className,
      )}
    >
      {products.map((product, i) => (
        <ProductCard
          key={product.slug}
          product={product}
          priority={i < priorityCount}
        />
      ))}
    </div>
  )
}
