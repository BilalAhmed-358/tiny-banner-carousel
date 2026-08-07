import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useCarousel } from '../src/useCarousel';

describe('useCarousel', () => {
  it('navigates and loops through items', () => {
    const { result } = renderHook(() => useCarousel({ itemCount: 3 }));

    act(() => result.current.prevSlide());
    expect(result.current.currentIndex).toBe(2);

    act(() => result.current.nextSlide());
    expect(result.current.currentIndex).toBe(0);

    act(() => result.current.goToSlide(1));
    expect(result.current.currentIndex).toBe(1);
  });

  it('does not produce an invalid index with no items', () => {
    const { result } = renderHook(() => useCarousel({ itemCount: 0 }));

    act(() => {
      result.current.nextSlide();
      result.current.prevSlide();
      result.current.goToSlide(10);
    });

    expect(result.current.currentIndex).toBe(0);
  });

  it('advances after one autoplay interval and can be paused', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() =>
      useCarousel({ itemCount: 3, autoPlayInterval: 1000 }),
    );

    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.currentIndex).toBe(1);

    act(() => result.current.pause());
    act(() => vi.advanceTimersByTime(2000));
    expect(result.current.currentIndex).toBe(1);

    act(() => result.current.resume());
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.currentIndex).toBe(2);
    vi.useRealTimers();
  });

  it('moves to the next item after a horizontal swipe', () => {
    const { result } = renderHook(() =>
      useCarousel({ itemCount: 3, autoPlay: false, swipeThreshold: 40 }),
    );
    const target = {
      setPointerCapture: vi.fn(),
      releasePointerCapture: vi.fn(),
    };

    act(() =>
      result.current.handlePointerDown({
        pointerId: 1,
        pointerType: 'touch',
        button: 0,
        clientX: 150,
        clientY: 20,
        currentTarget: target,
      } as never),
    );
    act(() =>
      result.current.handlePointerUp({
        pointerId: 1,
        pointerType: 'touch',
        clientX: 80,
        clientY: 24,
        currentTarget: target,
      } as never),
    );

    expect(result.current.currentIndex).toBe(1);
    expect(result.current.isInteracting).toBe(true);
  });
});
