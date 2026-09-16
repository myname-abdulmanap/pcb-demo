import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface MobileMenuProps {
  currentPath?: string;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
  badge?: string;
}

const navItems: NavItem[] = [
  { id: '01', label: 'Home', href: '/' },
  { id: '02', label: 'Products', href: '/products', badge: 'FAB & PCBA' },
  { id: '03', label: 'Capabilities', href: '/capabilities', badge: 'IPC-CLASS 3' },
  { id: '04', label: 'Industries', href: '/industries' },
  { id: '05', label: 'Blog', href: '/blog' },
  { id: '06', label: 'About', href: '/about' },
  { id: '07', label: 'Contact', href: '/contact' },
];

import { getStoredLanguage, type SupportedLang } from '../../lib/i18n';

const navLabels: Record<SupportedLang, Record<string, string>> = {
  EN: {
    '01': 'Home',
    '02': 'Products',
    '03': 'Capabilities',
    '04': 'Industries',
    '05': 'Blog',
    '06': 'About',
    '07': 'Contact',
    quote: 'Get an Instant Quote',
    close: 'CLOSE',
    location: 'BOGOR HEADQUARTERS & FABRICATION',
  },
  ID: {
    '01': 'Beranda',
    '02': 'Produk',
    '03': 'Kapabilitas',
    '04': 'Industri',
    '05': 'Blog',
    '06': 'Tentang Kami',
    '07': 'Kontak',
    quote: 'Minta Penawaran Cepat',
    close: 'TUTUP',
    location: 'KANTOR PUSAT & PABRIK BOGOR',
  },
};

export default function MobileMenu({ currentPath = '' }: MobileMenuProps) {
  const [currentLang, setCurrentLang] = useState<SupportedLang>('EN');
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Sync language state
  useEffect(() => {
    setCurrentLang(getStoredLanguage());
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ lang: SupportedLang }>;
      if (customEvent.detail?.lang) {
        setCurrentLang(customEvent.detail.lang);
      }
    };
    window.addEventListener('languageChange', handleLangChange);
    return () => window.removeEventListener('languageChange', handleLangChange);
  }, []);

  // Lock/unlock background body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  // Handle open/close animations using GSAP
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);

      // Brief tick to ensure DOM is rendered before animating
      requestAnimationFrame(() => {
        if (!overlayRef.current) return;

        const items = linksContainerRef.current?.querySelectorAll<HTMLElement>('[data-menu-item]');
        
        // Kill existing running animations
        timelineRef.current?.kill();

        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
        });

        tl.set(overlayRef.current, { display: 'flex', opacity: 0 })
          .to(overlayRef.current, {
            opacity: 1,
            duration: 0.35,
            ease: 'power2.out',
          })
          .fromTo(
            headerRef.current,
            { y: -16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4 },
            '-=0.15'
          );

        if (items && items.length > 0) {
          tl.fromTo(
            items,
            {
              y: 40,
              opacity: 0,
              clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
            },
            {
              y: 0,
              opacity: 1,
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
              duration: 0.55,
              stagger: 0.055,
              ease: 'power3.out',
            },
            '-=0.25'
          );
        }

        if (footerRef.current) {
          tl.fromTo(
            footerRef.current,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4 },
            '-=0.2'
          );
        }

        timelineRef.current = tl;
      });
    } else if (isMounted) {
      // Rapid animated exit sequence
      if (overlayRef.current) {
        timelineRef.current?.kill();

        const items = linksContainerRef.current?.querySelectorAll<HTMLElement>('[data-menu-item]');

        const tl = gsap.timeline({
          defaults: { ease: 'power2.in' },
          onComplete: () => {
            setIsMounted(false);
          },
        });

        if (items && items.length > 0) {
          tl.to(items, {
            y: -15,
            opacity: 0,
            duration: 0.2,
            stagger: 0.02,
          });
        }

        tl.to(
          overlayRef.current,
          {
            opacity: 0,
            duration: 0.25,
            ease: 'power2.inOut',
          },
          '-=0.1'
        );

        timelineRef.current = tl;
      } else {
        setIsMounted(false);
      }
    }
  }, [isOpen]);

  const handleNavigate = (href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      window.location.href = href;
    }, 280);
  };

  return (
    <div className="lg:hidden">
      {/* Editorial Hamburger Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 p-2 text-dark hover:text-brand-600 focus:outline-none rounded-sm border border-border bg-white hover:border-dark transition-all"
        aria-label="Open Navigation Menu"
        aria-expanded={isOpen}
      >
        <span className="block h-0.5 w-5 bg-current rounded-full" />
        <span className="block h-0.5 w-5 bg-current rounded-full" />
        <span className="block h-0.5 w-3.5 bg-current self-start ml-0.5 rounded-full" />
      </button>

      {/* ========================================================================= */}
      {/* FULL-HEIGHT EDITORIAL MOBILE NAVIGATION / SIDEBAR (GSAP ANIMATED) */}
      {/* ========================================================================= */}
      {isMounted && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[999] w-full h-[100dvh] bg-[#111513] text-white flex flex-col justify-between overflow-y-auto overscroll-contain select-none"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Top Bar: MENU Title & Clear CLOSE Button */}
          <div
            ref={headerRef}
            className="w-full px-5 py-5 sm:px-8 sm:py-6 flex items-center justify-between border-b border-white/10 shrink-0 bg-[#111513]/95 backdrop-blur-md sticky top-0 z-20"
          >
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
              <div className="flex flex-col">
                <span className="font-mono text-xs font-bold tracking-widest text-white uppercase">
                  MENU
                </span>
                <span className="font-mono text-[9px] text-white/50 tracking-wider">
                  SYSTEM // PCB INDONESIA
                </span>
              </div>
            </div>

            {/* Clear CLOSE Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-sm border border-white/25 hover:border-white text-white font-mono text-xs font-bold tracking-wider uppercase transition-colors active:scale-95 bg-white/5 hover:bg-white/10"
              aria-label="Close Navigation Menu"
            >
              <span>{navLabels[currentLang].close}</span>
              <span className="text-sm font-light">✕</span>
            </button>
          </div>

          {/* Center Navigation Links: Editorial Typography with Staggered Entrance */}
          <div
            ref={linksContainerRef}
            className="flex-1 px-5 sm:px-8 py-6 sm:py-8 flex flex-col justify-center max-w-xl mx-auto w-full space-y-1 sm:space-y-2 overflow-y-auto"
          >
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? currentPath === '/'
                  : currentPath.startsWith(item.href);

              const displayLabel = navLabels[currentLang][item.id] || item.label;

              return (
                <div
                  key={item.id}
                  data-menu-item
                  className="w-full border-b border-white/10 py-2 sm:py-3 transition-colors group"
                >
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate(item.href);
                    }}
                    className="w-full flex items-center justify-between py-1.5 focus:outline-none min-h-[44px]"
                  >
                    <div className="flex items-baseline gap-3.5 sm:gap-5">
                      <span className="font-mono text-xs sm:text-sm font-semibold text-brand-400/80 group-hover:text-brand-300 transition-colors">
                        {item.id}
                      </span>
                      <span
                        className={`text-2xl sm:text-3xl font-extrabold uppercase font-display tracking-tight transition-colors ${
                          isActive
                            ? 'text-brand-400 font-black'
                            : 'text-white/90 group-hover:text-white group-hover:translate-x-1.5'
                        } transition-transform duration-200`}
                      >
                        {displayLabel}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {item.badge && (
                        <span className="hidden xs:inline-block font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-xs border border-white/15 text-white/60 bg-white/5">
                          {item.badge}
                        </span>
                      )}
                      <span className="font-mono text-base sm:text-lg text-white/40 group-hover:text-brand-400 group-hover:translate-x-1 transition-all duration-200">
                        →
                      </span>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>

          {/* Bottom Panel: Primary Action CTA & Domestic Contact Information */}
          <div
            ref={footerRef}
            className="w-full px-5 py-5 sm:px-8 sm:py-6 border-t border-white/10 bg-[#0D100E] shrink-0 space-y-4"
          >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="/quote"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate('/quote');
                }}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-sm bg-brand-500 hover:bg-brand-600 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors min-h-[44px] border border-brand-600 active:scale-[0.98]"
              >
                <span>{navLabels[currentLang].quote}</span>
                <span>→</span>
              </a>

              {/* Bottom Prominent CLOSE Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-5 py-3.5 rounded-sm border border-white/20 hover:border-white text-white/80 hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors text-center min-h-[44px]"
              >
                {navLabels[currentLang].close}
              </button>
            </div>

            <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-white/50 pt-1">
              <span>{navLabels[currentLang].location}</span>
              <a href="tel:+622189347721" className="text-brand-300 hover:underline">
                +62 21 8934 7721
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
