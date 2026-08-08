# tiny-banner-carousel

[![npm version](https://img.shields.io/npm/v/tiny-banner-carousel?style=flat-square&color=2563eb)](https://www.npmjs.com/package/tiny-banner-carousel)
[![npm downloads](https://img.shields.io/npm/dm/tiny-banner-carousel?style=flat-square&color=2563eb)](https://www.npmjs.com/package/tiny-banner-carousel)
[![minified + gzip](https://img.shields.io/bundlephobia/minzip/tiny-banner-carousel?style=flat-square&label=minzip)](https://bundlephobia.com/package/tiny-banner-carousel)
[![license](https://img.shields.io/badge/license-MIT-16a34a?style=flat-square)](./LICENSE)
[![React 18 and 19](https://img.shields.io/badge/React-18%20%7C%2019-149eca?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A lightweight banner carousel for React with responsive images, autoplay,
pointer gestures, and keyboard navigation. Use the styled component for a fast
start or the headless hook when you want complete control over the markup.

[Live demo](https://bilalahmed-358.github.io/tiny-banner-carousel/) ·
[Demo source and guide](./demo/README.md) ·
[npm package](https://www.npmjs.com/package/tiny-banner-carousel)

## Why tiny-banner-carousel?

- Zero runtime dependencies; React remains a peer dependency.
- Responsive images through native `picture` and `source` elements.
- Touch, pen, mouse, and keyboard navigation.
- Autoplay that pauses during hover, focus, and pointer interaction.
- Lazy loading for non-priority banners.
- Looping, indicators, timing, and swipe thresholds are configurable.
- CSS custom properties make the default component easy to theme.
- `useCarousel` provides the same behavior without prescribing any markup.
- ESM, CommonJS, and TypeScript declarations are included.

## Installation

```bash
npm install tiny-banner-carousel
```

## Component usage

Import the component and its small default stylesheet:

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
      onSlideChange={(index, banner) => {
        console.log('Active banner:', index, banner.id);
      }}
    />
  );
}
```

### Banner data

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string \| number` | Yes | Stable key for the banner. |
| `src` | `string` | Yes | Default or desktop image URL. |
| `alt` | `string` | Yes | Accessible image description. |
| `mobileSrc` | `string` | No | Image selected below `mobileBreakpoint`. |
| `href` | `string` | No | Makes the banner a link. |
| `target` | anchor target | No | Link target such as `_blank`. |
| `rel` | `string` | No | Link relationship. `_blank` receives safe defaults. |
| `width` | `number` | No | Intrinsic image width. Recommended to prevent layout shift. |
| `height` | `number` | No | Intrinsic image height. Recommended to prevent layout shift. |

### Component props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `banners` | `readonly Banner[]` | — | Banners displayed by the carousel. |
| `ariaLabel` | `string` | `"Banner carousel"` | Accessible name for the carousel region. |
| `autoPlay` | `boolean` | `true` | Advances banners automatically. |
| `autoPlayInterval` | `number` | `5000` | Time between automatic transitions in milliseconds. |
| `initialIndex` | `number` | `0` | Banner selected on the initial render. |
| `loop` | `boolean` | `true` | Wraps navigation at either end. |
| `swipeThreshold` | `number` | `50` | Horizontal distance required for a swipe. |
| `showIndicators` | `boolean` | `true` | Displays the indicator buttons. |
| `pauseOnHover` | `boolean` | `true` | Pauses autoplay while hovered. |
| `pauseOnFocus` | `boolean` | `true` | Pauses autoplay while focus is inside. |
| `mobileBreakpoint` | `number` | `768` | Maximum width used for `mobileSrc`. |
| `eagerLoadCount` | `number` | `1` | Number of initial images loaded eagerly. |
| `className` | `string` | — | Additional class for the carousel root. |
| `style` | `CSSProperties` | — | Inline styles for the carousel root. |
| `onSlideChange` | `(index, banner) => void` | — | Called after the active banner changes. |
| `onBannerClick` | `(banner, index, event) => void` | — | Observes or intercepts banner clicks. |
| `renderBanner` | `(banner, context) => ReactNode` | — | Replaces the default responsive image renderer. |

## Headless usage

`useCarousel` contains the navigation, autoplay, looping, and pointer-gesture
behavior without rendering anything. Attach the returned handlers to your own
gesture surface and render the active item however you like.

```tsx
import { useCarousel } from 'tiny-banner-carousel';

const slides = [
  { id: 1, title: 'Fast by default', body: 'No animation framework required.' },
  { id: 2, title: 'Your markup', body: 'Render cards, images, or anything else.' },
  { id: 3, title: 'Input aware', body: 'Pointer and keyboard controls included.' },
];

export function CustomCarousel() {
  const {
    currentIndex,
    isPaused,
    nextSlide,
    prevSlide,
    goToSlide,
    pause,
    resume,
    handlePointerDown,
    handlePointerUp,
    handlePointerCancel,
  } = useCarousel({
    itemCount: slides.length,
    autoPlay: true,
    autoPlayInterval: 4000,
    loop: true,
    swipeThreshold: 50,
  });

  const activeSlide = slides[currentIndex];

  return (
    <section aria-label="Product highlights" aria-roledescription="carousel">
      <article
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        aria-live="polite"
      >
        <h2>{activeSlide.title}</h2>
        <p>{activeSlide.body}</p>
      </article>

      <button type="button" onClick={prevSlide} aria-label="Previous slide">
        Previous
      </button>

      {slides.map((slide, index) => (
        <button
          type="button"
          key={slide.id}
          onClick={() => goToSlide(index)}
          aria-current={currentIndex === index ? 'true' : undefined}
        >
          {index + 1}
        </button>
      ))}

      <button type="button" onClick={nextSlide} aria-label="Next slide">
        Next
      </button>

      <button type="button" onClick={isPaused ? resume : pause}>
        {isPaused ? 'Resume autoplay' : 'Pause autoplay'}
      </button>
    </section>
  );
}
```

### Hook options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `itemCount` | `number` | — | Number of items controlled by the hook. |
| `autoPlay` | `boolean` | `true` | Enables automatic navigation. |
| `autoPlayInterval` | `number` | `5000` | Autoplay interval in milliseconds. |
| `initialIndex` | `number` | `0` | Initial active index. |
| `loop` | `boolean` | `true` | Wraps navigation at the boundaries. |
| `swipeThreshold` | `number` | `50` | Required horizontal pointer movement. |

The hook returns the current index, navigation methods, pause controls,
interaction state, and pointer handlers. All functions are stable React
callbacks and can be attached directly to your components.

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

```tsx
<BannerCarousel className="my-carousel" banners={banners} />
```

## Custom banner rendering

By default, `BannerCarousel` renders each banner with native `picture` and
`img` elements. The `renderBanner` prop lets you replace only that image
markup. The carousel still handles navigation, autoplay, gestures, indicators,
and slide state.

For example, a Next.js application can render banners with `next/image`:

```tsx
import Image from 'next/image';
import { BannerCarousel } from 'tiny-banner-carousel';

<BannerCarousel
  banners={banners}
  renderBanner={(banner, { eager, isActive }) => (
    <Image
      src={banner.src}
      alt={banner.alt}
      width={banner.width ?? 1440}
      height={banner.height ?? 420}
      loading={eager ? 'eager' : 'lazy'}
      sizes="100vw"
      style={{ width: '100%', height: 'auto' }}
      data-active={isActive || undefined}
    />
  )}
/>
```

The callback receives the current `banner` and a context containing its
`index`, whether it is active, and whether it should be loaded eagerly.

## Accessibility

- The carousel is exposed as a labelled region with carousel semantics.
- Each slide receives its position and total count.
- Inactive linked slides are removed from keyboard navigation.
- Arrow keys, Home, End, indicators, and pointer gestures are supported.
- Autoplay pauses while the carousel is hovered, focused, or being dragged.
- Reduced-motion preferences disable transition animation in the default CSS.

Give every banner meaningful `alt` text and provide an `ariaLabel` that
describes the carousel's purpose on the page.

## Demo and local development

Explore the [interactive demo](https://bilalahmed-358.github.io/tiny-banner-carousel/)
or run it locally from the repository root:

```bash
npm install
npm run build
npm install --prefix demo
npm --prefix demo run dev
```

## Author

Created and maintained by [Bilal Ahmed](https://www.linkedin.com/in/ahmedkhanbilal/).
You can also find me on [GitHub](https://github.com/BilalAhmed-358).

## License

[MIT](./LICENSE)
