import React, { useState } from 'react';
import type { IndustryItem } from '../../data/industries';

interface IndustriesInteractiveProps {
  industries: IndustryItem[];
  theme?: 'dark' | 'light';
}

export default function IndustriesInteractive({ industries }: IndustriesInteractiveProps) {
  const [activeSlug, setActiveSlug] = useState<string>(industries[0]?.slug || 'consumer-electronics');
  const [mobileExpandedSlug, setMobileExpandedSlug] = useState<string | null>(null);

  const activeIndex = industries.findIndex((i) => i.slug === activeSlug);
  const activeIndustry = industries[activeIndex] || industries[0];

  const handleMobileToggle = (slug: string) => {
    setMobileExpandedSlug(mobileExpandedSlug === slug ? null : slug);
  };

  return (
    <div className="w-full">
      {/* ========================================================================= */}
      {/* DESKTOP: BRUTALIST EDITORIAL NAVIGATION LIST + QUIET PREVIEW (>= 1024px) */}
      {/* ========================================================================= */}
      <div className="hidden lg:grid grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Compact Editorial List */}
        <div className="col-span-6 border-t-2 border-dark divide-y divide-border">
          {industries.map((ind, index) => {
            const isActive = ind.slug === activeSlug;
            return (
              <div
                key={ind.slug}
                onMouseEnter={() => setActiveSlug(ind.slug)}
                onFocus={() => setActiveSlug(ind.slug)}
                className={`group transition-colors duration-150 relative ${
                  isActive ? 'bg-brand-50/50' : 'hover:bg-black/[0.015]'
                }`}
              >
                {/* Active Left Indicator Notch */}
                {isActive && (
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-brand-500" />
                )}

                <a
                  href={`/industries/${ind.slug}`}
                  onClick={(e) => {
                    if (!isActive) {
                      e.preventDefault();
                      setActiveSlug(ind.slug);
                    }
                  }}
                  className="flex items-center justify-between py-4 px-4 focus:outline-none transition-all duration-150"
                  aria-current={isActive ? 'true' : undefined}
                >
                  <div className="flex items-center gap-3">
                    {/* Brutalist Index */}
                    <span
                      className={`font-mono text-xs tracking-wider transition-colors duration-150 ${
                        isActive ? 'text-brand-600 font-bold' : 'text-secondary/60'
                      }`}
                    >
                      0{index + 1} //
                    </span>
                    {/* Industry Title */}
                    <span
                      className={`text-base tracking-tight transition-colors duration-150 font-display ${
                        isActive
                          ? 'font-bold text-dark'
                          : 'font-normal text-secondary group-hover:text-dark'
                      }`}
                    >
                      {ind.name}
                    </span>
                  </div>

                  {/* Understated Green Arrow */}
                  <div
                    className={`transition-all duration-150 flex items-center font-mono text-sm ${
                      isActive
                        ? 'translate-x-1 text-brand-600 font-bold opacity-100'
                        : 'text-secondary/40 group-hover:text-dark group-hover:translate-x-0.5 opacity-60'
                    }`}
                  >
                    <span>→</span>
                  </div>
                </a>
              </div>
            );
          })}
        </div>

        {/* Right Column: Quiet Visual Preview with Technical Framing */}
        <div className="col-span-6 sticky top-28">
          <div className="border border-border bg-white rounded-sm p-6 space-y-4">
            {/* Technical Header Bar */}
            <div className="flex items-center justify-between font-mono text-[11px] text-secondary border-b border-border pb-2.5">
              <span className="flex items-center gap-1.5 text-brand-600 font-semibold">
                <span className="w-1.5 h-1.5 bg-brand-500" />
                <span>SECTOR // 0{activeIndex + 1}</span>
              </span>
              <span>IPC CLASS 2 & 3 COMPLIANT</span>
            </div>

            {/* Image Frame */}
            <div className="relative aspect-[16/10] overflow-hidden bg-surface-secondary border border-border rounded-sm">
              <img
                key={activeIndustry.image.src}
                src={activeIndustry.image.src}
                alt={activeIndustry.image.alt}
                className="w-full h-full object-cover transition-opacity duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-dark/5 pointer-events-none" />
            </div>

            {/* Editorial Metadata Block */}
            <div className="space-y-2 pt-1">
              <h3 className="text-lg font-bold font-display text-dark tracking-tight">
                {activeIndustry.tagline}
              </h3>

              <p className="text-xs text-secondary leading-relaxed">
                {activeIndustry.description}
              </p>

              {/* Standards Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {activeIndustry.keyStandards.map((std, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono text-brand-700 bg-brand-50 border border-brand-200 px-2 py-0.5 rounded-sm"
                  >
                    {std}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between">
                <a
                  href={`/industries/${activeIndustry.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-brand-600 hover:text-brand-700 transition-colors group"
                >
                  <span>Explore {activeIndustry.name} specifications</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE: COMPACT ROWS WITH RESTRAINED TAP EXPANSION (< 1024px) */}
      {/* ========================================================================= */}
      <div className="lg:hidden border-t-2 border-dark divide-y divide-border">
        {industries.map((ind, index) => {
          const isExpanded = mobileExpandedSlug === ind.slug;
          return (
            <div key={ind.slug} className={isExpanded ? 'bg-brand-50/30' : ''}>
              {/* Compact row button */}
              <button
                type="button"
                onClick={() => handleMobileToggle(ind.slug)}
                className="w-full flex items-center justify-between py-3.5 px-3 text-left focus:outline-none min-h-[44px]"
                aria-expanded={isExpanded}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-brand-600 font-bold">
                    0{index + 1} //
                  </span>
                  <span
                    className={`text-sm sm:text-base tracking-tight transition-colors font-display ${
                      isExpanded ? 'font-bold text-dark' : 'font-normal text-dark/90'
                    }`}
                  >
                    {ind.name}
                  </span>
                </div>

                <div
                  className={`text-secondary font-mono text-sm transition-transform duration-200 ${
                    isExpanded ? 'rotate-90 text-brand-600 font-bold' : ''
                  }`}
                >
                  <span>→</span>
                </div>
              </button>

              {/* Compact Collapsible Panel */}
              {isExpanded && (
                <div className="pb-5 pt-2 px-3 space-y-3 bg-white border-t border-border">
                  <div className="relative aspect-[16/9] max-h-44 rounded-sm overflow-hidden bg-surface-secondary border border-border">
                    <img
                      src={ind.image.src}
                      alt={ind.image.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <p className="text-xs text-secondary leading-relaxed">
                    {ind.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {ind.keyStandards.map((std, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono text-brand-700 bg-brand-50 border border-brand-200 px-2 py-0.5 rounded-sm"
                      >
                        {std}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2">
                    <a
                      href={`/industries/${ind.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                    >
                      <span>View specifications</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
