import React, { useState, useEffect } from 'react';

interface MobileMenuProps {
  currentPath: string;
}

export default function MobileMenu({ currentPath }: MobileMenuProps) {
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
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-dark hover:text-brand-600 focus:outline-none"
        aria-label="Toggle Navigation Menu"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 top-[72px] z-40 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Menu Panel */}
      <div
        className={`fixed top-[72px] right-0 bottom-0 w-4/5 max-w-sm bg-white z-50 shadow-2xl border-l border-border flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((item) => {
              const isActive = currentPath === item.href || (item.href !== '/' && currentPath.startsWith(item.href));
              const hasChildren = item.children && item.children.length > 0;
              const isSubmenuOpen = openSubmenu === item.label;

              return (
                <div key={item.label} className="border-b border-border/40 pb-2">
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
                        className="p-2 text-secondary hover:text-dark"
                        aria-label={`Toggle ${item.label} submenu`}
                      >
                        <svg
                          className={`w-4 h-4 transition-transform ${isSubmenuOpen ? 'rotate-180' : ''}`}
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
                    <div className="pl-4 mt-1 space-y-2 border-l-2 border-brand-200">
                      {item.children?.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="block py-1.5 text-sm text-secondary hover:text-brand-600 transition-colors"
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

        {/* Drawer Footer */}
        <div className="p-6 bg-surface border-t border-border space-y-3">
          <a
            href="/quote"
            onClick={() => setIsOpen(false)}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-medium text-sm transition-all shadow-md shadow-brand-500/20"
          >
            <span>Get a Quote</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>

          <div className="text-center text-xs text-secondary pt-2">
            <span>Direct Support: +62 21 8934 7721</span>
          </div>
        </div>
      </div>
    </div>
  );
}
