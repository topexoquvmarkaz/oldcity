"use client"

import { useState } from "react"
import { toast } from "sonner"
import {
  HeartIcon,
  MinusIcon,
  PlusIcon,
  SendIcon,
  ShoppingBagIcon,
  TruckIcon,
} from "lucide-react"

import { ProductGallery } from "@/components/product/product-gallery"
import { RatingStars } from "@/components/product/rating-stars"
import { Button } from "@/components/ui/button"
import { checkoutViaTelegram } from "@/lib/checkout"
import { GENDER_LABELS, type Product } from "@/lib/products"
import { cn, formatPrice } from "@/lib/utils"
import { useCart } from "@/store/cart-store"
import { useFavorites } from "@/store/favorites-store"

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [size, setSize] = useState<number | null>(null)
  const [qty, setQty] = useState(1)
  const [color, setColor] = useState(0)

  const fav = isFavorite(product.slug)

  function buildItem() {
    return {
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: product.price,
      size: size as number,
    }
  }

  function handleAdd() {
    if (size === null) {
      toast.error("O‘lchamni tanlang", {
        description: "Savatga qo‘shishdan oldin o‘lchamni belgilang.",
      })
      return
    }
    addItem(buildItem(), qty)
    toast.success("Savatga qo‘shildi", {
      description: `${product.name} · ${size} · ${qty} dona`,
    })
  }

  function handleBuyNow() {
    if (size === null) {
      toast.error("O‘lchamni tanlang", {
        description: "Buyurtma berishdan oldin o‘lchamni belgilang.",
      })
      return
    }
    checkoutViaTelegram([{ ...buildItem(), quantity: qty }])
  }

  const specs = [
    { label: "Brend", value: product.brand },
    { label: "Kategoriya", value: product.categoryLabel },
    { label: "Jins", value: GENDER_LABELS[product.gender] },
    { label: "Material", value: product.material },
    { label: "Taglik", value: product.sole },
    { label: "Uslub", value: product.style },
    { label: "Mavsum", value: product.season },
    { label: "Ishlab chiqarilgan", value: product.country },
    { label: "Artikul", value: product.sku },
  ]

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
      <ProductGallery images={product.images} name={product.name} />

      <div>
        <div className="flex flex-wrap items-center gap-2">
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
          <span className="text-xs uppercase tracking-wide text-muted-foreground">
            {product.brand}
          </span>
        </div>

        <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight">
          {product.name}
        </h1>

        <div className="mt-3 flex items-center gap-3">
          <RatingStars rating={product.rating} size={16} />
          <span className="text-sm text-muted-foreground">
            {product.rating.toFixed(1)} · {product.reviewsCount} sharh
          </span>
        </div>

        <div className="mt-5 flex items-baseline gap-3">
          <span className="text-3xl font-bold">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-lg text-muted-foreground line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
          {product.fullDescription}
        </p>

        {product.colors && product.colors.length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-medium">
              Rang:{" "}
              <span className="text-muted-foreground">
                {product.colors[color].name}
              </span>
            </p>
            <div className="mt-2 flex gap-2">
              {product.colors.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColor(i)}
                  aria-label={c.name}
                  className={cn(
                    "size-8 rounded-full border transition-all",
                    color === i
                      ? "ring-2 ring-gold ring-offset-2"
                      : "border-border",
                  )}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">O‘lcham</p>
            <span className="text-xs text-muted-foreground">
              {product.stock <= 8
                ? `Faqat ${product.stock} juft qoldi`
                : "Sotuvda mavjud"}
            </span>
          </div>
          <div className="mt-2 grid grid-cols-5 gap-2 sm:grid-cols-6">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={cn(
                  "flex h-11 items-center justify-center rounded-lg border text-sm font-medium transition-colors",
                  size === s
                    ? "border-gold bg-gold text-primary-foreground"
                    : "border-input bg-background hover:border-gold",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <div className="flex items-center rounded-lg border">
            <button
              type="button"
              aria-label="Kamaytirish"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex size-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            >
              <MinusIcon className="size-4" />
            </button>
            <span className="w-10 text-center text-sm font-medium tabular-nums">
              {qty}
            </span>
            <button
              type="button"
              aria-label="Ko‘paytirish"
              onClick={() => setQty((q) => q + 1)}
              className="flex size-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            >
              <PlusIcon className="size-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              toggleFavorite(product.slug)
              toast(
                fav ? "Sevimlilardan olib tashlandi" : "Sevimlilarga qo‘shildi",
              )
            }}
            aria-pressed={fav}
            className={cn(
              "flex size-11 items-center justify-center rounded-lg border transition-colors",
              fav
                ? "border-gold text-gold"
                : "border-input text-foreground hover:border-gold",
            )}
          >
            <HeartIcon className={cn("size-5", fav && "fill-gold")} />
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Button
            className="h-12 flex-1 bg-charcoal text-base text-white hover:bg-charcoal/90"
            onClick={handleAdd}
          >
            <ShoppingBagIcon className="size-5" />
            Savatga qo‘shish
          </Button>
          <Button
            className="h-12 flex-1 bg-gold text-base text-primary-foreground hover:bg-gold-hover"
            onClick={handleBuyNow}
          >
            <SendIcon className="size-5" />
            Telegram orqali
          </Button>
        </div>

        <div className="mt-5 flex items-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm text-muted-foreground">
          <TruckIcon className="size-4.5 text-gold" />
          Toshkent bo‘ylab 1-2 kun ichida yetkazib berish
        </div>

        <dl className="mt-8 divide-y divide-border rounded-xl border border-border">
          {specs.map((s) => (
            <div
              key={s.label}
              className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
            >
              <dt className="text-muted-foreground">{s.label}</dt>
              <dd className="text-right font-medium text-foreground">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
