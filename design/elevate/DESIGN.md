---
name: Elevate
colors:
  surface: '#f9f9ff'
  surface-dim: '#d0daf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e8eeff'
  surface-container-high: '#dfe8ff'
  surface-container-highest: '#d9e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#444748'
  inverse-surface: '#273143'
  inverse-on-surface: '#ecf0ff'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c9c6c5'
  secondary: '#436274'
  on-secondary: '#ffffff'
  secondary-container: '#c4e4f9'
  on-secondary-container: '#486778'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#191c1e'
  on-tertiary-container: '#818487'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c9c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#c7e7fc'
  secondary-fixed-dim: '#abcbdf'
  on-secondary-fixed: '#001e2c'
  on-secondary-fixed-variant: '#2b4a5b'
  tertiary-fixed: '#e0e3e6'
  tertiary-fixed-dim: '#c4c7ca'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#44474a'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d9e3fb'
typography:
  display-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 80px
    fontWeight: '800'
    lineHeight: 90px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  display-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 52px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  unit-xs: 4px
  unit-sm: 8px
  unit-md: 16px
  unit-lg: 32px
  unit-xl: 64px
  section-gap: 120px
---

## Brand & Style

This design system embodies the intersection of high-fashion editorial and the serenity of the natural world. It is built for a premium audience that values quiet luxury, technical precision, and an outdoor-inspired lifestyle.

The aesthetic is **Minimalist and Corporate-Modern**, leaning heavily into high-contrast editorial layouts. It utilizes expansive white space to suggest "open skies" and a sense of breathing room. Visual interest is generated through large-scale, architectural typography and high-fidelity photography rather than decorative UI elements. The mood is aspirational, calm, and impeccably organized.

## Colors

The palette is derived from the atmospheric tones of a mountain horizon.
- **Primary (Deep Charcoal):** Used for primary actions, headlines, and essential structural elements. It provides the "architectural" weight.
- **Secondary (Sky Blue):** A soft, desaturated blue used sparingly for highlights, secondary backgrounds, or subtle interactive states.
- **Tertiary (Cloud White/Grey):** The foundation of the UI. This off-white provides a softer alternative to pure white for large surface areas and cards.
- **Neutral (Cool Grey):** Reserved for secondary text, borders, and functional icons to maintain a low-noise environment.
- **Pure White (#FFFFFF):** Used for the primary background to maximize the "clean" feel.

## Typography

The typography strategy relies on a sharp contrast between **Plus Jakarta Sans** for headlines and **Inter** for utility and body content.

- **Headlines:** Set in Plus Jakarta Sans with tight letter-spacing to create a bold, geometric presence. Large display sizes should be used for section transitions and hero areas to mimic high-end magazine layouts.
- **Body:** Inter provides a neutral, highly legible counterpoint.
- **Labels:** Always use uppercase for labels and navigational elements with increased letter-spacing to enhance the premium, "engineered" feel of the brand.

## Layout & Spacing

The system uses a **12-column fluid grid** for desktop and a **4-column grid** for mobile.

- **Generous Gaps:** Section vertical spacing is intentionally large (120px+) to ensure the content never feels crowded.
- **Padding:** Use "unit-lg" (32px) for internal card padding to maintain a feeling of luxury.
- **Alignment:** Content should be centered within a max-width container, but imagery can occasionally "break" the grid or bleed to the edges to create a dynamic, editorial rhythm.

## Elevation & Depth

This design system avoids heavy shadows in favor of **Tonal Layers** and **Subtle Ambient Depth**.

- **Surfaces:** Use the Tertiary color (#F2F4F7) to define container areas against the pure white background. This creates depth without the need for borders.
- **Shadows:** When necessary (e.g., on primary buttons or floating navigation), use a very soft, highly diffused shadow: `0px 4px 20px rgba(0, 0, 0, 0.04)`.
- **Glassmorphism:** Use backdrop blurs (20px+) on navigation bars and quick-view overlays to maintain a sense of lightness and "air."

## Shapes

The shape language is **Sophisticated and Controlled**.
- **Corner Radii:** We use "Soft" roundedness (4px) to retain a crisp, modern architectural edge while avoiding the harshness of 0px corners.
- **Buttons & Inputs:** Follow the base 4px radius.
- **Interactive Elements:** Pill shapes are reserved exclusively for "Status Chips" (e.g., "New Arrival" or "Sold Out") to distinguish them from functional buttons.

## Components

### Buttons
- **Primary:** Solid Charcoal (#0D0D0D) with white text. No border. 4px radius.
- **Secondary:** Ghost style. Transparent background with a 1px Charcoal border.
- **Tertiary/Text:** Uppercase text with a 1px bottom border that expands on hover.

### Input Fields
- Underlined style or subtle 1px borders in Neutral color. Focus states use the Primary color for the border. Labels are always placed above in `label-sm`.

### Cards (Product)
- Backgrounds use Tertiary (#F2F4F7) or soft image backgrounds. 
- Content is bottom-aligned with minimal metadata. 
- Use a "Quick View" text trigger that appears on hover rather than a persistent button.

### Navigation
- A floating "Glass" bar with a white semi-transparent background and 20px blur. 
- Menu items use `label-md` for a clean, professional look.

### Chips/Badges
- Small, uppercase text. Backgrounds should be Primary (Charcoal) for high contrast or Secondary (Sky Blue) for softer categories.