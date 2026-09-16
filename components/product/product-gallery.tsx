"use client"

import { useState } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

export function ProductGallery({
  images,
  name,
}: {
  images: string[]
  name: string
}) {
  const [active, setActive] = useState(0)
  const list = images.length ? images : ["/placeholder.svg"]

  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row">
      <div className="flex gap-3 overflow-x-auto sm:flex-col no-scrollbar">
        {list.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`${i + 1}-rasm`}
            className={cn(
              "relative size-16 shrink-0 overflow-hidden rounded-lg bg-secondary transition-all sm:size-20",
              active === i
                ? "ring-2 ring-gold ring-offset-2"
                : "opacity-70 hover:opacity-100",
            )}
          >
            <Image
              src={src || "/placeholder.svg"}
              alt=""
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <div className="relative aspect-square flex-1 overflow-hidden rounded-2xl bg-secondary">
        <Image
          src={list[active] || "/placeholder.svg"}
          alt={name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </div>
  )
}
