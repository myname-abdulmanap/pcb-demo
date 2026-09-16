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
  // 1. SMOOTH SCROLL INITIALIZATION (Fast, Responsive, 1:1 Direct Feel)
  // =========================================================================
  if (!lenisInstance) {
    lenisInstance = new Lenis({
      duration: 0.75, // Rapid & snappy: no sluggish lag, no floating sensation
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Clean natural deceleration
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
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
    // 1. HERO SECTION (Direction-Aware Fade Entrance & Exit)
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

      // Parallax image shift connecting Hero to Section 2
      gsap.to('[data-hero-image-frame]', {
        yPercent: 12,
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
        .fromTo('[data-hero-copy]', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
        .fromTo('[data-hero-cta]', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
        .fromTo('[data-hero-script]', { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.2')
        .fromTo('[data-hero-image-frame]', { opacity: 0, scale: 1.02 }, { opacity: 1, scale: 1, duration: 0.5 }, '-=0.2')
        .fromTo('[data-hero-badge]', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.05 }, '-=0.2');
    });

    // =========================================================================
    // 2. LARGE EDITORIAL STATEMENT 1: "POWERING INDONESIA'S ELECTRONICS."
    // (Scroll-Driven Horizontal Movement — Travels until all text is read)
    // =========================================================================
    const statementSection = document.querySelector<HTMLElement>('[data-statement-section]');
    const statementTrack = statementSection?.querySelector<HTMLElement>('[data-statement-track]');
    const statementSubtrack = statementSection?.querySelector<HTMLElement>('[data-statement-subtrack]');

    if (statementSection && statementTrack) {
      gsap.fromTo(
        statementTrack,
        { x: '15%' },
        {
          x: () => -(statementTrack.scrollWidth - window.innerWidth + 80),
          ease: 'none',
          scrollTrigger: {
            trigger: statementSection,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        }
      );

      if (statementSubtrack) {
        gsap.fromTo(
          statementSubtrack,
          { x: '0%' },
          {
            x: () => -(statementSubtrack.scrollWidth - window.innerWidth + 40),
            ease: 'none',
            scrollTrigger: {
              trigger: statementSection,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          }
        );
      }
    }

    // =========================================================================
    // 3. BUILT FOR INDONESIA'S ELECTRONICS FUTURE (Fade In / Fade Out Lifecycle)
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
    // 4. PRODUCTS SECTION (Staggered Fade In / Fade Out Lifecycle)
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
    // 5. INDUSTRIES SECTION (Header Fade In / Fade Out Lifecycle)
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
    // 6. WHY PCB INDONESIA (Cards & 3D Icons Fade In / Fade Out Lifecycle)
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
    // 7. PROCESS SECTION: FROM CONCEPT TO PRODUCTION (Header Fade Lifecycle)
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
    // 8. SECOND EDITORIAL STATEMENT: "FROM IDEA TO CIRCUIT" (Below Process)
    // (Scroll-Driven Horizontal Movement — Travels until all text is read)
    // =========================================================================
    const statementSection2 = document.querySelector<HTMLElement>('[data-statement-section-2]');
    const statementTrack2 = statementSection2?.querySelector<HTMLElement>('[data-statement-track-2]');
    const statementSubtrack2 = statementSection2?.querySelector<HTMLElement>('[data-statement-subtrack-2]');

    if (statementSection2 && statementTrack2) {
      gsap.fromTo(
        statementTrack2,
        { x: '15%' },
        {
          x: () => -(statementTrack2.scrollWidth - window.innerWidth + 80),
          ease: 'none',
          scrollTrigger: {
            trigger: statementSection2,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        }
      );

      if (statementSubtrack2) {
        gsap.fromTo(
          statementSubtrack2,
          { x: '0%' },
          {
            x: () => -(statementSubtrack2.scrollWidth - window.innerWidth + 40),
            ease: 'none',
            scrollTrigger: {
              trigger: statementSection2,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          }
        );
      }
    }

    // =========================================================================
    // 9. OUR CLIENTS & PARTNERS (Fade In / Fade Out Lifecycle + Marquee)
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

      // Continuous dual-track marquee setup
      const track1 = clientsSection.querySelector<HTMLElement>('[data-marquee-track-1]');
      const track2 = clientsSection.querySelector<HTMLElement>('[data-marquee-track-2]');

      if (track1 && track2) {
        // Track 1 moves continuously left-to-right
        const marquee1 = gsap.to(track1, {
          xPercent: -33.333,
          ease: 'none',
          duration: 30,
          repeat: -1,
        });

        // Track 2 moves continuously right-to-left
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

        // Scroll velocity response: speeds up subtly on scroll and eases back smoothly
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

        // Subtle hover pause/slow for effortless inspection
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
    // 10. BLOG SECTION (Header & Cards Staggered Fade In / Fade Out Lifecycle)
    // =========================================================================
    const blogSection = document.querySelector('[data-blog-section]');
    if (blogSection) {
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
        blogTl.fromTo(blogHeader, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
      }

      blogTl.fromTo(
        '[data-blog-card]',
        { opacity: 0, y: 26, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08 },
        blogHeader ? '-=0.2' : '0'
      );
    }

    // =========================================================================
    // 11. FINAL CTA BANNER (Fade In / Fade Out Lifecycle)
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
        '[data-cta-box]',
        { opacity: 0, y: 24, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 }
      );
    }

    // Global refresh to ensure all trigger start/end coordinates match layout
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  });

  // Return cleanup function
  return () => {
    ctx.revert();
    mm.revert();
    if (lenisInstance) {
      lenisInstance.destroy();
      lenisInstance = null;
    }
  };
}
