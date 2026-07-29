# Kamadgiri Electronics — Premium Electronics Showroom Website

A **100% static**, premium, fully responsive single-page website for **Kamadgiri Electronics**  
_"Your Trusted Electronics Partner Since 14+ Years"_

Built with **only HTML, CSS and Vanilla JavaScript**.  
No React · No Vue · No Angular · No Tailwind · No Bootstrap · No npm · No build step.

---

## 🚀 Quick Start

1. Download / clone this folder.
2. Double-click `index.html` — it opens directly in any browser.

That's it. No installation, no dependencies, no compilation.

---

## 🌐 Deploy to GitHub Pages

1. Create a new repository (e.g. `Kamadgiri-Electronics`).
2. Upload **all** files, keeping the folder structure intact.
3. Go to **Settings → Pages**.
4. Under *Build and deployment* → **Source**: `Deploy from a branch`.
5. Branch: `main` · Folder: `/ (root)` → **Save**.
6. Your site goes live at `https://<username>.github.io/Kamadgiri-Electronics/`

---

## 📁 Project Structure

```
Kamadgiri-Electronics/
│
├── index.html          # All page markup (13 sections + SEO + JSON-LD)
├── css/
│   └── style.css       # Complete design system & responsive styles
├── js/
│   └── script.js       # All interactions (vanilla JS, no libraries)
├── images/             # All SVG placeholder images (replace with real photos)
│   ├── hero-showroom.svg
│   ├── service-delivery.svg
│   ├── product-tv.svg
│   ├── product-ac.svg
│   ├── product-fridge.svg
│   ├── product-washer.svg
│   ├── product-fan.svg
│   ├── product-microwave.svg
│   ├── product-mixer.svg
│   ├── product-geyser.svg
│   └── gallery-1.svg … gallery-6.svg
├── icons/
│   └── favicon.svg     # Site icon (SVG, crisp on every device)
├── favicon.ico         # Icon fallback file
└── README.md
```

---

## 🧩 Sections Included

1. **Cinematic Hero** — real showroom photography, interactive Edison bulb, floating particles, animated counters, deals ticker
2. **Why Choose Kamadgiri Electronics** — 8 trust cards
3. **Product Categories** — 13 categories with custom inline SVG icons
4. **Featured Products** — filterable cards with offer badges and key highlights
5. **Brand Showcase** — 18 top brands
6. **EMI Section** — finance banner with flexible-finance highlights
7. **Delivery & Installation** — 4-step process + service banner
8. **Gallery** — masonry-style grid with full lightbox (keyboard + swipe)
9. **Customer Reviews** — cards with star ratings
10. **FAQ** — smooth accordion
11. **Contact** — address, phones, email, hours, Google Maps embed, WhatsApp enquiry form
12. **Floating Buttons** — WhatsApp, Call, Back to Top
13. **Footer** — quick links, categories, brands, social media, copyright

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary / ink | `#0B1120` |
| Accent | `#2563EB` → `#60A5FA` |
| Highlight | `#F59E0B` → `#FBBF24` |
| Light background | `#F6F7FB` / `#EEF1F8` |
| Dark background | `#070B14` / `#0B1120` |
| Display font | Poppins |
| Body font | Manrope |

Full **dark & light theming**, gradients, glassmorphism panels, soft floating shadows, magnetic
buttons, 3D tilt cards and cinematic scroll reveals give the site a luxury,
Apple / Sony / Dyson / B&O / Croma-inspired feel.

---

## ✨ Premium Experience Features

- **Cinematic loader** — logo with electric-spark sweep + progress bar
- **Dark / Light mode** toggle (remembers your choice via localStorage)
- **Festive Diwali mode** toggle — floating string lights
- **Interactive Edison bulb** in the hero — auto-lights after 2s, click to switch the whole showroom's warm glow on/off
- **Cinematic hero** — slow camera zoom, floating golden particles, animated grid, staggered text intro
- **Today's Best Deals** ticker
- **Living product cards** — hover reveals tasteful, purposeful micro-animations:
  - TVs → screen reflection sweep + brightness boost
  - Refrigerators → frosty glow + sparkling ice crystals
  - Air Conditioners → downward airflow + temperature counts **30° → 18°**
  - Washing Machines → spinning drum ring
- **Mouse magic** (desktop) — cursor glow, magnetic buttons, 3D tilt cards, ripple clicks
- Sticky glass header + scroll progress bar
- Mobile slide-in navigation with overlay & scroll lock
- Smooth scrolling + scroll-spy active links
- Reveal-on-scroll (fade + scale + blur→sharp), animated counters, staggered reviews
- Infinite brand logo marquee, parallax gallery + lightbox (click, arrows, ESC, swipe)
- Google-styled review cards, animated map pulse
- Single-open FAQ accordion, enquiry form → WhatsApp
- Floating WhatsApp (pulse) / Call / Back-to-Top buttons
- GPU-accelerated transforms, lazy-loaded images, `prefers-reduced-motion` support, print styles

---

## 🔍 SEO Included

- Optimised title, meta description & keywords
- `robots` + canonical URL placeholder
- Open Graph and Twitter Card tags
- **Schema.org `ElectronicsStore` JSON-LD** (address, hours, phone, ratings, offers)
- Semantic HTML5 landmarks, ARIA labels, alt text and a skip link

---

## ✏️ How To Customise

| What | Where |
|------|-------|
| Phone number | Search `9473826875` in `index.html` & `js/script.js` |
| WhatsApp number | Search `wa.me/919473826875` in `index.html` & `js/script.js` |
| Address / email / hours | Contact section + topbar + JSON-LD in `index.html` |
| Google Map | Replace the `<iframe src="…">` in the Contact section (Maps → Share → Embed a map) |
| Canonical & OG URLs | Replace `https://example.com/` in `<head>` |
| Products | `#products` section in `index.html` |
| Product / gallery photos | Replace the image `src` URLs in `index.html`. To go fully offline, download them into `images/` and point the `src` to `images/your-file.jpg` |
| Theme colours | CSS variables at the top of `css/style.css` (`:root` for light, `html[data-theme="dark"]` for dark) |
| Bulb auto-on delay / effects | `js/script.js` (section 15) and `css/style.css` (`.bulb`, `.showroom-glow`) |

> **Note:** Product and gallery photography is loaded from the Pexels CDN (free to use, reliable on
> GitHub Pages). For a 100% self-contained build, download each photo into the `images/` folder and
> update the `src` attributes to local relative paths.

---

## 🧪 Browser Support

Chrome · Edge · Firefox · Safari · Samsung Internet — desktop, laptop, tablet and mobile,
in both portrait and landscape orientation.

---

© Kamadgiri Electronics. All Rights Reserved.
