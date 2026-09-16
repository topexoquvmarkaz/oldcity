import type { Metadata } from "next"

import { CatalogView, type CatalogInitial } from "@/components/catalog/catalog-view"
import {
  CATEGORY_LABELS,
  GENDER_LABELS,
  getAllProducts,
  type CategorySlug,
  type Gender,
} from "@/lib/products"

export const metadata: Metadata = {
  title: "Katalog",
  description: "Barcha oyoq kiyimlar: sneakers, sport, klassik va botinkalar.",
}

type SearchParams = Record<string, string | string[] | undefined>

function toArray(value: string | string[] | undefined): string[] {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const sp = await searchParams

  const validGenders = Object.keys(GENDER_LABELS) as Gender[]
  const validCategories = Object.keys(CATEGORY_LABELS) as CategorySlug[]

  const initial: CatalogInitial = {
    genders: toArray(sp.gender).filter((g): g is Gender =>
      validGenders.includes(g as Gender),
    ),
    categories: toArray(sp.category).filter((c): c is CategorySlug =>
      validCategories.includes(c as CategorySlug),
    ),
    q: typeof sp.q === "string" ? sp.q : "",
  }

  return <CatalogView products={getAllProducts()} initial={initial} />
}
