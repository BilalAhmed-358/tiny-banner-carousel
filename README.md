# tiny-banner-carousel

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
