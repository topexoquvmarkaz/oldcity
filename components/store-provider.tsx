"use client"

import { useCallback, useEffect, useMemo, useState } from "react"

import {
  CartContext,
  cartLineKey,
  type CartItem,
} from "@/store/cart-store"
import { FavoritesContext } from "@/store/favorites-store"

const CART_KEY = "step_cart_v1"
const FAV_KEY = "step_favorites_v1"

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [hydrated, setHydrated] = useState(false)

  // Hydrate from localStorage once on mount.
  useEffect(() => {
    setItems(readStorage<CartItem[]>(CART_KEY, []))
    setFavorites(readStorage<string[]>(FAV_KEY, []))
    setHydrated(true)
  }, [])

  // Persist after hydration so we never overwrite stored data with defaults.
  useEffect(() => {
    if (!hydrated) return
    window.localStorage.setItem(CART_KEY, JSON.stringify(items))
  }, [items, hydrated])

  useEffect(() => {
    if (!hydrated) return
    window.localStorage.setItem(FAV_KEY, JSON.stringify(favorites))
  }, [favorites, hydrated])

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, quantity = 1) => {
      setItems((prev) => {
        const key = cartLineKey(item.id, item.size)
        const existing = prev.find(
          (i) => cartLineKey(i.id, i.size) === key,
        )
        if (existing) {
          return prev.map((i) =>
            cartLineKey(i.id, i.size) === key
              ? { ...i, quantity: i.quantity + quantity }
              : i,
          )
        }
        return [...prev, { ...item, quantity }]
      })
    },
    [],
  )

  const removeItem = useCallback((id: string, size: number) => {
    const key = cartLineKey(id, size)
    setItems((prev) => prev.filter((i) => cartLineKey(i.id, i.size) !== key))
  }, [])

  const updateQuantity = useCallback(
    (id: string, size: number, quantity: number) => {
      const key = cartLineKey(id, size)
      setItems((prev) =>
        prev
          .map((i) =>
            cartLineKey(i.id, i.size) === key
              ? { ...i, quantity: Math.max(1, quantity) }
              : i,
          )
          .filter((i) => i.quantity > 0),
      )
    },
    [],
  )

  const clear = useCallback(() => setItems([]), [])

  const toggleFavorite = useCallback((slug: string) => {
    setFavorites((prev) =>
      prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug],
    )
  }, [])

  const removeFavorite = useCallback((slug: string) => {
    setFavorites((prev) => prev.filter((s) => s !== slug))
  }, [])

  const cartValue = useMemo(() => {
    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    return {
      items,
      totalItems,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clear,
    }
  }, [items, addItem, removeItem, updateQuantity, clear])

  const favValue = useMemo(
    () => ({
      favorites,
      isFavorite: (slug: string) => favorites.includes(slug),
      toggleFavorite,
      removeFavorite,
      count: favorites.length,
    }),
    [favorites, toggleFavorite, removeFavorite],
  )

  return (
    <CartContext.Provider value={cartValue}>
      <FavoritesContext.Provider value={favValue}>
        {children}
      </FavoritesContext.Provider>
    </CartContext.Provider>
  )
}
