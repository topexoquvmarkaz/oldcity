"use client"

import { createContext, useContext } from "react"

export interface CartItem {
  id: string
  slug: string
  name: string
  image: string
  price: number
  size: number
  quantity: number
}

export interface CartContextValue {
  items: CartItem[]
  totalItems: number
  subtotal: number
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void
  removeItem: (id: string, size: number) => void
  updateQuantity: (id: string, size: number, quantity: number) => void
  clear: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within a StoreProvider")
  return ctx
}

export function cartLineKey(id: string, size: number) {
  return `${id}__${size}`
}
