import { ADMIN_TELEGRAM_USERNAME } from "@/lib/config"
import { formatPrice } from "@/lib/utils"
import type { CartItem } from "@/store/cart-store"

/** Builds the localized Telegram order message from cart items. */
export function generateOrderMessage(items: CartItem[]): string {
  const lines: string[] = []
  lines.push("Assalomu alaykum!")
  lines.push("")
  lines.push("Quyidagi mahsulotlarni sotib olmoqchiman:")
  lines.push("")

  let total = 0
  items.forEach((item, index) => {
    const lineTotal = item.price * item.quantity
    total += lineTotal
    lines.push(`${index + 1}. ${item.name}`)
    lines.push(`O'lcham: ${item.size}`)
    lines.push(`Soni: ${item.quantity}`)
    lines.push(`Narxi: ${formatPrice(lineTotal)}`)
    lines.push("")
  })

  lines.push(`Jami: ${formatPrice(total)}`)
  lines.push("")
  lines.push("Shularni sotib olmoqchiman.")

  return lines.join("\n")
}

/** Builds the t.me deep link with the prefilled, URL-encoded message. */
export function buildTelegramUrl(message: string): string {
  return `https://t.me/${ADMIN_TELEGRAM_USERNAME}?text=${encodeURIComponent(
    message,
  )}`
}
