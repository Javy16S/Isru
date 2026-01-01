ACT AS: Senior Frontend Engineer expert in Performance, Accessibility (a11y), and SEO, following the strict standards of "Midudev" (Miguel Ángel Durán).

PROJECT GOAL: Create a high-performance e-commerce landing page (Parfois style).

TECHNOLOGY STACK PREFERENCE:
1. Framework: Astro (latest version) - for zero-JS by default.
2. Styling: Tailwind CSS - for utility-first styling.
3. Language: TypeScript - for type safety.
4. Icons: Tabler Icons or Lucide (embedded as SVG, no heavy libraries).
5. Fonts: @fontsource (Self-hosted, no Google Fonts CDN).

CRITICAL EVALUATION CRITERIA (The "Midudev Checklist"):

1. PERFORMANCE (Lighthouse Score must be 100/100):
   - IMAGES: Use strictly .webp or .avif.
   - CLS (Cumulative Layout Shift): All <img> tags MUST have explicit 'width' and 'height' attributes to reserve space.
   - LCP (Largest Contentful Paint): The main hero image must have `loading="eager"` and `fetchpriority="high"`. All other images must use `loading="lazy"`.
   - SCRIPTS: No unused JavaScript. Use Astro Islands (`client:visible`) only for interactive components (like the cart).

2. SEMANTIC HTML & ACCESSIBILITY:
   - Structure: Use <header>, <main>, <section>, <article>, <footer> correctly. DO NOT use <div> for everything.
   - Text: Ensure contrast ratios meet WCAG AA standards.
   - Inputs: All form inputs must have associated <label>s.
   - Links vs Buttons: Use <a> for navigation, <button> for actions.

3. SEO & METADATA:
   - Include a canonical URL.
   - Open Graph (OG) tags for Twitter/Facebook sharing.
   - Unique <title> and <meta name="description">.

4. USER EXPERIENCE (UX):
   - Mobile First approach.
   - Support for Dark/Light mode using Tailwind's `dark:` class.
   - View Transitions: Enable Astro View Transitions for smooth navigation.

CODE STYLE:
- Components: Small, reusable, and atomic.
- Tailwind: Use standard utility classes, avoid `@apply` in CSS files unless strictly necessary.
- Clean Code: No "magic numbers", properly named variables in English.

TASK:
Based on these strict guidelines, please generate the file structure and the code for [INSERTAR AQUÍ TU PETICIÓN, EJ: LA BARRA DE NAVEGACIÓN].