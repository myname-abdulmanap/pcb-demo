import React, { useRef, useEffect } from 'react';
import type { IndustryItem } from '../../data/industries';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface IndustriesVelocityProps {
  industries: IndustryItem[];
}

export default function IndustriesVelocity({ industries }: IndustriesVelocityProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      if (!containerRef.current || !trackRef.current) return;

      const track = trackRef.current;
      const container = containerRef.current;

      const getShift = () => Math.max(track.scrollWidth - container.clientWidth + 60, 400);

      // Horizontal scrub translation linked to section scroll
      const scrubTween = gsap.fromTo(
        track,
        { x: 0 },
        {
          x: () => -getShift(),
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            end: 'bottom 15%',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        }
      );

      // Velocity Skew Response (Ultra-sleek inertia tilt when user scrolls)
      const skewSetter = gsap.quickTo(track, 'skewX', { duration: 0.3, ease: 'power2.out' });
      const clampSkew = gsap.utils.clamp(-3.5, 3.5);

      const velTrigger = ScrollTrigger.create({
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const vel = self.getVelocity();
          skewSetter(clampSkew(vel / -350));
        },
        onLeave: () => skewSetter(0),
        onLeaveBack: () => skewSetter(0),
      });

      return () => {
        scrubTween.kill();
        velTrigger.kill();
        skewSetter(0);
      };
    });

    return () => mm.revert();
  }, [industries]);

  const scrollLeft = () => {
    if (trackRef.current) {
      gsap.to(trackRef.current, { x: '+=380', duration: 0.4, ease: 'power2.out' });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      gsap.to(trackRef.current, { x: '-=380', duration: 0.4, ease: 'power2.out' });
    }
  };

  return (
    <div ref={containerRef} className="w-full relative overflow-hidden py-4">
      {/* Controls Bar */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3 font-mono text-xs text-brand-300">
          <span className="w-2 h-2 rounded-full bg-brand-400" />
          <span className="tracking-widest uppercase">APPLICATION SPECTRUM // 07 SPECIALIZED HARDWARE DOMAINS</span>
        </div>

        {/* Directional Nav Buttons */}
        <div className="hidden sm:flex items-center gap-2 font-mono text-xs">
          <button
            type="button"
            onClick={scrollLeft}
            className="px-3 py-1.5 border border-white/20 hover:border-brand-400 hover:bg-white/5 text-white transition-colors flex items-center gap-1 focus:outline-none"
            aria-label="Scroll left"
          >
            <span>←</span>
            <span>PREV</span>
          </button>
          <button
            type="button"
            onClick={scrollRight}
            className="px-3 py-1.5 border border-white/20 hover:border-brand-400 hover:bg-white/5 text-white transition-colors flex items-center gap-1 focus:outline-none"
            aria-label="Scroll right"
          >
            <span>NEXT</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Velocity Track Container */}
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto lg:overflow-visible no-scrollbar pb-6 cursor-grab active:cursor-grabbing"
      >
        {industries.map((ind, idx) => (
          <article
            key={ind.slug}
            className="flex-shrink-0 w-[300px] sm:w-[360px] lg:w-[400px] group bg-[#111513] border border-white/15 rounded-sm p-5 flex flex-col justify-between hover:border-brand-400 transition-colors duration-200"
          >
            {/* Top Index & Standards */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4 font-mono text-[11px]">
              <span className="text-brand-400 font-bold">0{idx + 1} //</span>
              <span className="text-white/60">{ind.keyStandards[0]}</span>
            </div>

            {/* Authentic PCB Macro Image */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-white/10 bg-black/40 mb-5">
              <img
                src={ind.image.src}
                alt={ind.image.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-dark/20 pointer-events-none" />
            </div>

            {/* Editorial Typography */}
            <div className="space-y-2 mb-6">
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight group-hover:text-brand-300 transition-colors">
                {ind.name}
              </h3>
              <p className="text-xs text-white/70 leading-relaxed line-clamp-3">
                {ind.description}
              </p>
            </div>

            {/* Bottom Technical Spec & Action Link */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
              <span className="text-brand-300 text-[11px]">
                {ind.stats[0]?.label || 'IPC CLASS 3'}: {ind.stats[0]?.value || 'READY'}
              </span>

              <a
                href={`/industries/${ind.slug}`}
                className="inline-flex items-center gap-1.5 text-white hover:text-brand-400 font-semibold transition-colors"
              >
                <span>SPEC</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
