"use client"

import { useState } from "react"
import Link from "next/link"
import {
  HeartIcon,
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
} from "lucide-react"

import { CartSheet } from "@/components/layout/cart-sheet"
import { SearchSheet } from "@/components/layout/search-sheet"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SITE } from "@/lib/config"
import { MAIN_NAV } from "@/lib/nav"
import { useCart } from "@/store/cart-store"
import { useFavorites } from "@/store/favorites-store"

function CountBadge({ count }: { count: number }) {
  if (count <= 0) return null
  return (
    <span className="absolute -right-1.5 -top-1.5 flex min-w-4.5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold leading-4.5 text-primary-foreground">
      {count > 9 ? "9+" : count}
    </span>
  )
}

export function SiteHeader() {
  const { totalItems } = useCart()
  const { count: favCount } = useFavorites()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        {/* Mobile menu */}
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger
            render={
              <button
                type="button"
                aria-label="Menyu"
                className="flex size-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary lg:hidden"
              />
            }
          >
            <MenuIcon className="size-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-72 gap-0">
            <SheetHeader className="border-b px-5 py-4">
              <SheetTitle>
                <span className="text-lg font-black tracking-tight">
                  {SITE.name}
                </span>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col px-2 py-3">
              {MAIN_NAV.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="mr-2 flex items-center gap-1.5">
          <span className="text-xl font-black tracking-tight text-foreground">
            {SITE.name}
          </span>
          <span className="size-1.5 rounded-full bg-gold" aria-hidden />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden flex-1 items-center gap-1 lg:flex">
          {MAIN_NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-1">
          <SearchSheet>
            <button
              type="button"
              aria-label="Qidiruv"
              className="flex size-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary"
            >
              <SearchIcon className="size-5" />
            </button>
          </SearchSheet>

          <Link
            href="/favorites"
            aria-label="Sevimlilar"
            className="relative flex size-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary"
          >
            <HeartIcon className="size-5" />
            <CountBadge count={favCount} />
          </Link>

          <CartSheet>
            <button
              type="button"
              aria-label="Savatcha"
              className="relative flex size-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary"
            >
              <ShoppingBagIcon className="size-5" />
              <CountBadge count={totalItems} />
            </button>
          </CartSheet>
        </div>
      </div>
    </header>
  )
}
