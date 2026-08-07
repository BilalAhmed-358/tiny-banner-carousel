import { act, fireEvent, render, screen } from '@testing-library/react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { BannerCarousel } from '../src/BannerCarousel';
import type { Banner } from '../src/types';

const banners: Banner[] = [
  {
    id: 'first',
    src: '/desktop-one.jpg',
    mobileSrc: '/mobile-one.jpg',
    alt: 'First promotion',
    href: '/first',
    width: 1200,
    height: 400,
  },
  {
    id: 'second',
    src: '/desktop-two.jpg',
    alt: 'Second promotion',
    href: 'https://example.com/second',
    target: '_blank',
    width: 1200,
    height: 400,
  },
];

describe('BannerCarousel', () => {
  it('renders nothing when there are no banners', () => {
    const { container } = render(<BannerCarousel banners={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders responsive banners and accessible indicators', () => {
    const { container } = render(
      <BannerCarousel banners={banners} ariaLabel="Featured offers" />,
    );

    expect(
      screen.getByRole('region', { name: 'Featured offers' }),
    ).toBeInTheDocument();
    expect(screen.getByAltText('First promotion')).toHaveAttribute(
      'loading',
      'eager',
    );
    expect(container.querySelector('source')).toHaveAttribute(
      'srcset',
      '/mobile-one.jpg',
    );
    expect(
      container.querySelector('a[href="https://example.com/second"]'),
    ).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getByRole('button', { name: 'Go to slide 1' })).toHaveAttribute(
      'aria-current',
      'true',
    );
  });

  it('changes slides through indicators and keyboard navigation', () => {
    const onSlideChange = vi.fn();
    render(
      <BannerCarousel
        banners={banners}
        autoPlay={false}
        onSlideChange={onSlideChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Go to slide 2' }));
    expect(onSlideChange).toHaveBeenLastCalledWith(1, banners[1]);

    fireEvent.keyDown(screen.getByRole('region'), { key: 'ArrowLeft' });
    expect(onSlideChange).toHaveBeenLastCalledWith(0, banners[0]);
  });

  it('advances with autoplay after the configured interval', () => {
    vi.useFakeTimers();
    render(
      <BannerCarousel banners={banners} autoPlayInterval={1000} />,
    );

    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByRole('button', { name: 'Go to slide 2' })).toHaveAttribute(
      'aria-current',
      'true',
    );
    vi.useRealTimers();
  });

  it('reports banner clicks without replacing native link behavior', () => {
    const onBannerClick = vi.fn(
      (_banner, _index, event: ReactMouseEvent<HTMLElement>) => {
        event.preventDefault();
      },
    );
    render(
      <BannerCarousel
        banners={banners}
        autoPlay={false}
        onBannerClick={onBannerClick}
      />,
    );

    fireEvent.click(screen.getByRole('link', { name: 'First promotion' }));
    expect(onBannerClick).toHaveBeenCalledWith(
      banners[0],
      0,
      expect.any(Object),
    );
  });
});
