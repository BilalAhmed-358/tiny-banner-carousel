# tiny-banner-carousel demo

An interactive showcase for [`tiny-banner-carousel`](../README.md), built with
React and Vite. It demonstrates responsive banners, autoplay, looping,
indicators, pointer gestures, keyboard navigation, and CSS customization.

[Open the live demo](https://bilalahmed-358.github.io/tiny-banner-carousel/) ·
[View the npm package](https://www.npmjs.com/package/tiny-banner-carousel)

## Local development

Run the following commands from the repository root:

```bash
npm install
npm install --prefix demo
npm run build
npm run dev --prefix demo
```

When changing the library and demo together, run their development commands in
separate terminals:

```bash
# Library
npm run dev

# Demo
npm run dev --prefix demo
```

## Validation

```bash
npm run build
npm run lint --prefix demo
npm run build --prefix demo
```
