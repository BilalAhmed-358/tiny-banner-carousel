import { useState } from 'react';
import { BannerCarousel, type Banner } from 'tiny-banner-carousel';

import 'tiny-banner-carousel/styles.css';
import './App.css';

const installCommand = 'npm install tiny-banner-carousel';
const repositoryUrl =
  'https://github.com/BilalAhmed-358/tiny-banner-carousel';
const npmUrl = 'https://www.npmjs.com/package/tiny-banner-carousel';
const authorGithubUrl = 'https://github.com/BilalAhmed-358';
const authorLinkedInUrl = 'https://www.linkedin.com/in/ahmedkhanbilal/';
const assetBase = import.meta.env.BASE_URL;

const banners: Banner[] = [
  {
    id: 'performance',
    src: `${assetBase}banners/performance-desktop.svg`,
    mobileSrc: `${assetBase}banners/performance-mobile.svg`,
    alt: 'Performance without the payload',
    width: 1440,
    height: 420,
  },
  {
    id: 'interaction',
    src: `${assetBase}banners/interaction-desktop.svg`,
    mobileSrc: `${assetBase}banners/interaction-mobile.svg`,
    alt: 'Touch keyboard and autoplay navigation',
    href: '#playground',
    width: 1440,
    height: 420,
  },
  {
    id: 'control',
    src: `${assetBase}banners/control-desktop.svg`,
    mobileSrc: `${assetBase}banners/control-mobile.svg`,
    alt: 'Styled defaults with headless control',
    href: '#headless',
    width: 1440,
    height: 420,
  },
];

const headlessExample = `const {
  currentIndex,
  nextSlide,
  prevSlide,
  goToSlide,
  handlePointerDown,
  handlePointerUp,
  handlePointerCancel,
} = useCarousel({
  itemCount: slides.length,
  autoPlay: false,
  loop: true,
});`;

interface ToggleProps {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}

function Toggle({ checked, label, onChange }: ToggleProps) {
  return (
    <label className="toggle">
      <span>{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className="toggle__track" aria-hidden="true">
        <span className="toggle__thumb" />
      </span>
    </label>
  );
}

export default function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [loop, setLoop] = useState(true);
  const [showIndicators, setShowIndicators] = useState(true);
  const [interval, setIntervalValue] = useState(4000);
  const [copied, setCopied] = useState(false);

  const copyInstallCommand = async () => {
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="site-shell">
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="tiny-banner-carousel home">
          <span className="brand__mark" aria-hidden="true">
            t
          </span>
          <span>tiny-banner-carousel</span>
        </a>

        <div className="nav__links">
          <a href="#playground">Playground</a>
          <a href="#headless">Headless API</a>
          <a href={repositoryUrl} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </nav>

      <main id="top">
        <header className="hero">
          <div className="hero__copy">
            <div className="status-pill">
              <span aria-hidden="true" />
              React 18 &amp; 19 · TypeScript ready
            </div>

            <h1>
              A banner carousel that stays <em>tiny.</em>
            </h1>

            <p className="hero__description">
              Responsive images, autoplay, pointer gestures, and keyboard
              navigation—without pulling a full animation framework into your
              product.
            </p>

            <div className="hero__actions">
              <a className="button button--primary" href="#playground">
                Explore the playground
              </a>
              <a
                className="button button--secondary"
                href={repositoryUrl}
                target="_blank"
                rel="noreferrer"
              >
                View on GitHub
              </a>
            </div>

            <button
              className="install-command"
              type="button"
              onClick={copyInstallCommand}
              aria-label="Copy npm install command"
            >
              <span aria-hidden="true">$</span>
              <code>{installCommand}</code>
              <span className="install-command__action">
                {copied ? 'Copied' : 'Copy'}
              </span>
            </button>
          </div>

          <div className="hero__signal" aria-label="Package highlights">
            <div className="signal-card signal-card--large">
              <span className="signal-card__label">Package size</span>
              <strong>≈2.7 kB</strong>
              <small>Minified and gzipped</small>
            </div>
            <div className="signal-card">
              <span className="signal-card__label">Dependencies</span>
              <strong>Zero extras</strong>
              <small>React is the only peer</small>
            </div>
            <div className="signal-card signal-card--accent">
              <span className="signal-card__label">Use it your way</span>
              <strong>2 options</strong>
              <small>component or hook</small>
            </div>
          </div>
        </header>

        <section className="playground section" id="playground">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Live playground</p>
              <h2>Tune the behavior, then try it.</h2>
            </div>
            <p>
              Swipe on touch, use the arrow keys, or select an indicator.
              Autoplay pauses while the carousel is hovered or focused.
            </p>
          </div>

          <div className="playground__panel">
            <div className="controls" aria-label="Carousel settings">
              <Toggle
                label="Autoplay"
                checked={autoPlay}
                onChange={setAutoPlay}
              />
              <Toggle label="Loop" checked={loop} onChange={setLoop} />
              <Toggle
                label="Indicators"
                checked={showIndicators}
                onChange={setShowIndicators}
              />

              <label className="select-control">
                <span>Interval</span>
                <select
                  value={interval}
                  onChange={(event) =>
                    setIntervalValue(Number(event.target.value))
                  }
                  disabled={!autoPlay}
                >
                  <option value={2500}>2.5 seconds</option>
                  <option value={4000}>4 seconds</option>
                  <option value={6000}>6 seconds</option>
                </select>
              </label>
            </div>

            <div className="carousel-stage">
              <BannerCarousel
                className="showcase-carousel"
                banners={banners}
                autoPlay={autoPlay}
                autoPlayInterval={interval}
                loop={loop}
                showIndicators={showIndicators}
                ariaLabel="Feature demonstrations"
                onSlideChange={(index) => setActiveSlide(index)}
              />

              <div
                className="carousel-status"
                aria-live={autoPlay ? 'off' : 'polite'}
              >
                <span>
                  0{activeSlide + 1} / 0{banners.length}
                </span>
                <span>{banners[activeSlide]?.alt}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="headless section" id="headless">
          <div className="headless__copy">
            <p className="section-kicker">Headless when you need it</p>
            <h2>Use the behavior. Make the design your own.</h2>
            <p>
              <code>useCarousel</code> exposes navigation, autoplay state,
              pause controls, and pointer handlers. Attach them to your own
              markup without inheriting the component stylesheet.
            </p>
            <a
              className="text-link"
              href={`${repositoryUrl}#headless-usage`}
              target="_blank"
              rel="noreferrer"
            >
              Read the hook documentation <span aria-hidden="true">→</span>
            </a>
          </div>

          <pre className="code-window" aria-label="useCarousel example">
            <span className="code-window__bar">
              <i />
              <i />
              <i />
              <b>CustomCarousel.tsx</b>
            </span>
            <code>{headlessExample}</code>
          </pre>
        </section>

        <section className="closing-card">
          <div>
            <p className="section-kicker">Ready to ship</p>
            <h2>Start with the component. Drop down to the hook.</h2>
          </div>
          <div className="closing-card__actions">
            <a className="button button--light" href={npmUrl}>
              View on npm
            </a>
            <a className="button button--ghost" href={repositoryUrl}>
              Browse the source
            </a>
          </div>
        </section>
      </main>

      <footer>
        <a className="brand" href="#top">
          <span className="brand__mark" aria-hidden="true">
            t
          </span>
          <span>tiny-banner-carousel</span>
        </a>
        <p>
          Open source and built by{' '}
          <a href={authorLinkedInUrl} target="_blank" rel="noreferrer">
            Bilal Ahmed
          </a>
          .
        </p>
        <div>
          <a href={npmUrl}>npm</a>
          <a href={repositoryUrl}>GitHub</a>
          <a href={authorGithubUrl} target="_blank" rel="noreferrer">
            Author GitHub
          </a>
          <a href={`${repositoryUrl}/blob/main/README.md`}>Docs</a>
        </div>
      </footer>
    </div>
  );
}
