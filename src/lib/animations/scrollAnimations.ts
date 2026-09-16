import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Register ScrollTrigger only in browser
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

let lenisInstance: Lenis | null = null;

export function initScrollAnimations(): () => void {
  if (typeof window === 'undefined') return () => {};

  // Respect reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return () => {};
  }

  // =========================================================================
  // 1. SMOOTH SCROLL (Desktop Only — Never fight native touch scroll on mobile)
  // =========================================================================
  const isDesktop = window.innerWidth >= 1024 && !window.matchMedia('(pointer: coarse)').matches;

  if (isDesktop && !lenisInstance) {
    lenisInstance = new Lenis({
      duration: 0.7, // Rapid & direct: no inertia lag, no floating feeling
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 0, // Never hijack touch input
    });

    lenisInstance.on('scroll', ScrollTrigger.update);

    const rafCallback = (time: number) => {
      lenisInstance?.raf(time * 1000);
    };

    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);
  }

  const mm = gsap.matchMedia();

  const ctx = gsap.context(() => {
    // =========================================================================
    // 2. HERO SECTION (Bidirectional Enter / Leave Lifecycle)
    // =========================================================================
    const heroSection = document.querySelector('section');

    mm.add('(min-width: 768px)', () => {
      if (!heroSection) return;

      const heroTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: heroSection,
          start: 'top 50%',
          end: 'bottom 15%',
          toggleActions: 'play reverse play reverse',
        },
      });

      heroTl
        .fromTo('[data-hero-eyebrow]', { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.5 })
        .fromTo('[data-hero-headline]', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
        .fromTo('[data-hero-copy]', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.4')
        .fromTo('[data-hero-cta]', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.3')
        .fromTo('[data-hero-badge]', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 }, '-=0.2')
        .fromTo(
          '[data-hero-image-frame]',
          { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', scale: 1.05 },
          { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', scale: 1, duration: 0.9, ease: 'power2.inOut' },
          '-=0.7'
        )
        .fromTo('[data-hero-script]', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .fromTo('[data-hero-floating-card]', { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.2');

      gsap.to('[data-hero-image-frame]', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    mm.add('(max-width: 767px)', () => {
      if (!heroSection) return;

      const mobileHeroTl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: heroSection,
          start: 'top 60%',
          end: 'bottom 15%',
          toggleActions: 'play reverse play reverse',
        },
      });

      mobileHeroTl
        .fromTo('[data-hero-eyebrow]', { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.4 })
        .fromTo('[data-hero-headline]', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
        .fromTo('[data-hero-copy]', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
        .fromTo('[data-hero-cta]', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
        .fromTo('[data-hero-script]', { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.2')
        .fromTo('[data-hero-image-frame]', { opacity: 0, scale: 1.02 }, { opacity: 1, scale: 1, duration: 0.5 }, '-=0.2')
        .fromTo('[data-hero-badge]', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.05 }, '-=0.2');
    });

    // =========================================================================
    // 3. FIRST EDITORIAL STATEMENT: "POWERING INDONESIA'S ELECTRONICS."
    // (Section enters -> text reveals -> typing effect -> final typography settles)
    // Bidirectional lifecycle: onEnter, onLeave, onEnterBack, onLeaveBack
    // =========================================================================
    const statementSection1 = document.querySelector<HTMLElement>('[data-statement-section]');

    if (statementSection1) {
      const metaEl = statementSection1.querySelector<HTMLElement>('[data-statement-meta]');
      const quoteMark = statementSection1.querySelector<HTMLElement>('[data-quote-mark]');
      const word1El = statementSection1.querySelector<HTMLElement>('[data-statement-word-1]');
      const typedTextEl = statementSection1.querySelector<HTMLElement>('[data-statement-typed-text]');
      const cursorEl = statementSection1.querySelector<HTMLElement>('[data-statement-cursor]');
      const quoteContainer = statementSection1.querySelector<HTMLElement>('[data-statement-quote-container]');
      const footerEl = statementSection1.querySelector<HTMLElement>('[data-statement-footer]');

      // Dynamically split typedText into individual character spans for smooth typing effect
      let charSpans: HTMLElement[] = [];
      if (typedTextEl) {
        const rawText = typedTextEl.textContent?.trim() || "Indonesia’s Electronics.”";
        typedTextEl.innerHTML = '';
        for (let i = 0; i < rawText.length; i++) {
          const char = rawText[i];
          const span = document.createElement('span');
          span.textContent = char;
          span.className = 'inline-block opacity-0 will-change-transform';
          if (char === ' ') {
            span.style.width = '0.28em';
          }
          typedTextEl.appendChild(span);
          charSpans.push(span);
        }
      }

      const stmt1Tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'power3.out' },
      });

      // 1. Metadata and Quote Mark reveal
      if (metaEl) {
        stmt1Tl.fromTo(metaEl, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.45 });
      }

      if (quoteMark) {
        stmt1Tl.fromTo(
          quoteMark,
          { opacity: 0, scale: 1.3 },
          { opacity: 0.12, scale: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.25'
        );
      }

      // 2. First Word “Powering” Masked Reveal
      if (word1El) {
        stmt1Tl.fromTo(
          word1El,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.3'
        );
      }

      // 3. Typewriter Effect for "Indonesia’s Electronics.”
      if (charSpans.length > 0) {
        stmt1Tl.fromTo(
          charSpans,
          { opacity: 0, y: 4 },
          {
            opacity: 1,
            y: 0,
            duration: 0.04,
            stagger: 0.035,
            ease: 'none',
          },
          '-=0.15'
        );
      }

      // 4. Final Typography Settles & Cursor Fades
      if (quoteContainer) {
        stmt1Tl.fromTo(
          quoteContainer,
          { scale: 1.015, letterSpacing: '0.02em' },
          { scale: 1.0, letterSpacing: 'normal', duration: 0.6, ease: 'power2.out' },
          '+=0.1'
        );
      }

      if (cursorEl) {
        stmt1Tl.to(cursorEl, { opacity: 0, duration: 0.35 }, '-=0.4');
      }

      // 5. Technical Footer Footnote Reveal
      if (footerEl) {
        stmt1Tl.fromTo(footerEl, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45 }, '-=0.3');
      }

      // Trigger bidirectional play & reverse on enter / leave / enterBack / leaveBack
      ScrollTrigger.create({
        trigger: statementSection1,
        start: 'top 75%',
        end: 'bottom 15%',
        toggleActions: 'play reverse play reverse',
        animation: stmt1Tl,
      });
    }

    // =========================================================================
    // 4. BUILT FOR INDONESIA'S ELECTRONICS FUTURE (Fade In / Fade Out Lifecycle)
    // =========================================================================
    const introSection = document.querySelector('[data-intro-section]');
    if (introSection) {
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: introSection,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play reverse play reverse',
        },
        defaults: { ease: 'power3.out' },
      });

      introTl
        .fromTo('[data-intro-text]', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          '[data-intro-image]',
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.inOut' },
          '-=0.3'
        )
        .fromTo('[data-intro-badge]', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2');
    }

    // =========================================================================
    // 5. PRODUCTS SECTION (Staggered Fade In / Fade Out Lifecycle)
    // =========================================================================
    const productsSection = document.querySelector('[data-products-section]');
    if (productsSection) {
      const productCards = gsap.utils.toArray<HTMLElement>('[data-product-card]');
      const productsTl = gsap.timeline({
        scrollTrigger: {
          trigger: productsSection,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play reverse play reverse',
        },
        defaults: { ease: 'power3.out' },
      });

      const prodHeader = productsSection.querySelector('.border-b');
      if (prodHeader) {
        productsTl.fromTo(prodHeader, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.5 });
      }

      if (productCards.length > 0) {
        productsTl.fromTo(
          productCards,
          {
            opacity: 0,
            y: 28,
            rotationX: 6,
            transformPerspective: 800,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.5,
            stagger: 0.08,
          },
          prodHeader ? '-=0.25' : '0'
        );
      }
    }

    // =========================================================================
    // 6. INDUSTRIES SECTION (Header Fade In / Fade Out Lifecycle)
    // =========================================================================
    const industriesSection = document.querySelector('[data-industries-section]');
    if (industriesSection) {
      const industriesTl = gsap.timeline({
        scrollTrigger: {
          trigger: industriesSection,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play reverse play reverse',
        },
        defaults: { ease: 'power3.out' },
      });

      industriesTl.fromTo(
        '[data-industries-header]',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6 }
      );
    }

    // =========================================================================
    // 7. WHY PCB INDONESIA (Cards & 3D Icons Fade In / Fade Out Lifecycle)
    // =========================================================================
    const whyUsSection = document.querySelector('[data-why-us-section]');
    if (whyUsSection) {
      const whyCards = gsap.utils.toArray<HTMLElement>('[data-why-us-card]');
      const icons = whyUsSection.querySelectorAll<HTMLElement>('[data-3d-icon]');

      const whyUsTl = gsap.timeline({
        scrollTrigger: {
          trigger: whyUsSection,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play reverse play reverse',
        },
        defaults: { ease: 'power3.out' },
      });

      whyUsTl
        .fromTo('[data-why-us-header]', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.5 })
        .fromTo(
          whyCards,
          { opacity: 0, y: 28, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08 },
          '-=0.2'
        )
        .fromTo(
          icons,
          { opacity: 0, y: 14, scale: 0.85 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: 'back.out(1.5)' },
          '-=0.3'
        );

      // Desktop subtle mouse move 3D tilt interaction on cards
      mm.add('(min-width: 1024px)', () => {
        whyCards.forEach((card) => {
          const icon = card.querySelector<HTMLElement>('[data-3d-icon]');

          card.addEventListener('mousemove', (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            if (icon) {
              gsap.to(icon, {
                x: x * 0.15,
                y: y * 0.15,
                rotateY: x * 0.2,
                rotateX: -y * 0.2,
                duration: 0.3,
                ease: 'power1.out',
              });
            }
          });

          card.addEventListener('mouseleave', () => {
            if (icon) {
              gsap.to(icon, {
                x: 0,
                y: 0,
                rotateY: 0,
                rotateX: 0,
                duration: 0.5,
                ease: 'power2.out',
              });
            }
          });
        });
      });
    }

    // =========================================================================
    // 8. SECOND EDITORIAL STATEMENT: "ENGINEERED FOR WHAT'S NEXT."
    // (Sequential words + clip-path reveal + subtle scale settling)
    // Bidirectional lifecycle: onEnter, onLeave, onEnterBack, onLeaveBack
    // =========================================================================
    const statementSection2 = document.querySelector<HTMLElement>('[data-statement-section-2]');

    if (statementSection2) {
      const meta2 = statementSection2.querySelector<HTMLElement>('[data-statement-2-meta]');
      const quoteMark2 = statementSection2.querySelector<HTMLElement>('[data-quote-mark-2]');
      const words2 = gsap.utils.toArray<HTMLElement>(
        statementSection2.querySelectorAll('[data-statement-2-word]')
      );
      const subtext2 = statementSection2.querySelector<HTMLElement>('[data-statement-2-subtext]');
      const footer2 = statementSection2.querySelector<HTMLElement>('[data-statement-2-footer]');

      const stmt2Tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'power3.out' },
      });

      // 1. Metadata and Background Quote Mark Reveal
      if (meta2) {
        stmt2Tl.fromTo(meta2, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.45 });
      }

      if (quoteMark2) {
        stmt2Tl.fromTo(
          quoteMark2,
          { opacity: 0, scale: 1.3 },
          { opacity: 0.12, scale: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.25'
        );
      }

      // 2. Sequential Words Clip-Path + Subtle Scale
      if (words2.length > 0) {
        stmt2Tl.fromTo(
          words2,
          {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
            y: 35,
            scale: 1.12,
            opacity: 0,
          },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.65,
            stagger: 0.12,
            ease: 'power3.out',
          },
          '-=0.2'
        );
      }

      // 3. Editorial Narrative Subtitle Reveal
      if (subtext2) {
        stmt2Tl.fromTo(
          subtext2,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.25'
        );
      }

      // 4. Bottom Specs Footer Reveal
      if (footer2) {
        stmt2Tl.fromTo(
          footer2,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.45 },
          '-=0.2'
        );
      }

      // Trigger bidirectional play & reverse on enter / leave / enterBack / leaveBack
      ScrollTrigger.create({
        trigger: statementSection2,
        start: 'top 75%',
        end: 'bottom 15%',
        toggleActions: 'play reverse play reverse',
        animation: stmt2Tl,
      });
    }

    // =========================================================================
    // 9. PROCESS SECTION: FROM CONCEPT TO PRODUCTION (Header Fade Lifecycle)
    // =========================================================================
    const processSection = document.querySelector('[data-process-section]');
    if (processSection) {
      const processTl = gsap.timeline({
        scrollTrigger: {
          trigger: processSection,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play reverse play reverse',
        },
        defaults: { ease: 'power3.out' },
      });

      processTl.fromTo(
        '[data-process-header]',
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.6 }
      );
    }

    // =========================================================================
    // 10. OUR CLIENTS & PARTNERS (Fade In / Fade Out Lifecycle + Marquee)
    // =========================================================================
    const clientsSection = document.querySelector('[data-clients-section]');
    if (clientsSection) {
      const clientsTl = gsap.timeline({
        scrollTrigger: {
          trigger: clientsSection,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play reverse play reverse',
        },
        defaults: { ease: 'power3.out' },
      });

      clientsTl
        .fromTo('[data-clients-header]', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.5 })
        .fromTo('[data-marquee-track-1]', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
        .fromTo('[data-marquee-track-2]', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2');

      const track1 = clientsSection.querySelector<HTMLElement>('[data-marquee-track-1]');
      const track2 = clientsSection.querySelector<HTMLElement>('[data-marquee-track-2]');

      if (track1 && track2) {
        const marquee1 = gsap.to(track1, {
          xPercent: -33.333,
          ease: 'none',
          duration: 30,
          repeat: -1,
        });

        const marquee2 = gsap.fromTo(
          track2,
          { xPercent: -33.333 },
          {
            xPercent: 0,
            ease: 'none',
            duration: 34,
            repeat: -1,
          }
        );

        ScrollTrigger.create({
          trigger: clientsSection,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const vel = Math.abs(self.getVelocity() / 350);
            const boost = Math.min(vel, 2.5);
            gsap.to([marquee1, marquee2], {
              timeScale: 1 + boost,
              duration: 0.3,
              overwrite: 'auto',
            });
          },
        });

        const wrap1 = track1.parentElement;
        const wrap2 = track2.parentElement;
        if (wrap1) {
          wrap1.addEventListener('mouseenter', () => gsap.to(marquee1, { timeScale: 0.25, duration: 0.4 }));
          wrap1.addEventListener('mouseleave', () => gsap.to(marquee1, { timeScale: 1.0, duration: 0.4 }));
        }
        if (wrap2) {
          wrap2.addEventListener('mouseenter', () => gsap.to(marquee2, { timeScale: 0.25, duration: 0.4 }));
          wrap2.addEventListener('mouseleave', () => gsap.to(marquee2, { timeScale: 1.0, duration: 0.4 }));
        }
      }
    }

    // =========================================================================
    // 11. BLOG SECTION (Staggered Fade In / Fade Out Lifecycle)
    // =========================================================================
    const blogSection = document.querySelector('[data-blog-section]');
    if (blogSection) {
      const blogCards = gsap.utils.toArray<HTMLElement>('[data-blog-card]');
      const blogTl = gsap.timeline({
        scrollTrigger: {
          trigger: blogSection,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play reverse play reverse',
        },
        defaults: { ease: 'power3.out' },
      });

      const blogHeader = blogSection.querySelector('.border-b');
      if (blogHeader) {
        blogTl.fromTo(blogHeader, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.5 });
      }

      if (blogCards.length > 0) {
        blogTl.fromTo(
          blogCards,
          { opacity: 0, y: 26, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08 },
          blogHeader ? '-=0.2' : '0'
        );
      }
    }

    // =========================================================================
    // 12. FINAL CTA SECTION (Fade In / Fade Out Lifecycle)
    // =========================================================================
    const ctaSection = document.querySelector('[data-cta-section]');
    if (ctaSection) {
      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: ctaSection,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play reverse play reverse',
        },
        defaults: { ease: 'power3.out' },
      });

      ctaTl.fromTo(
        ctaSection.querySelector('.bg-dark') || ctaSection,
        { opacity: 0, y: 28, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 }
      );
    }
  });

  return () => {
    ctx.revert();
    mm.revert();
  };
}
