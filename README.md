# tiny-banner-carousel

[![npm version](https://img.shields.io/npm/v/tiny-banner-carousel?style=flat-square&color=2563eb)](https://www.npmjs.com/package/tiny-banner-carousel)
[![npm downloads](https://img.shields.io/npm/dm/tiny-banner-carousel?style=flat-square&color=2563eb)](https://www.npmjs.com/package/tiny-banner-carousel)
[![license](https://img.shields.io/badge/license-MIT-16a34a?style=flat-square)](./LICENSE)
[![React 18 and 19](https://img.shields.io/badge/React-18%20%7C%2019-149eca?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A lightweight banner carousel for React with responsive images, autoplay,
pointer gestures, and keyboard navigation. Use the styled component for a fast
start or the headless hook when you want complete control over the markup.

[Live demo](https://bilalahmed-358.github.io/tiny-banner-carousel/) ·
[API reference](./docs/API.md) ·
[npm package](https://www.npmjs.com/package/tiny-banner-carousel)

## Features

- Zero runtime dependencies; React remains a peer dependency.
- Responsive images through native `picture` and `source` elements.
- Touch, pen, mouse, and keyboard navigation.
- Configurable autoplay, looping, indicators, timing, and swipe thresholds.
- Lazy loading for non-priority banners.
- Styled component and headless hook APIs.
- ESM, CommonJS, and TypeScript declarations.

## Installation

```bash
npm install tiny-banner-carousel
```

## Basic usage

```tsx
import { BannerCarousel, type Banner } from 'tiny-banner-carousel';
import 'tiny-banner-carousel/styles.css';

const banners: Banner[] = [
  {
    id: 'summer',
    src: '/banners/summer-desktop.jpg',
    mobileSrc: '/banners/summer-mobile.jpg',
    alt: 'Explore the summer collection',
    href: '/summer',
    width: 1440,
    height: 420,
  },
  {
    id: 'delivery',
    src: '/banners/delivery-desktop.jpg',
    mobileSrc: '/banners/delivery-mobile.jpg',
    alt: 'Free delivery this weekend',
    href: '/delivery',
    width: 1440,
    height: 420,
  },
];

export function Hero() {
  return (
    <BannerCarousel
      banners={banners}
      autoPlay
      autoPlayInterval={5000}
      ariaLabel="Featured promotions"
    />
  );
}
```

## Headless hook

Use `useCarousel` when you want the behavior without the default markup or
stylesheet.

```tsx
import { useCarousel } from 'tiny-banner-carousel';

const slides = [
  { id: 1, title: 'Fast by default' },
  { id: 2, title: 'Your markup' },
  { id: 3, title: 'Input aware' },
];

export function CustomCarousel() {
  const {
    currentIndex,
    isPaused,
    nextSlide,
    prevSlide,
    pause,
    resume,
    handlePointerDown,
    handlePointerUp,
    handlePointerCancel,
  } = useCarousel({ itemCount: slides.length, autoPlayInterval: 4000 });

  return (
    <section aria-label="Product highlights" aria-roledescription="carousel">
      <article
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        aria-live={isPaused ? 'polite' : 'off'}
      >
        <h2>{slides[currentIndex].title}</h2>
      </article>

      <button type="button" onClick={prevSlide}>Previous</button>
      <button type="button" onClick={isPaused ? resume : pause}>
        {isPaused ? 'Resume autoplay' : 'Pause autoplay'}
      </button>
      <button type="button" onClick={nextSlide}>Next</button>
    </section>
  );
}
```

## Next.js Image

`renderBanner` replaces the default image markup while the component continues
to handle navigation, autoplay, gestures, indicators, and slide state.

```tsx
import Image from 'next/image';
import { BannerCarousel } from 'tiny-banner-carousel';

<BannerCarousel
  banners={banners}
  renderBanner={(banner, { eager }) => (
    <Image
      src={banner.src}
      alt={banner.alt}
      width={banner.width ?? 1440}
      height={banner.height ?? 420}
      loading={eager ? 'eager' : 'lazy'}
      sizes="100vw"
      style={{ width: '100%', height: 'auto' }}
    />
  )}
/>
```

## Styling

Import the default stylesheet and customize it with a class and CSS variables:

```css
.my-carousel {
  --tbc-border-radius: 1rem;
  --tbc-indicator-color: #d1d5db;
  --tbc-indicator-active-color: #2563eb;
  --tbc-transition-duration: 250ms;
}
```

```tsx
<BannerCarousel className="my-carousel" banners={banners} />
```

## Accessibility

The component includes labelled carousel and slide semantics, keyboard
navigation, focus management, drag-safe links, and reduced-motion styles.
Autoplay pauses during hover, focus, and pointer interaction. Provide meaningful
banner `alt` text and an `ariaLabel` that describes the carousel's purpose.

See the [complete API reference](./docs/API.md) for every prop, hook return
value, rendering context, CSS variable, default, and behavior note.

## Author

Created and maintained by [Bilal Ahmed](https://www.linkedin.com/in/ahmedkhanbilal/).
You can also find me on [GitHub](https://github.com/BilalAhmed-358).

## License

[MIT](./LICENSE)
