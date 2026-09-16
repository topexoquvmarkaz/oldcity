"use client"

import Link from "next/link"
import { HeartIcon } from "lucide-react"

import { ProductGrid } from "@/components/product/product-grid"
import { Button } from "@/components/ui/button"
import { getProductBySlug } from "@/lib/products"
import { useFavorites } from "@/store/favorites-store"

export default function FavoritesPage() {
  const { favorites } = useFavorites()
  const products = favorites
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Sevimlilar
      </h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        {products.length} ta mahsulot
      </p>

      {products.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border py-20 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-secondary">
            <HeartIcon className="size-6 text-muted-foreground" />
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">
            Hozircha sevimli mahsulotlaringiz yo‘q. Yoqqan modellarni yurakcha
            bilan belgilang.
          </p>
          <Button
            nativeButton={false}
            className="bg-gold text-primary-foreground hover:bg-gold-hover"
            render={<Link href="/catalog" />}
          >
            Katalogga o‘tish
          </Button>
        </div>
      ) : (
        <ProductGrid className="mt-8" products={products} />
      )}
    </div>
  )
}
