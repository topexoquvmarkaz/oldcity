"use client"

import { useEffect, useMemo, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { SlidersHorizontalIcon, XIcon } from "lucide-react"

import { ProductGrid } from "@/components/product/product-grid"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  CATEGORY_LABELS,
  GENDER_LABELS,
  searchProducts,
  type CategorySlug,
  type Gender,
  type Product,
} from "@/lib/products"
import { cn } from "@/lib/utils"

const GENDERS = Object.keys(GENDER_LABELS) as Gender[]
const CATEGORIES = Object.keys(CATEGORY_LABELS) as CategorySlug[]

const PRICE_RANGES = [
  { id: "all", label: "Barchasi", test: () => true },
  { id: "lt800", label: "800 000 so‘mgacha", test: (p: number) => p < 800000 },
  {
    id: "mid",
    label: "800 000 – 1 200 000 so‘m",
    test: (p: number) => p >= 800000 && p <= 1200000,
  },
  { id: "gt1200", label: "1 200 000 so‘mdan", test: (p: number) => p > 1200000 },
] as const

const SORTS = [
  { id: "popular", label: "Ommabop" },
  { id: "price-asc", label: "Arzon → Qimmat" },
  { id: "price-desc", label: "Qimmat → Arzon" },
  { id: "new", label: "Yangi" },
  { id: "rating", label: "Reyting" },
] as const

export interface CatalogInitial {
  genders: Gender[]
  categories: CategorySlug[]
  q: string
}

function toggle<T>(arr: T[], value: T): T[] {
  return arr.includes(value)
    ? arr.filter((v) => v !== value)
    : [...arr, value]
}

export function CatalogView({
  products,
  initial,
}: {
  products: Product[]
  initial: CatalogInitial
}) {
  const router = useRouter()
  const pathname = usePathname()

  const [genders, setGenders] = useState<Gender[]>(initial.genders)
  const [categories, setCategories] = useState<CategorySlug[]>(
    initial.categories,
  )
  const [price, setPrice] = useState<string>("all")
  const [sort, setSort] = useState<string>("popular")
  const [q] = useState<string>(initial.q)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Keep the URL in sync for shareable filters (without a full reload).
  useEffect(() => {
    const params = new URLSearchParams()
    genders.forEach((g) => params.append("gender", g))
    categories.forEach((c) => params.append("category", c))
    if (q) params.set("q", q)
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }, [genders, categories, q, pathname, router])

  const filtered = useMemo(() => {
    let list = q ? searchProducts(q) : products
    if (genders.length) list = list.filter((p) => genders.includes(p.gender))
    if (categories.length)
      list = list.filter((p) => categories.includes(p.category))
    const range = PRICE_RANGES.find((r) => r.id === price)
    if (range) list = list.filter((p) => range.test(p.price))

    const sorted = [...list]
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price)
        break
      case "new":
        sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew))
        break
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating)
        break
      default:
        sorted.sort(
          (a, b) =>
            (b.discount ? 1 : 0) + b.rating / 10 - ((a.discount ? 1 : 0) + a.rating / 10),
        )
    }
    return sorted
  }, [products, genders, categories, price, sort, q])

  const activeCount = genders.length + categories.length + (price !== "all" ? 1 : 0)

  function clearAll() {
    setGenders([])
    setCategories([])
    setPrice("all")
  }

  const panel = (
    <FilterPanel
      genders={genders}
      categories={categories}
      price={price}
      onToggleGender={(g) => setGenders((prev) => toggle(prev, g))}
      onToggleCategory={(c) => setCategories((prev) => toggle(prev, c))}
      onPrice={setPrice}
      onClear={clearAll}
      activeCount={activeCount}
    />
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {q ? `Qidiruv: “${q}”` : "Katalog"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {filtered.length} ta mahsulot topildi
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3 lg:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            render={
              <Button variant="outline" className="gap-2">
                <SlidersHorizontalIcon className="size-4" />
                Filtrlar
                {activeCount > 0 && (
                  <span className="flex size-5 items-center justify-center rounded-full bg-gold text-xs text-primary-foreground">
                    {activeCount}
                  </span>
                )}
              </Button>
            }
          />
          <SheetContent side="left" className="w-80 gap-0 overflow-y-auto">
            <SheetHeader className="border-b px-5 py-4">
              <SheetTitle>Filtrlar</SheetTitle>
            </SheetHeader>
            <div className="p-5">{panel}</div>
          </SheetContent>
        </Sheet>

        <SortSelect value={sort} onChange={setSort} />
      </div>

      <div className="mt-6 flex gap-8">
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-20">{panel}</div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-6 hidden items-center justify-between lg:flex">
            <div className="flex flex-wrap gap-2">
              {genders.map((g) => (
                <Chip key={g} onClear={() => setGenders((p) => toggle(p, g))}>
                  {GENDER_LABELS[g]}
                </Chip>
              ))}
              {categories.map((c) => (
                <Chip
                  key={c}
                  onClear={() => setCategories((p) => toggle(p, c))}
                >
                  {CATEGORY_LABELS[c]}
                </Chip>
              ))}
            </div>
            <SortSelect value={sort} onChange={setSort} />
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border py-20 text-center">
              <p className="text-sm text-muted-foreground">
                Tanlangan filtrlar bo‘yicha mahsulot topilmadi.
              </p>
              <Button variant="outline" onClick={clearAll}>
                Filtrlarni tozalash
              </Button>
            </div>
          ) : (
            <ProductGrid
              products={filtered}
              className="md:grid-cols-2 xl:grid-cols-3"
            />
          )}
        </div>
      </div>
    </div>
  )
}

function Chip({
  children,
  onClear,
}: {
  children: React.ReactNode
  onClear: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClear}
      className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-accent"
    >
      {children}
      <XIcon className="size-3" />
    </button>
  )
}

function SortSelect({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="hidden text-muted-foreground sm:inline">Saralash:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-gold"
      >
        {SORTS.map((s) => (
          <option key={s.id} value={s.id}>
            {s.label}
          </option>
        ))}
      </select>
    </label>
  )
}

function FilterPanel({
  genders,
  categories,
  price,
  onToggleGender,
  onToggleCategory,
  onPrice,
  onClear,
  activeCount,
}: {
  genders: Gender[]
  categories: CategorySlug[]
  price: string
  onToggleGender: (g: Gender) => void
  onToggleCategory: (c: CategorySlug) => void
  onPrice: (id: string) => void
  onClear: () => void
  activeCount: number
}) {
  return (
    <div className="flex flex-col gap-7">
      <FilterGroup title="Jins">
        {GENDERS.map((g) => (
          <CheckRow
            key={g}
            checked={genders.includes(g)}
            onChange={() => onToggleGender(g)}
            label={GENDER_LABELS[g]}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Kategoriya">
        {CATEGORIES.map((c) => (
          <CheckRow
            key={c}
            checked={categories.includes(c)}
            onChange={() => onToggleCategory(c)}
            label={CATEGORY_LABELS[c]}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Narx">
        {PRICE_RANGES.map((r) => (
          <RadioRow
            key={r.id}
            checked={price === r.id}
            onChange={() => onPrice(r.id)}
            label={r.label}
          />
        ))}
      </FilterGroup>

      {activeCount > 0 && (
        <Button variant="ghost" className="justify-start px-0" onClick={onClear}>
          Filtrlarni tozalash
        </Button>
      )}
    </div>
  )
}

function FilterGroup({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h3>
      <div className="mt-3 flex flex-col gap-2.5">{children}</div>
    </div>
  )
}

function CheckRow({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: () => void
  label: string
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm">
      <span
        className={cn(
          "flex size-4.5 items-center justify-center rounded border transition-colors",
          checked
            ? "border-gold bg-gold text-primary-foreground"
            : "border-input bg-background",
        )}
      >
        {checked && (
          <svg viewBox="0 0 12 12" className="size-3" aria-hidden>
            <path
              d="M2 6l2.5 2.5L10 3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className="text-foreground">{label}</span>
    </label>
  )
}

function RadioRow({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: () => void
  label: string
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm">
      <span
        className={cn(
          "flex size-4.5 items-center justify-center rounded-full border transition-colors",
          checked ? "border-gold" : "border-input",
        )}
      >
        {checked && <span className="size-2.5 rounded-full bg-gold" />}
      </span>
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className="text-foreground">{label}</span>
    </label>
  )
}
