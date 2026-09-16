"use client"

import Link from "next/link"
import {
  HeartIcon,
  HomeIcon,
  LayoutGridIcon,
  SearchIcon,
  ShoppingBagIcon,
} from "lucide-react"

import { CartSheet } from "@/components/layout/cart-sheet"
import { SearchSheet } from "@/components/layout/search-sheet"
import { useCart } from "@/store/cart-store"
import { useFavorites } from "@/store/favorites-store"

function Dot({ show }: { show: boolean }) {
  if (!show) return null
  return (
    <span className="absolute right-1 top-1 size-2 rounded-full bg-gold" />
  )
}

export function MobileBottomNav() {
  const { totalItems } = useCart()
  const { count } = useFavorites()

  const itemClass =
    "relative flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground"

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-background/95 backdrop-blur lg:hidden">
      <Link href="/" className={itemClass}>
        <HomeIcon className="size-5" />
        Bosh sahifa
      </Link>
      <Link href="/catalog" className={itemClass}>
        <LayoutGridIcon className="size-5" />
        Katalog
      </Link>
      <SearchSheet>
        <button type="button" className={itemClass}>
          <SearchIcon className="size-5" />
          Qidiruv
        </button>
      </SearchSheet>
      <Link href="/favorites" className={itemClass}>
        <span className="relative">
          <HeartIcon className="size-5" />
          <Dot show={count > 0} />
        </span>
        Sevimli
      </Link>
      <CartSheet>
        <button type="button" className={itemClass}>
          <span className="relative">
            <ShoppingBagIcon className="size-5" />
            <Dot show={totalItems > 0} />
          </span>
          Savatcha
        </button>
      </CartSheet>
    </nav>
  )
}
