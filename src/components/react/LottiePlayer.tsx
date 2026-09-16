import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

interface LottiePlayerProps {
  animationData: any;
  className?: string;
  loop?: boolean;
}

export default function LottiePlayer({
  animationData,
  className = 'w-16 h-16',
  loop = true,
}: LottiePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || !animationData) return;

    // Initialize Lottie paused until in view
    animRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop,
      autoplay: false,
      animationData,
    });

    // Synchronize Lottie with viewport entry/exit
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animRef.current?.play();
          } else {
            animRef.current?.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      if (animRef.current) {
        animRef.current.destroy();
      }
    };
  }, [animationData, loop]);

  return <div ref={containerRef} className={className} />;
}
