# STUDIO J. - Design System & Architecture

## 1. Vibe & Concept
- **Theme:** Extreme controlled minimalism (Chanel) combined with editorial storytelling (29CM).
- **Core Philosophy:** Whitespace is not empty space; it is the core design element.

## 2. Color Palette (Monochrome Contrast)
- **Primary:** `#1D1D1D` (Deep Black - used for primary text, borders, and solid buttons)
- **Background:** `#FFFFFF` (Pure White - used for all backgrounds to maximize contrast)
- **Accent/Muted:** `#333333` to `#888888` (Dark to Mid Grey - used for secondary text, borders, and subtle hover states)

## 3. Typography
- **Headings / Brand Authority:** `Playfair Display` (Serif) - Used for massive headlines, editorial titles, and the logo.
- **Body / UI Interaction:** `Inter` (Sans-serif) - Used for product descriptions, navigation links, buttons, and micro-copy. High legibility.

## 4. Layout & Spacing
- **Padding/Margin:** Use massive padding (e.g., `py-24`, `py-32`) between sections to create visual breathing room.
- **Grid:** Asymmetric Bento Grid for product listings, breaking away from standard 4-column layouts.

## 5. Component Tree (Anti-Monolith Architecture)
```text
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx        # Transparent overlay navigation
│   │   ├── Footer.tsx        # Minimalist footer
│   │   └── CartDrawer.tsx    # Slide-out shopping cart
│   ├── home/
│   │   ├── Hero.tsx          # 100vh fullscreen video/image
│   │   ├── Scrollytelling.tsx# Scroll-triggered editorial content
│   │   └── InstagramFeed.tsx # Tiled social images
│   ├── shop/
│   │   ├── BentoGrid.tsx     # Asymmetric product layout
│   │   ├── ProductCard.tsx   # Cross-fade hover product tile
│   │   └── FilterMenu.tsx    # Minimalist dropdown filter
│   ├── product/
│   │   ├── FloatingGallery.tsx # Left side zoomable images
│   │   ├── StickyInfo.tsx    # Right side sticky product details
│   │   └── Accordion.tsx     # Collapsible details (Fit, Care)
│   └── auth/
│       └── AuthModal.tsx     # Overlay login/signup
├── pages/
│   ├── Home.tsx
│   ├── Shop.tsx
│   ├── ProductDetail.tsx
│   └── Editorial.tsx
└── lib/
    ├── db.ts                 # Firebase Firestore logic
    └── firebase.ts           # Firebase initialization
```

## 6. Animation (Framer Motion)
- **Scroll Reveal:** `initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}`
- **Stagger Children:** Used for lists and grids to load items sequentially.
- **Hover:** Subtle scale (`scale: 1.02`) or cross-fade opacity transitions.
