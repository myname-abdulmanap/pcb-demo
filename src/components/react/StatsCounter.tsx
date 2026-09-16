import React, { useState, useEffect, useRef } from 'react';

interface StatItem {
  target: number;
  suffix: string;
  decimals?: number;
  index: string;
  label: string;
}

const statsData: StatItem[] = [
  {
    target: 5,
    suffix: '+',
    decimals: 0,
    index: '01 //',
    label: 'Years of Experience',
  },
  {
    target: 500,
    suffix: '+',
    decimals: 0,
    index: '02 //',
    label: 'Projects Completed',
  },
  {
    target: 99.8,
    suffix: '%',
    decimals: 1,
    index: '03 //',
    label: 'Customer Satisfaction',
  },
  {
    target: 100,
    suffix: '%',
    decimals: 0,
    index: '04 //',
    label: 'Locally Supported',
  },
];

export default function StatsCounter() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [values, setValues] = useState<number[]>([0, 0, 0, 0]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const duration = 1800; // ms
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setValues(
        statsData.map((stat) => {
          const current = stat.target * easedProgress;
          return current;
        })
      );

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setValues(statsData.map((s) => s.target));
      }
    };

    requestAnimationFrame(frame);
  };

  return (
    <div
      ref={containerRef}
      className="divide-y divide-border border border-border bg-white rounded-sm p-5 sm:p-6 shadow-[0_2px_12px_rgba(8,127,91,0.06)]"
    >
      {statsData.map((stat, idx) => {
        const val = values[idx] ?? 0;
        const formatted = stat.decimals && stat.decimals > 0
          ? val.toFixed(stat.decimals)
          : Math.round(val).toString();

        return (
          <div key={stat.label} className="py-4 first:pt-0 last:pb-0">
            {/* Number with luminous green suffix */}
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-black font-display text-dark tracking-tight">
                {formatted}
              </span>
              <span className="text-brand-600 font-mono text-2xl sm:text-3xl font-bold">
                {stat.suffix}
              </span>
            </div>

            {/* Brutalist Label with Green Index */}
            <div className="text-[11px] font-mono tracking-wider mt-1 uppercase flex items-center gap-1.5 text-secondary">
              <span className="text-brand-600 font-bold">{stat.index}</span>
              <span>{stat.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
