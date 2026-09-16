"use client"

import Image from "next/image"
import Link from "next/link"
import {
  MinusIcon,
  PlusIcon,
  SendIcon,
  ShoppingBagIcon,
  TrashIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { checkoutViaTelegram } from "@/lib/checkout"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/store/cart-store"

export default function CartPage() {
  const { items, subtotal, totalItems, updateQuantity, removeItem, clear } =
    useCart()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Savatcha
        </h1>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border py-20 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-secondary">
            <ShoppingBagIcon className="size-6 text-muted-foreground" />
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">
            Savatchangiz bo‘sh. Katalogdan yoqqan mahsulotni tanlang.
          </p>
          <Button
            nativeButton={false}
            className="bg-gold text-primary-foreground hover:bg-gold-hover"
            render={<Link href="/catalog" />}
          >
            Xarid qilishni boshlash
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Savatcha
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {totalItems} ta mahsulot
          </p>
        </div>
        <button
          type="button"
          onClick={clear}
          className="text-sm text-muted-foreground transition-colors hover:text-destructive"
        >
          Tozalash
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <ul className="flex flex-col divide-y divide-border rounded-2xl border border-border">
          {items.map((item) => (
            <li key={`${item.id}-${item.size}`} className="flex gap-4 p-4">
              <Link
                href={`/product/${item.slug}`}
                className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-secondary sm:size-28"
              >
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </Link>

              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      href={`/product/${item.slug}`}
                      className="font-semibold leading-snug transition-colors hover:text-gold"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      O‘lcham: {item.size}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id, item.size)}
                    aria-label="O‘chirish"
                    className="text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <TrashIcon className="size-4.5" />
                  </button>
                </div>

                <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                  <div className="flex items-center rounded-lg border">
                    <button
                      type="button"
                      aria-label="Kamaytirish"
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity - 1)
                      }
                      className="flex size-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <MinusIcon className="size-4" />
                    </button>
                    <span className="w-9 text-center text-sm font-medium tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Ko‘paytirish"
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity + 1)
                      }
                      className="flex size-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <PlusIcon className="size-4" />
                    </button>
                  </div>
                  <span className="font-semibold">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="lg:sticky lg:top-20 lg:h-fit">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold">Buyurtma xulosasi</h2>
            <dl className="mt-4 flex flex-col gap-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">
                  Mahsulotlar ({totalItems})
                </dt>
                <dd className="font-medium">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Yetkazib berish</dt>
                <dd className="font-medium text-gold">Telegram orqali</dd>
              </div>
            </dl>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="font-medium">Jami</span>
              <span className="text-xl font-bold">{formatPrice(subtotal)}</span>
            </div>

            <Button
              className="mt-6 h-12 w-full bg-gold text-base text-primary-foreground hover:bg-gold-hover"
              onClick={() => checkoutViaTelegram(items)}
            >
              <SendIcon className="size-5" />
              Telegram orqali buyurtma
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Buyurtma matni avtomatik tayyorlanadi va Telegram orqali
              yuboriladi. To‘lov amalga oshirilmaydi.
            </p>
            <Button
              variant="outline"
              nativeButton={false}
              className="mt-3 h-10 w-full"
              render={<Link href="/catalog" />}
            >
              Xaridni davom ettirish
            </Button>
          </div>
        </aside>
      </div>
    </div>
  )
}
