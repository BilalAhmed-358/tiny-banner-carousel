# tiny-banner-carousel

[![npm version](https://img.shields.io/npm/v/tiny-banner-carousel?style=flat-square&color=2563eb)](https://www.npmjs.com/package/tiny-banner-carousel)
[![npm downloads](https://img.shields.io/npm/dm/tiny-banner-carousel?style=flat-square&color=2563eb)](https://www.npmjs.com/package/tiny-banner-carousel)
[![minified + gzip](https://img.shields.io/bundlephobia/minzip/tiny-banner-carousel?style=flat-square&label=minzip)](https://bundlephobia.com/package/tiny-banner-carousel)
[![license](https://img.shields.io/badge/license-MIT-16a34a?style=flat-square)](./LICENSE)
[![React 18 and 19](https://img.shields.io/badge/React-18%20%7C%2019-149eca?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A lightweight, dependency-free banner carousel for React. It includes autoplay,
pointer and touch gestures, keyboard navigation, responsive images, and a
headless hook for custom rendering.

## Installation

```bash
npm install tiny-banner-carousel
```

## Usage

```tsx
import { BannerCarousel } from 'tiny-banner-carousel';
import 'tiny-banner-carousel/styles.css';

const banners = [
  {
    id: 'summer',
    src: '/banners/summer-desktop.jpg',
    mobileSrc: '/banners/summer-mobile.jpg',
    alt: 'Summer collection',
    href: '/summer',
    width: 1440,
    height: 400,
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

The package also exports `useCarousel` for fully custom interfaces.

## Styling

The default stylesheet uses `tbc-` prefixed classes and CSS custom properties:

```css
.my-carousel {
  --tbc-border-radius: 1rem;
  --tbc-indicator-color: #d1d5db;
  --tbc-indicator-active-color: #2563eb;
  --tbc-transition-duration: 250ms;
}
```

## License

MIT
