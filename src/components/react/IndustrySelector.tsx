import React, { useState } from 'react';

interface IndustryQuickItem {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  keyStandards: string[];
}

interface IndustrySelectorProps {
  industries: IndustryQuickItem[];
}

export default function IndustrySelector({ industries }: IndustrySelectorProps) {
  const [activeSlug, setActiveSlug] = useState<string>(industries[0]?.slug || 'consumer-electronics');

  const activeIndustry = industries.find((i) => i.slug === activeSlug) || industries[0];

  return (
    <div className="bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-card">
      {/* Pills */}
      <div className="flex flex-wrap gap-2 pb-6 border-b border-border">
        {industries.map((ind) => (
          <button
            key={ind.slug}
            type="button"
            onClick={() => setActiveSlug(ind.slug)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeSlug === ind.slug
                ? 'bg-brand-500 text-white shadow-sm'
                : 'bg-surface text-secondary hover:text-dark hover:bg-slate-100'
            }`}
          >
            {ind.name}
          </button>
        ))}
      </div>

      {/* Selected Details */}
      {activeIndustry && (
        <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
              {activeIndustry.name}
            </span>
            <h4 className="text-xl font-bold text-dark">{activeIndustry.tagline}</h4>
            <p className="text-sm text-secondary leading-relaxed">{activeIndustry.description}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {activeIndustry.keyStandards.map((std, idx) => (
                <span key={idx} className="text-[11px] font-medium px-2 py-0.5 rounded bg-surface border border-border text-secondary">
                  {std}
                </span>
              ))}
            </div>
          </div>

          <div>
            <a
              href={`/industries/${activeIndustry.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-dark hover:bg-brand-600 text-white text-xs font-semibold transition-all whitespace-nowrap"
            >
              <span>Explore {activeIndustry.name}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
