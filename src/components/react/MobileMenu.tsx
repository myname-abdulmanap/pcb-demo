import React, { useState, useEffect } from 'react';

interface MobileMenuProps {
  currentPath?: string;
}

export default function MobileMenu({ currentPath = '' }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { label: 'Home', href: '/' },
    {
      label: 'Products',
      href: '/products',
      children: [
        { label: 'PCB Fabrication', href: '/products/pcb-fabrication' },
        { label: 'PCB Assembly (PCBA)', href: '/products/pcb-assembly' },
        { label: 'PCB Design Support', href: '/products/pcb-design' },
        { label: 'Prototype & Custom PCB', href: '/products/prototype-custom-pcb' },
      ],
    },
    { label: 'Capabilities', href: '/capabilities' },
    {
      label: 'Industries',
      href: '/industries',
      children: [
        { label: 'Consumer Electronics', href: '/industries/consumer-electronics' },
        { label: 'Industrial Automation', href: '/industries/industrial-automation' },
        { label: 'IoT & Smart Devices', href: '/industries/iot' },
        { label: 'Automotive', href: '/industries/automotive' },
        { label: 'Telecommunications', href: '/industries/telecommunications' },
        { label: 'Medical Devices', href: '/industries/medical' },
        { label: 'Renewable Energy', href: '/industries/renewable-energy' },
      ],
    },
    {
      label: 'Resources',
      href: '/resources',
      children: [
        { label: 'Blog & Insights', href: '/blog' },
        { label: 'Design Guidelines', href: '/resources#guidelines' },
        { label: 'Standard Stackups', href: '/resources#stackups' },
        { label: 'FAQ', href: '/resources#faq' },
      ],
    },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <div className="lg:hidden">
      {/* Animated Hamburger / Close Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 p-2 text-dark hover:text-brand-600 focus:outline-none z-50 rounded-lg hover:bg-black/5 transition-colors"
        aria-label="Toggle Navigation Menu"
        aria-expanded={isOpen}
      >
        <span
          className={`block h-0.5 w-6 bg-current rounded-full transition-all duration-300 ease-in-out ${
            isOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-current rounded-full transition-all duration-200 ease-in-out ${
            isOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-current rounded-full transition-all duration-300 ease-in-out ${
            isOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        />
      </button>

      {/* Drawer Overlay */}
      <div
        className={`fixed inset-0 top-16 z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-200 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Slide-out Menu Panel */}
      <div
        className={`fixed top-16 right-0 bottom-0 w-[85%] max-w-sm bg-white z-50 shadow-card border-l border-border flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((item, index) => {
              const isActive = currentPath === item.href || (item.href !== '/' && currentPath.startsWith(item.href));
              const hasChildren = item.children && item.children.length > 0;
              const isSubmenuOpen = openSubmenu === item.label;

              return (
                <div
                  key={item.label}
                  className={`border-b border-border/40 pb-2 transition-all duration-300 ease-out ${
                    isOpen
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-6'
                  }`}
                  style={{ transitionDelay: isOpen ? `${index * 45 + 50}ms` : `${(navLinks.length - index) * 20}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <a
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-base font-semibold py-2 transition-colors ${
                        isActive ? 'text-brand-600 font-bold' : 'text-dark hover:text-brand-600'
                      }`}
                    >
                      {item.label}
                    </a>
                    {hasChildren && (
                      <button
                        type="button"
                        onClick={() => setOpenSubmenu(isSubmenuOpen ? null : item.label)}
                        className="p-2 text-secondary hover:text-dark transition-colors"
                        aria-label={`Toggle ${item.label} submenu`}
                      >
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${isSubmenuOpen ? 'rotate-180 text-brand-600' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {hasChildren && isSubmenuOpen && (
                    <div className="pl-4 mt-1 space-y-2 border-l-2 border-border animate-fade-in">
                      {item.children?.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="block py-1.5 text-xs font-medium text-secondary hover:text-brand-600 transition-colors"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Drawer Footer with Staggered CTA */}
        <div
          className={`p-6 bg-surface border-t border-border space-y-3 transition-all duration-300 ease-out ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: isOpen ? `${navLinks.length * 45 + 100}ms` : '0ms' }}
        >
          <a
            href="/quote"
            onClick={() => setIsOpen(false)}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-sm bg-brand-500 hover:bg-brand-600 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-colors min-h-[44px] border border-brand-600"
          >
            <span>Get a Quote</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>

          <div className="text-center text-xs text-secondary pt-1">
            <span>Direct Support: <a href="tel:+622189347721" className="font-semibold text-dark hover:underline">+62 21 8934 7721</a></span>
          </div>
        </div>
      </div>
    </div>
  );
}
