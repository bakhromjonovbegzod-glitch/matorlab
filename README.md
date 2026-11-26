# MOTORLAB — Avtomobil muhandisligi platformasi

**MOTORLAB** ("Drive. Learn. Explore.") — avtomobillar, dvigatellar va zamonaviy avtomobil texnologiyalarini o‘zbek tilida o‘rganish uchun yaratilgan zamonaviy React + Vite veb-platformasi.

## Asosiy imkoniyatlar

- **Muhandislik dizayni:** To‘q ko‘k va qora rangli asos, elektr-ko‘k va moviy urg‘ular, shishasimon (glassmorphism) kartalar, animatsiyali muhandislik to‘ri hamda tungi/yorug‘ rejim almashinuvi.
- **Avtomobillar katalogi:** O‘zbekiston bozoridagi 7 ta ommabop Chevrolet modeli (Gentra 1.5, Cobalt 1.5, Onix 1.2 Turbo, Tracker 1.2 Turbo, Malibu 2.0 Turbo, Spark 1.25, Nexia 3 1.5) uchun qidiruv, toifa bo‘yicha filtrlash va tasdiqlangan texnik xususiyatlar oynasi.
- **Interaktiv 3D Dvigatel:** Three.js va React Three Fiber yordamida yaratilgan 4 silindrli turbodvigatel modeli — aylantirish, yaqinlashtirish, animatsiyani boshqarish va qismlar yorliqlari bilan.
- **Bilim markazi:** Yangi boshlovchilar uchun sodda o‘zbek tilida 6 ta asosiy muhandislik qo‘llanmasi.
- **Yangiliklar va Aloqa:** Avtomobil texnologiyalari bo‘yicha maqolalar va murojaat formasi.

## Texnologiyalar

- React 19 + Vite
- Three.js (`three`, `@react-three/fiber`, `@react-three/drei`)
- Lucide React (`lucide-react`)

## O‘rnatish va ishga tushirish

```bash
# 1. Bog‘liqliklarni o‘rnatish
npm install

# 2. Dasturlash serverini ishga tushirish
npm run dev

# 3. Ishlab chiqarish (production) uchun yig‘ish
npm run build
```

## Netlify orqali joylashtirish (Deploy)

Loyihada `netlify.toml` fayli tayyorlangan:

1. Loyihani GitHub, GitLab yoki Bitbucket omboriga yuklang.
2. Netlify boshqaruv panelidan **"Add new site" → "Import an existing project"** ni tanlang.
3. Build buyrug‘i: `npm run build`, chiqish papkasi: `dist` (avtomatik `netlify.toml` orqali o‘qiladi).
4. **"Deploy site"** tugmasini bosing.
