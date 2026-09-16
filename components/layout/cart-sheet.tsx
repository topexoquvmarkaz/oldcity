"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MinusIcon, PlusIcon, ShoppingBagIcon, TrashIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { checkoutViaTelegram } from "@/lib/checkout"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/store/cart-store"

export function CartSheet({ children }: { children: React.ReactNode }) {
  const { items, totalItems, subtotal, updateQuantity, removeItem } = useCart()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={children as React.ReactElement} />
      <SheetContent className="w-full gap-0 sm:max-w-md">
        <SheetHeader className="border-b px-5 py-4">
          <SheetTitle className="text-base">
            Savatcha{totalItems > 0 ? ` (${totalItems})` : ""}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-secondary">
              <ShoppingBagIcon className="size-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Savatchangiz hozircha bo‘sh.
            </p>
            <Button
              variant="outline"
              nativeButton={false}
              onClick={() => setOpen(false)}
              render={<Link href="/catalog" />}
            >
              Xarid qilishni boshlash
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="flex flex-col gap-4">
                {items.map((item) => (
                  <li
                    key={`${item.id}-${item.size}`}
                    className="flex gap-3"
                  >
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={() => setOpen(false)}
                      className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-secondary"
                    >
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium leading-snug">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            O‘lcham: {item.size}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id, item.size)}
                          aria-label="O‘chirish"
                          className="text-muted-foreground transition-colors hover:text-destructive"
                        >
                          <TrashIcon className="size-4" />
                        </button>
                      </div>

                      <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                        <div className="flex items-center rounded-lg border">
                          <button
                            type="button"
                            aria-label="Kamaytirish"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.size,
                                item.quantity - 1,
                              )
                            }
                            className="flex size-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                          >
                            <MinusIcon className="size-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="Ko‘paytirish"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.size,
                                item.quantity + 1,
                              )
                            }
                            className="flex size-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                          >
                            <PlusIcon className="size-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <SheetFooter className="gap-3 border-t px-5 py-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Jami</span>
                <span className="text-lg font-bold">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <Button
                className="h-11 w-full bg-gold text-primary-foreground hover:bg-gold-hover"
                onClick={() => checkoutViaTelegram(items)}
              >
                Telegram orqali buyurtma
              </Button>
              <Button
                variant="outline"
                nativeButton={false}
                className="h-10 w-full"
                onClick={() => setOpen(false)}
                render={<Link href="/cart" />}
              >
                Savatchani ko‘rish
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
