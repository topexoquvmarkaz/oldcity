"use client"

import { createContext, useContext } from "react"

export interface FavoritesContextValue {
  favorites: string[] // product slugs
  isFavorite: (slug: string) => boolean
  toggleFavorite: (slug: string) => void
  removeFavorite: (slug: string) => void
  count: number
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(
  null,
)

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext)
  if (!ctx)
    throw new Error("useFavorites must be used within a StoreProvider")
  return ctx
}
