export interface NavLink {
  label: string
  href: string
}

export const MAIN_NAV: NavLink[] = [
  { label: "Katalog", href: "/catalog" },
  { label: "Erkaklar", href: "/catalog?gender=erkaklar" },
  { label: "Ayollar", href: "/catalog?gender=ayollar" },
  { label: "Sneakers", href: "/catalog?category=sneakers" },
  { label: "Sport", href: "/catalog?category=sport" },
  { label: "Classic", href: "/catalog?category=classic" },
]
