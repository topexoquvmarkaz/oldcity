"use client"

import Image from "next/image"
import Link from "next/link"
import { HeartIcon } from "lucide-react"

import { RatingStars } from "@/components/product/rating-stars"
import { useFavorites } from "@/store/favorites-store"
import { cn, formatPrice } from "@/lib/utils"
import type { Product } from "@/lib/products"

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export function ProductCard({ product, priority }: ProductCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(product.slug)

  return (
    <div className="group relative flex flex-col">
      <Link
        href={`/product/${product.slug}`}
        className="relative block overflow-hidden rounded-xl bg-secondary"
      >
        <div className="relative aspect-square">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="rounded-full bg-charcoal px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
              Yangi
            </span>
          )}
          {product.discount && (
            <span className="rounded-full bg-gold px-2.5 py-1 text-[11px] font-semibold text-primary-foreground">
              -{product.discount}%
            </span>
          )}
        </div>
      </Link>

      <button
        type="button"
        onClick={() => toggleFavorite(product.slug)}
        aria-label={active ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo‘shish"}
        aria-pressed={active}
        className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-background/80 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-background"
      >
        <HeartIcon
          className={cn(
            "size-4.5 transition-colors",
            active ? "fill-gold text-gold" : "text-charcoal",
          )}
        />
      </button>

      <div className="mt-3 flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs uppercase tracking-wide text-muted-foreground">
            {product.categoryLabel}
          </span>
          <RatingStars rating={product.rating} size={12} />
        </div>

        <Link href={`/product/${product.slug}`} className="mt-1">
          <h3 className="text-pretty text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-gold">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-base font-bold text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
