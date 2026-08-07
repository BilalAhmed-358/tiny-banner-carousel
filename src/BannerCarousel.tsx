import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import type { KeyboardEvent, MouseEvent, ReactNode } from 'react';
import type { Banner, BannerCarouselProps } from './types';
import { useCarousel } from './useCarousel';

function joinClassNames(...classNames: Array<string | undefined | false>) {
  return classNames.filter(Boolean).join(' ');
}

function DefaultBanner({
  banner,
  eager,
  mobileBreakpoint,
}: {
  banner: Banner;
  eager: boolean;
  mobileBreakpoint: number;
}) {
  return (
    <picture className="tbc__picture">
      {banner.mobileSrc && (
        <source
          media={`(max-width: ${mobileBreakpoint}px)`}
          srcSet={banner.mobileSrc}
        />
      )}
      <img
        className="tbc__image"
        src={banner.src}
        alt={banner.alt}
        width={banner.width}
        height={banner.height}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding={eager ? 'sync' : 'async'}
        draggable={false}
      />
    </picture>
  );
}

export function BannerCarousel({
  banners,
  ariaLabel = 'Banner carousel',
  autoPlay = true,
  autoPlayInterval = 5000,
  className,
  eagerLoadCount = 1,
  initialIndex = 0,
  loop = true,
  mobileBreakpoint = 768,
  pauseOnFocus = true,
  pauseOnHover = true,
  showIndicators = true,
  style,
  swipeThreshold = 50,
  onBannerClick,
  onSlideChange,
  renderBanner,
}: BannerCarouselProps) {
  const {
    currentIndex,
    isInteracting,
    goToSlide,
    nextSlide,
    prevSlide,
    pause,
    resume,
    handlePointerDown,
    handlePointerUp,
    handlePointerCancel,
  } = useCarousel({
    itemCount: banners.length,
    autoPlay,
    autoPlayInterval,
    initialIndex,
    loop,
    swipeThreshold,
  });
  const previousIndexRef = useRef(currentIndex);
  const hoveredRef = useRef(false);
  const focusedRef = useRef(false);

  const activeBanner = banners[currentIndex];
  const trackStyle = useMemo(
    () => ({ transform: `translate3d(-${currentIndex * 100}%, 0, 0)` }),
    [currentIndex],
  );

  const syncPausedState = useCallback(() => {
    if (hoveredRef.current || focusedRef.current) pause();
    else resume();
  }, [pause, resume]);

  useEffect(() => {
    if (
      activeBanner &&
      previousIndexRef.current !== currentIndex
    ) {
      onSlideChange?.(currentIndex, activeBanner);
      previousIndexRef.current = currentIndex;
    }
  }, [activeBanner, currentIndex, onSlideChange]);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      prevSlide();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      nextSlide();
    } else if (event.key === 'Home') {
      event.preventDefault();
      goToSlide(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      goToSlide(banners.length - 1);
    }
  };

  const handleClick = (
    event: MouseEvent<HTMLElement>,
    banner: Banner,
    index: number,
  ) => {
    if (isInteracting) {
      event.preventDefault();
      return;
    }

    onBannerClick?.(banner, index, event);
  };

  const renderMedia = (banner: Banner, index: number): ReactNode => {
    const context = {
      index,
      isActive: index === currentIndex,
      eager: index < Math.max(0, eagerLoadCount),
    };

    return renderBanner ? (
      renderBanner(banner, context)
    ) : (
      <DefaultBanner
        banner={banner}
        eager={context.eager}
        mobileBreakpoint={mobileBreakpoint}
      />
    );
  };

  if (banners.length === 0) return null;

  return (
    <section
      className={joinClassNames('tbc', className)}
      style={style}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => {
        if (!pauseOnHover) return;
        hoveredRef.current = true;
        syncPausedState();
      }}
      onMouseLeave={() => {
        if (!pauseOnHover) return;
        hoveredRef.current = false;
        syncPausedState();
      }}
      onFocusCapture={() => {
        if (!pauseOnFocus) return;
        focusedRef.current = true;
        syncPausedState();
      }}
      onBlurCapture={(event) => {
        if (!pauseOnFocus || event.currentTarget.contains(event.relatedTarget)) {
          return;
        }
        focusedRef.current = false;
        syncPausedState();
      }}
    >
      <div
        className={joinClassNames(
          'tbc__viewport',
          isInteracting && 'tbc__viewport--interacting',
        )}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        <div className="tbc__track" style={trackStyle}>
          {banners.map((banner, index) => {
            const isActive = index === currentIndex;
            const media = renderMedia(banner, index);

            return (
              <div
                className="tbc__slide"
                key={banner.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${banners.length}`}
                aria-hidden={!isActive}
              >
                {banner.href ? (
                  <a
                    className="tbc__media tbc__link"
                    href={banner.href}
                    target={banner.target}
                    rel={
                      banner.rel ??
                      (banner.target === '_blank'
                        ? 'noopener noreferrer'
                        : undefined)
                    }
                    tabIndex={isActive ? 0 : -1}
                    onClick={(event) => handleClick(event, banner, index)}
                    onDragStart={(event) => event.preventDefault()}
                  >
                    {media}
                  </a>
                ) : onBannerClick ? (
                  <button
                    className="tbc__media tbc__button"
                    type="button"
                    tabIndex={isActive ? 0 : -1}
                    aria-label={banner.alt}
                    onClick={(event) => handleClick(event, banner, index)}
                  >
                    {media}
                  </button>
                ) : (
                  <div className="tbc__media">{media}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showIndicators && banners.length > 1 && (
        <div className="tbc__indicators" aria-label="Choose a slide">
          {banners.map((banner, index) => (
            <button
              className={joinClassNames(
                'tbc__indicator',
                currentIndex === index && 'tbc__indicator--active',
              )}
              key={banner.id}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentIndex === index ? 'true' : undefined}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
