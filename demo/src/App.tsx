import { useState } from 'react';
import {
  BannerCarousel,
  type Banner,
} from 'tiny-banner-carousel';

import 'tiny-banner-carousel/styles.css';
import './App.css';

const banners: Banner[] = [
  {
    id: 'first',
    src: 'https://placehold.co/1440x400/111827/ffffff?text=Lightweight+Banner+Carousel',
    mobileSrc:
      'https://placehold.co/720x720/111827/ffffff?text=Lightweight+Carousel',
    alt: 'Lightweight banner carousel',
    href: '#lightweight',
    width: 1440,
    height: 400,
  },
  {
    id: 'second',
    src: 'https://placehold.co/1440x400/2563eb/ffffff?text=Swipe%2C+Autoplay%2C+Keyboard',
    mobileSrc:
      'https://placehold.co/720x720/2563eb/ffffff?text=Swipe+and+Autoplay',
    alt: 'Swipe autoplay and keyboard navigation',
    href: '#features',
    width: 1440,
    height: 400,
  },
  {
    id: 'third',
    src: 'https://placehold.co/1440x400/7c3aed/ffffff?text=Tiny+and+Customizable',
    mobileSrc:
      'https://placehold.co/720x720/7c3aed/ffffff?text=Tiny+and+Customizable',
    alt: 'Tiny and customizable carousel',
    href: '#customization',
    width: 1440,
    height: 400,
  },
];

export default function App() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <main className="app">
      <header className="hero">
        <p className="eyebrow">React banner carousel</p>
        <h1>tiny-banner-carousel</h1>
        <p className="description">
          A lightweight, accessible carousel with autoplay, responsive images,
          touch gestures, and keyboard navigation.
        </p>

        <code>npm install tiny-banner-carousel</code>
      </header>

      <section className="demo">
        <BannerCarousel
          className="showcase-carousel"
          banners={banners}
          autoPlay
          autoPlayInterval={4000}
          ariaLabel="Feature demonstrations"
          onSlideChange={(index) => setActiveSlide(index)}
        />

        <p className="active-slide">
          Active slide: {activeSlide + 1} of {banners.length}
        </p>
      </section>
    </main>
  );
}