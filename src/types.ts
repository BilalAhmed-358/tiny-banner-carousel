import type {
  AnchorHTMLAttributes,
  CSSProperties,
  MouseEvent,
  PointerEventHandler,
  ReactNode,
} from 'react';

export type BannerId = string | number;

export interface Banner {
  id: BannerId;
  src: string;
  alt: string;
  mobileSrc?: string;
  href?: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  rel?: string;
  width?: number;
  height?: number;
}

export interface BannerRenderContext {
  index: number;
  isActive: boolean;
  eager: boolean;
}

export interface BannerCarouselProps {
  banners: readonly Banner[];
  ariaLabel?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
  eagerLoadCount?: number;
  initialIndex?: number;
  loop?: boolean;
  mobileBreakpoint?: number;
  pauseOnFocus?: boolean;
  pauseOnHover?: boolean;
  showIndicators?: boolean;
  style?: CSSProperties;
  swipeThreshold?: number;
  onBannerClick?: (
    banner: Banner,
    index: number,
    event: MouseEvent<HTMLElement>,
  ) => void;
  onSlideChange?: (index: number, banner: Banner) => void;
  renderBanner?: (banner: Banner, context: BannerRenderContext) => ReactNode;
}

export interface UseCarouselOptions {
  itemCount: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  initialIndex?: number;
  loop?: boolean;
  swipeThreshold?: number;
}

export interface UseCarouselResult {
  currentIndex: number;
  isInteracting: boolean;
  isPaused: boolean;
  goToSlide: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  pause: () => void;
  resume: () => void;
  handlePointerDown: PointerEventHandler<HTMLElement>;
  handlePointerUp: PointerEventHandler<HTMLElement>;
  handlePointerCancel: PointerEventHandler<HTMLElement>;
}
