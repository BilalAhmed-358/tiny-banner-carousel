import { useCallback, useEffect, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import type { UseCarouselOptions, UseCarouselResult } from './types';

function normalizeIndex(index: number, itemCount: number, loop: boolean) {
  if (itemCount <= 0) return 0;

  if (loop) {
    return ((index % itemCount) + itemCount) % itemCount;
  }

  return Math.min(Math.max(index, 0), itemCount - 1);
}

export function useCarousel({
  itemCount,
  autoPlay = true,
  autoPlayInterval = 5000,
  initialIndex = 0,
  loop = true,
  swipeThreshold = 50,
}: UseCarouselOptions): UseCarouselResult {
  const safeItemCount = Math.max(0, itemCount);
  const [currentIndex, setCurrentIndex] = useState(() =>
    normalizeIndex(initialIndex, safeItemCount, loop),
  );
  const [isInteracting, setIsInteracting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const pointerStartRef = useRef({ x: 0, y: 0 });
  const interactionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearInteractionTimer = useCallback(() => {
    if (interactionTimerRef.current) {
      clearTimeout(interactionTimerRef.current);
      interactionTimerRef.current = null;
    }
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      if (safeItemCount === 0) return;
      setCurrentIndex(normalizeIndex(index, safeItemCount, loop));
    },
    [loop, safeItemCount],
  );

  const nextSlide = useCallback(() => {
    if (safeItemCount === 0) return;
    setCurrentIndex((index) =>
      normalizeIndex(index + 1, safeItemCount, loop),
    );
  }, [loop, safeItemCount]);

  const prevSlide = useCallback(() => {
    if (safeItemCount === 0) return;
    setCurrentIndex((index) =>
      normalizeIndex(index - 1, safeItemCount, loop),
    );
  }, [loop, safeItemCount]);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  const releasePointer = useCallback((event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') {
      event.currentTarget.releasePointerCapture?.(event.pointerId);
    }
    setIsPointerDown(false);
  }, []);

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;

      pointerStartRef.current = { x: event.clientX, y: event.clientY };
      setIsPointerDown(true);

      if (event.pointerType !== 'mouse') {
        event.currentTarget.setPointerCapture?.(event.pointerId);
      }
    },
    [],
  );

  const handlePointerUp = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (!isPointerDown) return;

      releasePointer(event);
      const deltaX = event.clientX - pointerStartRef.current.x;
      const deltaY = event.clientY - pointerStartRef.current.y;
      const isHorizontalSwipe =
        Math.abs(deltaX) > swipeThreshold &&
        Math.abs(deltaX) > Math.abs(deltaY);

      if (!isHorizontalSwipe) return;

      clearInteractionTimer();
      setIsInteracting(true);

      if (deltaX > 0) prevSlide();
      else nextSlide();

      interactionTimerRef.current = setTimeout(() => {
        setIsInteracting(false);
        interactionTimerRef.current = null;
      }, 200);
    },
    [
      clearInteractionTimer,
      isPointerDown,
      nextSlide,
      prevSlide,
      releasePointer,
      swipeThreshold,
    ],
  );

  const handlePointerCancel = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      releasePointer(event);
      setIsInteracting(false);
    },
    [releasePointer],
  );

  useEffect(() => {
    setCurrentIndex((index) =>
      normalizeIndex(index, safeItemCount, loop),
    );
  }, [loop, safeItemCount]);

  useEffect(() => {
    if (
      !autoPlay ||
      isPaused ||
      isPointerDown ||
      safeItemCount <= 1 ||
      autoPlayInterval <= 0
    ) {
      return undefined;
    }

    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [
    autoPlay,
    autoPlayInterval,
    isPaused,
    isPointerDown,
    nextSlide,
    safeItemCount,
  ]);

  useEffect(
    () => () => {
      clearInteractionTimer();
    },
    [clearInteractionTimer],
  );

  return {
    currentIndex,
    isInteracting,
    isPaused,
    goToSlide,
    nextSlide,
    prevSlide,
    pause,
    resume,
    handlePointerDown,
    handlePointerUp,
    handlePointerCancel,
  };
}
