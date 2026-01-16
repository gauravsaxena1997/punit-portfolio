"use client";

import { useState, useEffect, useRef } from "react";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  start?: number;
  delay?: number;
  decimals?: number;
  enabled?: boolean;
}

export function useCountUp({
  end,
  duration = 2000,
  start = 0,
  delay = 0,
  decimals = 0,
  enabled = true,
}: UseCountUpOptions) {
  const [count, setCount] = useState(start);
  const [isComplete, setIsComplete] = useState(false);
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      setCount(start);
      setIsComplete(false);
      return;
    }

    const timeout = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (!startTimeRef.current) {
          startTimeRef.current = timestamp;
        }

        const progress = timestamp - startTimeRef.current;
        const percentage = Math.min(progress / duration, 1);

        // Easing function for smooth animation (ease-out-cubic)
        const easeOutCubic = 1 - Math.pow(1 - percentage, 3);
        const currentValue = start + (end - start) * easeOutCubic;

        setCount(Number(currentValue.toFixed(decimals)));

        if (percentage < 1) {
          frameRef.current = requestAnimationFrame(animate);
        } else {
          setIsComplete(true);
        }
      };

      frameRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      startTimeRef.current = null;
    };
  }, [end, duration, start, delay, decimals, enabled]);

  return { count, isComplete };
}
