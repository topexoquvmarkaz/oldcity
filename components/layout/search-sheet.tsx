"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SearchIcon } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { searchProducts } from "@/lib/products"
import { formatPrice } from "@/lib/utils"

export function SearchSheet({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  const results = useMemo(() => searchProducts(query).slice(0, 6), [query])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    setOpen(false)
    router.push(`/catalog?q=${encodeURIComponent(q)}`)
  }

  function close() {
    setOpen(false)
    setQuery("")
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(o) => {
        setOpen(o)
        if (!o) setQuery("")
      }}
    >
      <SheetTrigger render={children as React.ReactElement} />
      <SheetContent side="top" className="max-h-[90vh] gap-0">
        <SheetHeader className="px-5 py-4">
          <SheetTitle className="text-base">Qidiruv</SheetTitle>
        </SheetHeader>

        <div className="px-5 pb-5">
          <form onSubmit={submit} className="relative">
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" />
            {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Mahsulot, brend yoki kategoriya..."
              className="h-12 w-full rounded-xl border border-input bg-secondary pl-11 pr-4 text-sm outline-none transition-colors focus:border-gold focus:bg-background"
            />
          </form>

          {query.trim() && (
            <div className="mt-4">
              {results.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  Hech narsa topilmadi.
                </p>
              ) : (
                <ul className="flex flex-col divide-y">
                  {results.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/product/${p.slug}`}
                        onClick={close}
                        className="flex items-center gap-3 py-3 transition-colors hover:bg-secondary"
                      >
                        <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-secondary">
                          <Image
                            src={p.images[0] || "/placeholder.svg"}
                            alt={p.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {p.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {p.categoryLabel}
                          </p>
                        </div>
                        <span className="text-sm font-semibold">
                          {formatPrice(p.price)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
