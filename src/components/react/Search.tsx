import React, { useState, useEffect, useRef } from 'react';

interface SearchItem {
  title: string;
  category: string;
  description: string;
  href: string;
}

const searchableData: SearchItem[] = [
  { title: "PCB Fabrication", category: "Products", description: "1 to 32 layer rigid and multilayer fabrication", href: "/products/pcb-fabrication" },
  { title: "PCB Assembly (PCBA)", category: "Products", description: "Turnkey SMT, THT, and BGA assembly services", href: "/products/pcb-assembly" },
  { title: "PCB Design Support", category: "Products", description: "Schematic review, high-speed routing, and DFM", href: "/products/pcb-design" },
  { title: "Prototype & Custom PCB", category: "Products", description: "Fast turnaround 24-72h prototypes with low MOQ", href: "/products/prototype-custom-pcb" },
  { title: "Multilayer PCB", category: "Capabilities", description: "Up to 32 layer stackups with blind & buried vias", href: "/capabilities" },
  { title: "HDI PCB", category: "Capabilities", description: "Microvias and laser drilling for compact tech", href: "/capabilities" },
  { title: "SMT Assembly", category: "Capabilities", description: "01005 chips, 0.35mm BGA, and 3D SPI", href: "/capabilities" },
  { title: "Consumer Electronics", category: "Industries", description: "High-density circuitry for smart wearables and appliances", href: "/industries/consumer-electronics" },
  { title: "Industrial Automation", category: "Industries", description: "Ruggedized heavy copper boards for harsh environments", href: "/industries/industrial-automation" },
  { title: "IoT & Smart Devices", category: "Industries", description: "Ultra-low power RF circuit boards", href: "/industries/iot" },
  { title: "Automotive", category: "Industries", description: "High reliability PCB for EV battery systems and ECUs", href: "/industries/automotive" },
  { title: "Medical Devices", category: "Industries", description: "ISO 13485 compliant boards for diagnostic hardware", href: "/industries/medical" },
  { title: "How to Choose the Right PCB Material", category: "Blog", description: "Evaluating Dk, Df, and Tg for FR4 and Rogers", href: "/blog/how-to-choose-pcb-material" },
  { title: "PCB Assembly Process: Soldering to Testing", category: "Blog", description: "Inside the automated SMT pick-and-place flow", href: "/blog/pcb-assembly-process" },
  { title: "Sustainable Electronics", category: "Blog", description: "RoHS lead-free soldering and closed-loop water recovery", href: "/blog/sustainable-electronics" },
  { title: "Get a Quote", category: "Actions", description: "Upload Gerber files and get instant PCB pricing", href: "/quote" },
  { title: "About PCB Indonesia", category: "Company", description: "Our mission, manufacturing facility, and quality standards", href: "/about" },
  { title: "Contact Us", category: "Company", description: "Reach out to our engineering and sales office in Bekasi", href: "/contact" },
];

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const filtered = query.trim() === ''
    ? searchableData.slice(0, 6)
    : searchableData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="p-2 text-secondary hover:text-dark rounded-full hover:bg-black/5 transition-colors"
        aria-label="Search website (Press Ctrl+K)"
        title="Search (Ctrl+K)"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div
            className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-border overflow-hidden transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Header */}
            <div className="flex items-center px-4 border-b border-border">
              <svg className="w-5 h-5 text-secondary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, capabilities, articles, or resources..."
                className="w-full py-4 text-sm text-dark placeholder:text-secondary focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-2 py-1 text-xs text-secondary hover:text-dark bg-surface rounded border border-border"
              >
                ESC
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-border/40">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-sm text-secondary">
                  No matching results found for "{query}".
                </div>
              ) : (
                filtered.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-brand-50 transition-colors group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium px-2 py-0.5 rounded bg-brand-100 text-brand-700">
                          {item.category}
                        </span>
                        <h4 className="text-sm font-semibold text-dark group-hover:text-brand-600 transition-colors">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-xs text-secondary mt-1 line-clamp-1">{item.description}</p>
                    </div>
                    <svg className="w-4 h-4 text-secondary group-hover:text-brand-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                ))
              )}
            </div>

            {/* Footer Helper */}
            <div className="bg-surface px-4 py-2 border-t border-border flex items-center justify-between text-xs text-secondary">
              <span>Tip: Press <kbd className="px-1 py-0.5 bg-white rounded border border-border">Ctrl+K</kbd> to search anytime</span>
              <span>PCB Indonesia</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
