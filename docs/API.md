# API reference

Complete reference for `BannerCarousel`, `useCarousel`, banner data, custom
rendering, and the default stylesheet.

[Back to the README](../README.md) ·
[Open the live demo](https://bilalahmed-358.github.io/tiny-banner-carousel/)

## Banner data

Every item passed to `BannerCarousel` follows the `Banner` interface.

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

## BannerCarousel

```tsx
import { BannerCarousel } from 'tiny-banner-carousel';
import 'tiny-banner-carousel/styles.css';

<BannerCarousel banners={banners} />
```

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `banners` | `readonly Banner[]` | — | Banners displayed by the carousel. |
| `ariaLabel` | `string` | `"Banner carousel"` | Accessible name for the carousel region. |
| `autoPlay` | `boolean` | `true` | Advances banners automatically. |
| `autoPlayInterval` | `number` | `5000` | Time between automatic transitions in milliseconds. |
| `initialIndex` | `number` | `0` | Banner selected on the initial render. |
| `loop` | `boolean` | `true` | Wraps navigation at either end. |
| `swipeThreshold` | `number` | `50` | Horizontal distance required for a swipe. |
| `showIndicators` | `boolean` | `true` | Displays indicator buttons. |
| `pauseOnHover` | `boolean` | `true` | Pauses autoplay while hovered. |
| `pauseOnFocus` | `boolean` | `true` | Pauses autoplay while focus is inside. |
| `mobileBreakpoint` | `number` | `768` | Maximum width used for `mobileSrc`. |
| `eagerLoadCount` | `number` | `1` | Number of initial images loaded eagerly. |
| `className` | `string` | — | Additional class for the carousel root. |
| `style` | `CSSProperties` | — | Inline styles for the carousel root. |
| `onSlideChange` | `(index, banner) => void` | — | Called after the active banner changes. |
| `onBannerClick` | `(banner, index, event) => void` | — | Observes or intercepts banner clicks. |
| `renderBanner` | `(banner, context) => ReactNode` | — | Replaces the default responsive image renderer. |

An empty `banners` array renders nothing. When a banner has an `href`, only the
active slide is included in the keyboard tab order.

### Custom rendering context

`renderBanner` receives the banner and a `BannerRenderContext` object:

| Field | Type | Description |
| --- | --- | --- |
| `index` | `number` | Position of the banner in the array. |
| `isActive` | `boolean` | Whether this banner is currently visible. |
| `eager` | `boolean` | Whether this banner falls within `eagerLoadCount`. |

The callback replaces only the default `picture` and `img` markup. The
carousel still owns the slide, link, track, navigation, and interaction state.

## useCarousel

`useCarousel` supplies navigation, autoplay, pause state, and pointer gesture
handlers without rendering markup.

```tsx
const carousel = useCarousel({
  itemCount: slides.length,
  autoPlay: true,
  autoPlayInterval: 4000,
  loop: true,
  swipeThreshold: 50,
});
```

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `itemCount` | `number` | — | Number of items controlled by the hook. |
| `autoPlay` | `boolean` | `true` | Enables automatic navigation. |
| `autoPlayInterval` | `number` | `5000` | Autoplay interval in milliseconds. |
| `initialIndex` | `number` | `0` | Initial active index. |
| `loop` | `boolean` | `true` | Wraps navigation at the boundaries. |
| `swipeThreshold` | `number` | `50` | Required horizontal pointer movement. |

### Return value

| Field | Type | Description |
| --- | --- | --- |
| `currentIndex` | `number` | Current normalized item index. |
| `isInteracting` | `boolean` | Temporarily true after a successful swipe. |
| `isPaused` | `boolean` | Whether autoplay was paused through `pause`. |
| `goToSlide` | `(index) => void` | Navigates to a normalized index. |
| `nextSlide` | `() => void` | Moves forward by one item. |
| `prevSlide` | `() => void` | Moves backward by one item. |
| `pause` | `() => void` | Pauses autoplay. |
| `resume` | `() => void` | Resumes autoplay. |
| `handlePointerDown` | pointer event handler | Begins pointer tracking. |
| `handlePointerUp` | pointer event handler | Completes tracking and handles a horizontal swipe. |
| `handlePointerCancel` | pointer event handler | Cancels pointer tracking. |

When `loop` is `false`, navigation stops at the first and last items. Autoplay
does not run when paused, while a pointer is down, when `itemCount` is less than
two, or when `autoPlayInterval` is not positive.

## Default rendering and loading

The default renderer uses a native `picture` element. If `mobileSrc` is
provided, it is selected at or below `mobileBreakpoint`. Images inside
`eagerLoadCount` use eager loading and high fetch priority; the remaining
images use lazy loading.

`width` and `height` are optional but recommended to reserve space before an
image loads.

## Styling

The default stylesheet uses `tbc-` namespaced classes and these CSS variables:

| Variable | Default | Description |
| --- | --- | --- |
| `--tbc-border-radius` | `0.5rem` | Viewport corner radius. |
| `--tbc-transition-duration` | `300ms` | Track and indicator transition duration. |
| `--tbc-indicator-color` | `#d1d5db` | Inactive indicator color. |
| `--tbc-indicator-active-color` | `#111827` | Active indicator color. |
| `--tbc-indicator-width` | `1.5rem` | Indicator width. |
| `--tbc-indicator-height` | `0.375rem` | Indicator height. |

Scope variables to a custom class:

```css
.my-carousel {
  --tbc-border-radius: 1rem;
  --tbc-indicator-active-color: #2563eb;
}
```

The rendered class names are `tbc`, `tbc__viewport`, `tbc__track`,
`tbc__slide`, `tbc__media`, `tbc__picture`, `tbc__image`, `tbc__link`,
`tbc__button`, `tbc__indicators`, and `tbc__indicator`.

## Keyboard and accessibility behavior

- The component root is a labelled carousel region.
- Each slide is a group named by its position and total count.
- Inactive linked slides are removed from keyboard navigation.
- Left and Right Arrow move between slides.
- Home selects the first slide and End selects the last.
- Indicators expose the active slide with `aria-current`.
- Autoplay pauses during hover, focus, and pointer interaction.
- Reduced-motion preferences disable transitions in the default stylesheet.

Give every banner meaningful `alt` text and provide an `ariaLabel` that
describes the carousel's purpose on the page.
