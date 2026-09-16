export type Gender = "erkaklar" | "ayollar" | "unisex"

export type CategorySlug =
  | "sneakers"
  | "sport"
  | "classic"
  | "casual"
  | "boots"

export interface Product {
  id: string
  slug: string
  name: string
  brand: string
  category: CategorySlug
  categoryLabel: string
  gender: Gender
  price: number
  oldPrice?: number
  discount?: number
  description: string
  fullDescription: string
  images: string[]
  sizes: number[]
  colors?: { name: string; hex: string }[]
  rating: number
  reviewsCount: number
  isNew: boolean
  stock: number
  sku: string
  material: string
  sole: string
  style: string
  season: string
  country: string
}

export const CATEGORY_LABELS: Record<CategorySlug, string> = {
  sneakers: "Sneakers",
  sport: "Sport",
  classic: "Classic",
  casual: "Casual",
  boots: "Boots",
}

export const GENDER_LABELS: Record<Gender, string> = {
  erkaklar: "Erkaklar",
  ayollar: "Ayollar",
  unisex: "Unisex",
}

const COMMON_SIZES = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]

function img(slug: string, n: number) {
  return `/images/products/${slug}-${n}.png`
}

function discountPct(price: number, oldPrice?: number) {
  if (!oldPrice || oldPrice <= price) return undefined
  return Math.round(((oldPrice - price) / oldPrice) * 100)
}

interface Seed {
  slug: string
  name: string
  brand: string
  category: CategorySlug
  gender: Gender
  price: number
  oldPrice?: number
  rating: number
  reviewsCount: number
  isNew: boolean
  stock: number
  material: string
  sole: string
  style: string
  season: string
  colors?: { name: string; hex: string }[]
  description: string
  fullDescription: string
  sizes?: number[]
}

const SEEDS: Seed[] = [
  {
    slug: "aurum-air-runner",
    name: "Aurum Air Runner",
    brand: "STEP Sport",
    category: "sneakers",
    gender: "unisex",
    price: 1249000,
    oldPrice: 1499000,
    rating: 4.8,
    reviewsCount: 214,
    isNew: true,
    stock: 12,
    material: "Premium tekstil va sun'iy teri",
    sole: "Yengil rezina (air kapsula)",
    style: "Sport / Casual",
    season: "Barcha mavsum",
    colors: [
      { name: "Oq / Oltin", hex: "#e9ce98" },
      { name: "Grafit", hex: "#323232" },
    ],
    description:
      "Kundalik yurish va yengil mashqlar uchun havodek yengil sneakers.",
    fullDescription:
      "Aurum Air Runner — har qadamni yumshoq va qulay qiladigan air amortizatsiya tizimiga ega. Nafas oladigan tekstil yuzasi oyoqni salqin saqlaydi, yengil rezina taglik esa uzoq yurishda ham charchatmaydi.",
  },
  {
    slug: "velar-classic-leather",
    name: "Velar Classic Leather",
    brand: "STEP Heritage",
    category: "classic",
    gender: "erkaklar",
    price: 1599000,
    rating: 4.9,
    reviewsCount: 132,
    isNew: false,
    stock: 8,
    material: "Tabiiy silliq teri",
    sole: "Rezina + charm qatlam",
    style: "Classic",
    season: "Kuz / Bahor",
    colors: [
      { name: "Jigarrang", hex: "#5a3a22" },
      { name: "Qora", hex: "#000000" },
    ],
    description: "Ofis va tadbirlar uchun nafis klassik teri tuflilar.",
    fullDescription:
      "Velar Classic Leather qo‘lda tikilgan detallar va yuqori sifatli tabiiy teridan tayyorlangan. Zamonaviy klassik dizayn har qanday rasmiy uslubga mos keladi va yillar davomida shaklini saqlaydi.",
  },
  {
    slug: "sprint-pro-trainer",
    name: "Sprint Pro Trainer",
    brand: "STEP Sport",
    category: "sport",
    gender: "erkaklar",
    price: 899000,
    oldPrice: 1099000,
    rating: 4.6,
    reviewsCount: 187,
    isNew: false,
    stock: 21,
    material: "Nafas oladigan mesh",
    sole: "EVA amortizatsiya",
    style: "Sport / Running",
    season: "Barcha mavsum",
    description: "Yugurish va zal mashqlari uchun barqaror sport krossovka.",
    fullDescription:
      "Sprint Pro Trainer intensiv mashqlar uchun ishlab chiqilgan. EVA taglik zarbani yumshatadi, mesh yuzasi esa havo almashinuvini ta'minlaydi. Barqaror poshna qismi oyoqni mahkam ushlab turadi.",
  },
  {
    slug: "luna-suede-low",
    name: "Luna Suede Low",
    brand: "STEP Studio",
    category: "casual",
    gender: "ayollar",
    price: 749000,
    rating: 4.7,
    reviewsCount: 96,
    isNew: false,
    stock: 15,
    material: "Zamsh (suede)",
    sole: "Yumshoq rezina",
    style: "Casual",
    season: "Bahor / Yoz",
    colors: [
      { name: "Bej", hex: "#e9ce98" },
      { name: "Pudra", hex: "#d8b4a0" },
    ],
    description: "Kundalik uslub uchun yumshoq zamsh past poshnali krossovka.",
    fullDescription:
      "Luna Suede Low nozik zamsh yuzasi va minimalistik dizayni bilan ajralib turadi. Yumshoq ichki qatlam kun bo‘yi qulaylik beradi, past profil esa har qanday libos bilan uyg‘unlashadi.",
  },
  {
    slug: "titan-trail-boot",
    name: "Titan Trail Boot",
    brand: "STEP Outdoor",
    category: "boots",
    gender: "erkaklar",
    price: 1799000,
    rating: 4.8,
    reviewsCount: 74,
    isNew: false,
    stock: 6,
    material: "Suvga chidamli teri va tekstil",
    sole: "Chuqur protektorli rezina",
    style: "Outdoor / Trail",
    season: "Kuz / Qish",
    colors: [
      { name: "Toq jigarrang", hex: "#4a3524" },
      { name: "Qora", hex: "#000000" },
    ],
    description: "Yomg‘ir va notekis yo‘llar uchun bardoshli trekking botinka.",
    fullDescription:
      "Titan Trail Boot og‘ir sharoitlar uchun yaratilgan. Suvga chidamli yuza va chuqur protektorli taglik har qanday yuzada ishonchli ilashishni ta'minlaydi. Issiq ichki qatlam sovuq kunlarda ham qulaylik beradi.",
  },
  {
    slug: "cloud-knit-runner",
    name: "Cloud Knit Runner",
    brand: "STEP Sport",
    category: "sneakers",
    gender: "ayollar",
    price: 999000,
    rating: 4.7,
    reviewsCount: 158,
    isNew: true,
    stock: 18,
    material: "Trikotaj (knit)",
    sole: "Ko‘pikli yengil taglik",
    style: "Casual / Sport",
    season: "Barcha mavsum",
    colors: [
      { name: "Sut oq", hex: "#f4f1ea" },
      { name: "Sariq", hex: "#eed982" },
    ],
    description: "Bulutdek yengil trikotaj krossovka kundalik yurish uchun.",
    fullDescription:
      "Cloud Knit Runner elastik trikotaj yuzasi bilan oyoqqa ideal o‘tiradi. Ko‘pikli taglik har qadamni yumshatadi va butun kun davomida yengillik hissini beradi.",
  },
  {
    slug: "metro-court",
    name: "Metro Court",
    brand: "STEP Studio",
    category: "classic",
    gender: "unisex",
    price: 1149000,
    rating: 4.6,
    reviewsCount: 121,
    isNew: false,
    stock: 20,
    material: "Tabiiy teri",
    sole: "Klassik rezina",
    style: "Court / Classic",
    season: "Barcha mavsum",
    colors: [
      { name: "Oq", hex: "#f4f1ea" },
      { name: "Qora", hex: "#000000" },
    ],
    description: "Minimalistik court uslubidagi ko‘p qirrali teri krossovka.",
    fullDescription:
      "Metro Court retro court dizaynini zamonaviy qulaylik bilan birlashtiradi. Toza chiziqlar va sifatli teri uni har kunlik hamda yarim rasmiy uslubga mos qiladi.",
  },
  {
    slug: "blaze-court-sport",
    name: "Blaze Court Sport",
    brand: "STEP Sport",
    category: "sport",
    gender: "unisex",
    price: 1049000,
    oldPrice: 1249000,
    rating: 4.5,
    reviewsCount: 143,
    isNew: false,
    stock: 17,
    material: "Sintetik teri va mesh",
    sole: "Chidamli rezina",
    style: "Sport / Court",
    season: "Barcha mavsum",
    description: "Zal va ochiq maydon o‘yinlari uchun chaqqon sport poyabzali.",
    fullDescription:
      "Blaze Court Sport tez harakatlar uchun mo‘ljallangan. Kuchaytirilgan yon qismlar lateral harakatlarda barqarorlik beradi, chidamli taglik esa uzoq muddat xizmat qiladi.",
  },
  {
    slug: "nova-slip-on",
    name: "Nova Slip-On",
    brand: "STEP Studio",
    category: "casual",
    gender: "ayollar",
    price: 699000,
    rating: 4.4,
    reviewsCount: 88,
    isNew: false,
    stock: 24,
    material: "Kanvas",
    sole: "Yumshoq rezina",
    style: "Casual / Slip-on",
    season: "Bahor / Yoz",
    colors: [
      { name: "Bej", hex: "#e9ce98" },
      { name: "Oq", hex: "#f4f1ea" },
    ],
    description: "Bog‘ichsiz, oson kiyiladigan yengil kundalik krossovka.",
    fullDescription:
      "Nova Slip-On bog‘ichsiz dizayni bilan tezkor kiyish imkonini beradi. Yengil kanvas materiali va moslashuvchan taglik uni yoz kunlari uchun ideal tanlovga aylantiradi.",
  },
  {
    slug: "ranger-chelsea-boot",
    name: "Ranger Chelsea Boot",
    brand: "STEP Heritage",
    category: "boots",
    gender: "ayollar",
    price: 1699000,
    rating: 4.8,
    reviewsCount: 65,
    isNew: false,
    stock: 9,
    material: "Tabiiy teri",
    sole: "Rezina platforma",
    style: "Chelsea / Classic",
    season: "Kuz / Qish",
    colors: [
      { name: "Qora", hex: "#000000" },
      { name: "Jigarrang", hex: "#5a3a22" },
    ],
    description: "Elastik yon qismli nafis Chelsea botinka har kungi uslub uchun.",
    fullDescription:
      "Ranger Chelsea Boot klassik Chelsea siluetini zamonaviy platforma taglik bilan uyg‘unlashtiradi. Elastik yon qismlar kiyishni osonlashtiradi va oyoqqa mukammal o‘tiradi.",
  },
  {
    slug: "pulse-flyknit",
    name: "Pulse Flyknit",
    brand: "STEP Sport",
    category: "sneakers",
    gender: "erkaklar",
    price: 1349000,
    rating: 4.9,
    reviewsCount: 176,
    isNew: true,
    stock: 14,
    material: "Flyknit trikotaj",
    sole: "Reaktiv ko‘pik",
    style: "Sport / Lifestyle",
    season: "Barcha mavsum",
    colors: [
      { name: "Grafit", hex: "#323232" },
      { name: "Oltin", hex: "#c49c4d" },
    ],
    description: "Reaktiv taglikli zamonaviy flyknit krossovka energiya qaytaradi.",
    fullDescription:
      "Pulse Flyknit reaktiv ko‘pik taglik bilan har qadamda energiyani qaytaradi. Bir butun flyknit yuzasi ikkinchi teri kabi o‘tiradi va maksimal nafas olishni ta'minlaydi.",
  },
  {
    slug: "heritage-oxford",
    name: "Heritage Oxford",
    brand: "STEP Heritage",
    category: "classic",
    gender: "erkaklar",
    price: 1899000,
    rating: 4.9,
    reviewsCount: 58,
    isNew: false,
    stock: 5,
    material: "Sayqallangan tabiiy teri",
    sole: "Charm + rezina",
    style: "Formal / Oxford",
    season: "Barcha mavsum",
    colors: [
      { name: "Qora", hex: "#000000" },
      { name: "To‘q jigarrang", hex: "#3a2416" },
    ],
    description: "Rasmiy tadbirlar uchun premium Oxford teri tuflilar.",
    fullDescription:
      "Heritage Oxford eng nafis rasmiy uslub uchun qo‘lda sayqallangan tabiiy teridan tayyorlangan. Klassik Oxford bog‘lash tizimi va nozik tikuvlar uni haqiqiy premium poyabzalga aylantiradi.",
  },
]

export const PRODUCTS: Product[] = SEEDS.map((s, i) => {
  const discount = discountPct(s.price, s.oldPrice)
  return {
    id: `p${i + 1}`,
    slug: s.slug,
    name: s.name,
    brand: s.brand,
    category: s.category,
    categoryLabel: CATEGORY_LABELS[s.category],
    gender: s.gender,
    price: s.price,
    oldPrice: s.oldPrice,
    discount,
    description: s.description,
    fullDescription: s.fullDescription,
    images: [img(s.slug, 1), img(s.slug, 2)],
    sizes: s.sizes ?? COMMON_SIZES,
    colors: s.colors,
    rating: s.rating,
    reviewsCount: s.reviewsCount,
    isNew: s.isNew,
    stock: s.stock,
    sku: `STEP-${(1000 + i + 1).toString()}`,
    material: s.material,
    sole: s.sole,
    style: s.style,
    season: s.season,
    country: "Vetnam",
  }
})

export function getAllProducts(): Product[] {
  return PRODUCTS
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getFeaturedProducts(): Product[] {
  // Prefer discounted + new, fall back to top rated.
  return [...PRODUCTS]
    .sort((a, b) => {
      const score = (p: Product) =>
        (p.discount ? 2 : 0) + (p.isNew ? 1 : 0) + p.rating / 10
      return score(b) - score(a)
    })
    .slice(0, 4)
}

export function getNewArrivals(): Product[] {
  const news = PRODUCTS.filter((p) => p.isNew)
  const rest = PRODUCTS.filter((p) => !p.isNew)
  return [...news, ...rest].slice(0, 8)
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  const sameCategory = PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.category === product.category,
  )
  const others = PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.category !== product.category,
  )
  return [...sameCategory, ...others].slice(0, count)
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return PRODUCTS.filter((p) => {
    const haystack = [
      p.name,
      p.brand,
      p.categoryLabel,
      p.category,
      GENDER_LABELS[p.gender],
      p.style,
      p.description,
    ]
      .join(" ")
      .toLowerCase()
    return haystack.includes(q)
  })
}

export const PRICE_BOUNDS = {
  min: Math.min(...PRODUCTS.map((p) => p.price)),
  max: Math.max(...PRODUCTS.map((p) => p.price)),
}
