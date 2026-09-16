import { toast } from "sonner"

import { buildTelegramUrl, generateOrderMessage } from "@/lib/telegram"
import type { CartItem } from "@/store/cart-store"

/**
 * Builds the order message, copies it to the clipboard as a fallback, and
 * opens Telegram with the message prefilled. No real payment is processed.
 */
export async function checkoutViaTelegram(items: CartItem[]): Promise<void> {
  if (items.length === 0) {
    toast.error("Savatcha bo‘sh", {
      description: "Buyurtma berish uchun avval mahsulot qo‘shing.",
    })
    return
  }

  const message = generateOrderMessage(items)

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(message)
    }
  } catch {
    // Clipboard is a nice-to-have; ignore failures.
  }

  toast.success("Telegram ochilmoqda", {
    description: "Buyurtma matni nusxalandi. Adminga yuboring.",
  })

  const url = buildTelegramUrl(message)
  window.open(url, "_blank", "noopener,noreferrer")
}
