# PCB Indonesia — Website Requirements

## Objective
Build a premium, production-ready corporate website for **PCB Indonesia**, a PCB manufacturing and electronics solutions company in Indonesia. Use `ui.png` as the primary visual reference. Do not copy it pixel-for-pixel; use its design language.

## Stack
- Astro + React + TypeScript + Tailwind CSS
- Astro-first architecture; **do not build a React SPA**.
- Static/server-render important content with Astro for SEO and performance.
- React only for interactive islands: mobile menu, search, language switcher, blog filter, industry selector, quote/contact/newsletter forms, galleries where needed.
- Prefer `client:visible` for below-fold interactive islands and avoid unnecessary JavaScript.

Recommended structure:
```text
src/
├── components/
│   ├── Header.astro
│   ├── Footer.astro
│   ├── SEO.astro
│   ├── Button.astro
│   ├── SectionHeader.astro
│   ├── ProductCard.astro
│   ├── BlogCard.astro
│   ├── IndustryCard.astro
│   ├── CapabilityCard.astro
│   ├── ProcessStep.astro
│   ├── Stats.astro
│   ├── CTA.astro
│   ├── Breadcrumb.astro
│   └── react/
│       ├── MobileMenu.tsx
│       ├── Search.tsx
│       ├── LanguageSwitcher.tsx
│       ├── BlogFilter.tsx
│       ├── IndustrySelector.tsx
│       ├── QuoteForm.tsx
│       ├── ContactForm.tsx
│       └── NewsletterForm.tsx
├── layouts/
│   ├── BaseLayout.astro
│   ├── PageLayout.astro
│   └── BlogLayout.astro
├── pages/
│   ├── index.astro
│   ├── products/
│   ├── capabilities/
│   ├── industries/
│   ├── blog/
│   ├── about/
│   ├── contact/
│   └── quote/
├── content/blog/
├── data/
│   ├── products.ts
│   ├── industries.ts
│   ├── capabilities.ts
│   ├── navigation.ts
│   ├── site.ts
│   └── images.ts
└── styles/global.css
```

## SEO
SEO is a top priority. Use semantic HTML (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`). Every page needs a unique title, meta description, canonical, Open Graph/Twitter metadata, correct heading hierarchy, descriptive alt text, SEO-friendly URL and internal links.

Create reusable `SEO.astro` supporting `title`, `description`, `canonical`, `image`, `type`, and `keywords`.

Implement JSON-LD for:
- Organization
- Product/service where appropriate
- Article
- Breadcrumb

Generate sitemap and robots.txt. Keep important content in initial Astro HTML. Do not hide SEO-critical content behind React.

## Brand
**PCB Indonesia**

Tagline: **Connect Ideas. Build Tomorrow.**

Hero message: **Turning Ideas Into Real Solutions**

Alternative: **From Ideas to Real Products**

Supporting copy: “High-quality PCB fabrication and assembly services for innovators, businesses, and industries across Indonesia.”

Position the company as a professional PCB manufacturing and electronics technology partner, not simply a PCB supplier.

## Design System
Style: minimalist, premium, industrial-tech, editorial, enterprise-ready.

Visual language:
- Lots of whitespace
- Clean grid
- Strong editorial typography
- Inter, Geist, or similar modern sans-serif
- White/off-white background
- Dark navy/black text
- PCB green accent
- Very subtle borders
- Soft shadows
- Restrained rounded corners
- Premium product/manufacturing photography
- Subtle gradients only where useful
- Large image compositions
- Minimal line icons
- Smooth, subtle interactions

Colors:
- Primary green `#087F5B`
- Dark `#101828`
- Background `#F8FAF9`
- White `#FFFFFF`
- Secondary gray `#667085`
- Border `#E4E7EC`

Use CSS variables/design tokens. Avoid generic corporate templates, cheap Bootstrap styling, excessive gradients, excessive glassmorphism, excessive colorful UI, excessive rounded SaaS cards, and animation-heavy layouts.

## Navigation
Sticky premium navbar:
- Logo: PCB Indonesia
- Home
- Products
- Capabilities
- Industries
- Resources
- About
- Contact
- Search
- EN / ID
- **Get a Quote →**

On scroll add subtle backdrop blur, border/shadow and compact height. Mobile uses a React hamburger menu.

## Homepage

### Hero
Eyebrow: **INDONESIA'S TRUSTED PCB MANUFACTURING PARTNER**

Headline:
**Turning Ideas Into**  
**Real Solutions**

Highlight “Real Solutions” in PCB green.

Copy: “High-quality PCB fabrication and assembly services for innovators, businesses, and industries across Indonesia.”

Buttons: **Get a Quote →**, **Explore Products**

Four value propositions:
1. High Quality — Reliable & certified
2. Fast Turnaround — From prototype to production
3. Local Support — Based in Indonesia
4. Competitive Pricing — Best value for your project

Right side: large premium PCB close-up. Add floating card:
**Proudly Supporting Indonesia's Innovation**

### Introducing
Eyebrow: **INTRODUCING**

Headline:
**More Than Just PCBs.**  
**We Build Possibilities.**

Copy: “PCB Indonesia is a local manufacturing partner committed to providing reliable, high-quality, and cost-effective PCB solutions. We combine modern technology, experienced teams, and a strong local supply chain to help bring your ideas to life.”

CTA: **Our Story →**

Use an electronics factory image and overlay:
**Local Manufacturing / Global Standards**
“Supporting a stronger electronics ecosystem in Indonesia.”

Placeholder stats (centralize them in data):
- 5+ Years of Experience
- 500+ Projects Completed
- 99.8% Quality Target
- 100% Local Support

Treat these as editable marketing placeholders, not verified claims.

### Products & Services
Eyebrow: **WHAT WE DO**
Heading: **Our Products & Services**
Subtitle: “Complete PCB manufacturing solutions tailored to your needs.”

Four cards:
1. **PCB Fabrication** — High precision PCB manufacturing with various materials and layer configurations.
2. **PCB Assembly (PCBA)** — One-stop PCBA services with quality control and testing.
3. **PCB Design Support** — Engineering support for schematic, layout, and design optimization.
4. **Prototype & Custom PCB** — From small-batch prototypes to high-volume production.

Cards: 16:10 image, restrained rounded corners, subtle border, image zoom on hover, arrow movement, clean typography. Render from `src/data/products.ts`.

### Capabilities
Eyebrow: **OUR CAPABILITIES**
Heading: **Built for Precision. Ready for Production.**

Capabilities:
- PCB Fabrication
- Multilayer PCB
- HDI PCB
- Flexible PCB
- PCB Assembly
- SMT Assembly
- THT Assembly
- Prototype Manufacturing
- Quality Inspection
- Functional Testing

Dark/green premium section with subtle PCB circuit pattern and minimal icons. Do not overcrowd.

### Industries
Eyebrow: **INDUSTRIES WE SERVE**
Heading: **Powering Innovation Across Industries**
Copy: “From startups to large enterprises, our PCB solutions help turn ideas into real-world impact.”

Industries:
- Consumer Electronics
- Industrial Automation
- IoT & Smart Devices
- Automotive
- Telecommunications
- Medical Devices
- Renewable Energy

Use icons, short descriptions and a subtle active/hover interaction. Create detail pages for each industry.

### Process
Eyebrow: **HOW IT WORKS**
Heading: **From Concept to Production**

1. **Get a Quote** — Share your project requirements with our team.
2. **Design & Review** — We review your design and optimize it for production.
3. **Manufacturing** — High-precision production with strict quality control.
4. **Testing & Delivery** — Fully tested and delivered to your doorstep.

Connect steps with a thin line and green numbered circles. Add CTA: **Ready to start your project?** / “Get a quote today and let's build something great together.” / **Get a Quote →**

### Why PCB Indonesia
Heading: **Why Build With PCB Indonesia?**

Four benefits:
- **Engineering Expertise** — Experienced technical team and manufacturing support.
- **Quality First** — Strict quality control throughout the manufacturing process.
- **Local Advantage** — Local communication, support, and supply chain.
- **Scalable Production** — From prototype quantities to production-scale requirements.

Editorial layout, large typography, whitespace and minimal icons.

### Blog Preview
Eyebrow: **INSIGHTS & UPDATES**
Heading: **Latest from Our Blog**
Subtitle: “Insights, guides, and stories from the world of PCB and electronics.”

Feature three cards:
1. Technology — **How to Choose the Right PCB Material for Your Project**
2. Manufacturing — **PCB Assembly Process: From Soldering to Final Testing**
3. Sustainability — **Sustainable Electronics: A Greener Future with Better PCB Practices**

Use editorial cards and **View All Articles →**.

### Final CTA
Use subtle green background.
Heading: **Let's Build a Smarter, More Connected Indonesia**
Subtitle: “Partner with PCB Indonesia for reliable, high-quality PCB solutions.”
Buttons: **Get a Quote →**, **Contact Us**

## Product Pages
Routes:
- `/products`
- `/products/pcb-fabrication`
- `/products/pcb-assembly`
- `/products/pcb-design`
- `/products/prototype-custom-pcb`

Prefer `src/pages/products/[slug].astro` with data from `src/data/products.ts`.

Each detail page:
- Breadcrumb
- Hero
- Overview
- Capabilities
- Specifications
- Applications
- Benefits
- Process
- FAQ
- CTA
- Related products

Generate statically.

## Industry Pages
Routes:
- `/industries`
- `/industries/consumer-electronics`
- `/industries/industrial-automation`
- `/industries/iot`
- `/industries/automotive`
- `/industries/telecommunications`
- `/industries/medical`
- `/industries/renewable-energy`

Use data-driven rendering and dedicated SEO metadata.

## Blog
Use **Astro Content Collections** with MDX.

Directory:
```text
src/content/blog/
```

Example:
```yaml
---
title: "How to Choose the Right PCB Material for Your Project"
description: "Learn the key factors in selecting PCB materials for reliability, performance, and cost efficiency."
pubDate: 2026-09-12
category: "Technology"
author: "PCB Indonesia"
featuredImage: "/images/blog/pcb-material.jpg"
tags:
  - PCB
  - Electronics
  - Engineering
---
```

Create:
- `/blog`
- `/blog/[slug]`

Blog categories:
- All
- Technology
- Manufacturing
- Engineering
- Industry
- Sustainability

Use a React `BlogFilter.tsx` island for filtering, while the initial article content remains statically rendered by Astro.

Article pages need:
- Breadcrumb
- Category
- Published date
- H1
- Description
- Featured image
- Article content
- Related articles
- CTA
- Article JSON-LD
- Canonical
- OG metadata
- Author/date/tags

Readable editorial typography: roughly 65–75 characters per line, 1.6–1.8 line-height, clear H2/H3 hierarchy.

Example articles:
- `/blog/how-to-choose-pcb-material`
- `/blog/pcb-assembly-process`
- `/blog/sustainable-electronics`

## Resources
Resources dropdown:
- Blog
- PCB Guides
- FAQ
- Downloads

Keep architecture extensible.

## About
Route `/about`.
Hero: **Building Indonesia's Electronics Future**
Sections: company introduction, mission, vision, values, manufacturing philosophy, quality commitment, local ecosystem, CTA.

## Contact
Route `/contact`.
Hero: **Let's Talk About Your Project**
Include email, phone, address, business hours and form:
- Name
- Company
- Email
- Phone
- Project Type
- Message

Use React for interaction/validation only. No backend required initially; keep API-ready.

## Get a Quote
Route `/quote`.
Fields:
- Full Name
- Company
- Email
- Phone
- PCB Type
- Quantity
- Number of Layers
- PCB Material
- Assembly Required
- Target Delivery
- Upload Gerber / PCB Files
- Additional Requirements

Button: **Request a Quote →**

Provide loading, validation, success and error states. No backend required initially.

## Images
For the initial implementation, use relevant **Unsplash** photography rather than generic placeholders.

Search concepts:
- PCB circuit board electronics
- electronics manufacturing factory
- circuit board manufacturing
- electronics soldering
- PCB assembly
- electronics engineering
- industrial electronics
- sustainable electronics

Prefer close-up PCB, electronics, engineering and factory imagery. Do not use generic office/business stock photos.

Centralize image references in `src/data/images.ts` so company-owned images can replace them later.

If external Unsplash URLs are used, structure the data so they are easy to replace. Optimize image loading and provide dimensions/alt text.

## Footer
Premium footer with:

PCB Indonesia
**Connect Ideas. Build Tomorrow.**
“Empowering innovation through high-quality PCB manufacturing. One Board at a Time.”

Quick Links: Home, Products, Capabilities, Industries, Blog, About, Contact

Services: PCB Fabrication, PCB Assembly, PCB Design, Prototype, Custom PCB

Company: About Us, Capabilities, Quality, Careers, Contact

Social: LinkedIn, YouTube, Instagram, X

Newsletter: **Subscribe to Our Newsletter** / “Get the latest updates, insights, and electronics industry news.”

Bottom: © 2026 PCB Indonesia. All rights reserved. Privacy Policy, Terms of Service, Sitemap.

## Performance
Target excellent Lighthouse performance and Core Web Vitals.

- Astro static generation wherever possible
- Minimal JS
- React only for interactions
- Lazy-load below-fold images
- Responsive images
- Correct image dimensions
- Avoid layout shift
- Optimize fonts
- Preload only critical assets
- Avoid huge dependencies
- Prefer CSS transitions for simple effects
- Use `client:visible` where appropriate

## Accessibility
Use WCAG-friendly practices:
- Semantic HTML
- Keyboard navigation
- Visible focus states
- Accessible buttons
- Accessible forms and labels
- Proper alt text
- Good contrast
- Reduced-motion support via `prefers-reduced-motion`

## Responsive Design
Desktop:
- 1200–1280px max content width
- Large whitespace
- 4-column product grid
- 3-column blog grid

Tablet:
- 2-column grids
- Reduced typography and spacing

Mobile:
- Hamburger menu
- Single-column cards
- Vertical hero
- Full-width CTAs where appropriate
- Intentional mobile spacing and typography

Do not merely shrink desktop layouts.

## Micro Interactions
Use subtle premium interactions.

Page load:
- Hero text reveal
- Image reveal
- CTA fade
- Staggered value props

Scroll:
- Section fade-up
- Image reveal
- Optional number counter

Hover:
- Product image zoom
- Card lift 2–4px
- Arrow moves slightly
- Button transitions
- Nav underline animation

Keep animations subtle and respect reduced motion. Do not turn the website into an animation showcase.

## Component Reuse
Create reusable components such as:
```text
<Button />
<SectionHeader />
<ProductCard />
<BlogCard />
<IndustryCard />
<CapabilityCard />
<ProcessStep />
<Stats />
<CTA />
<Breadcrumb />
<SEO />
```

Use data-driven rendering instead of duplicated markup.

## Data Architecture
Keep content separate from UI:
```text
src/data/
├── products.ts
├── industries.ts
├── capabilities.ts
├── navigation.ts
├── site.ts
└── images.ts
```

Do not hardcode repeated company information in components. Keep the project ready for future CMS/API integration.

## Internationalization
Prepare for:
- ID
- EN

Indonesian is the primary market language. Keep localization scalable without duplicating the whole application.

## URL Structure
Use clean URLs:
```text
/
/products
/products/pcb-fabrication
/products/pcb-assembly
/products/pcb-design
/products/prototype-custom-pcb
/capabilities
/industries
/industries/consumer-electronics
/industries/industrial-automation
/industries/iot
/industries/automotive
/industries/telecommunications
/industries/medical
/industries/renewable-energy
/blog
/blog/[slug]
/about
/contact
/quote
```

Avoid query-based content URLs such as `/product?id=123`.

## 404
Create a premium 404 page.

Heading: **Looks Like This Board Isn't Connected.**

Description: “The page you're looking for doesn't exist or may have moved.”

Buttons: **Back to Home**, **Explore Products**

Use a subtle circuit visual.

## Forms and Security
- Client-side validation
- API-ready architecture
- Loading/success/error states
- Never expose secrets
- Never hardcode API keys
- Use environment variables for future integrations

Potential variables:
```text
PUBLIC_SITE_URL
PUBLIC_API_URL
```

## TypeScript / DX
Use strict TypeScript. Avoid `any` unless absolutely necessary. Use interfaces/types for data.

Verify:
```text
npm run dev
npm run build
```

Before completion ensure:
- No TypeScript errors
- No broken imports
- No missing assets
- No broken routes
- No broken links
- No console errors
- No obvious accessibility errors

## Implementation Priority

### Phase 1 — Foundation
1. Astro setup
2. React integration
3. TypeScript
4. Tailwind
5. Design tokens
6. Layouts
7. Header
8. Footer
9. SEO

### Phase 2 — Homepage
1. Hero
2. Introducing
3. Products
4. Capabilities
5. Industries
6. Process
7. Why PCB Indonesia
8. Blog preview
9. CTA
10. Footer

### Phase 3 — Content
1. Products listing
2. Product detail
3. Capabilities
4. Industries
5. Industry detail
6. About

### Phase 4 — Blog
1. Content Collection
2. Blog listing
3. Blog filter
4. Blog detail
5. Article schema
6. Related articles

### Phase 5 — Conversion
1. Contact
2. Quote
3. Validation
4. Success/error states

### Phase 6 — SEO & Performance
1. Metadata
2. JSON-LD
3. Sitemap
4. Robots
5. Canonicals
6. Open Graph
7. Image optimization
8. Lighthouse optimization
9. Accessibility review

### Phase 7 — QA
Verify desktop, tablet, mobile, SEO, performance, accessibility, navigation, forms, blog, products, industries and 404.

## Final Non-Negotiable Rule
**DO NOT BUILD THIS AS A REACT SPA.**

Astro is the primary framework. The preferred rendering model is:
```text
Astro Static HTML
      ↓
SEO-friendly
      ↓
Fast initial load
      ↓
React Islands only where interaction is required
```

Prioritize:
**Design Quality → SEO → Performance → Accessibility → Reusability → Maintainability.**

The final result should look credible enough for enterprise clients, engineering teams, procurement teams, IoT/electronics companies, startups and industrial customers. It must look like a premium Indonesian technology/manufacturing company, not a generic WordPress or Bootstrap corporate website.
