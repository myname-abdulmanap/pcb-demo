import React, { useRef, useEffect, useState } from 'react';
import { images } from '../../data/images';
import { lottieAnimations } from '../../data/lottieData';
import LottiePlayer from './LottiePlayer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface JourneyStep {
  number: string;
  name: string;
  tagline: string;
  description: string;
  leadTime: string;
  deliverables: string[];
  image: {
    src: string;
    alt: string;
  };
  lottieKey: keyof typeof lottieAnimations;
  technicalSpec: string;
}

const steps: JourneyStep[] = [
  {
    number: '01',
    name: 'Concept',
    tagline: 'System Architecture & Feasibility',
    description: 'Initial schematic definition, bill of materials (BOM) availability analysis, component obsolescence verification, and mechanical enclosure constraint validation.',
    leadTime: '1-2 Days',
    deliverables: ['Schematic Capture Verification', 'BOM Component Optimization', 'DFM Feasibility Report'],
    image: images.timeline.concept,
    lottieKey: 'concept',
    technicalSpec: 'IPC-2221 CLASS 3 FEASIBILITY AUDIT',
  },
  {
    number: '02',
    name: 'Design',
    tagline: 'High-Density CAD Layout & Routing',
    description: 'Differential pair length matching for high-speed signals, thermal relief distribution, controlled impedance geometries, and clearance rule checks.',
    leadTime: '2-4 Days',
    deliverables: ['Multi-layer Gerber RS-274X', 'IPC-2581 Digital Netlist', '3D STEP Enclosure Model'],
    image: images.timeline.design,
    lottieKey: 'design',
    technicalSpec: 'DIFFERENTIAL PAIRS • LENGTH MATCHED ±5 MIL',
  },
  {
    number: '03',
    name: 'Engineering',
    tagline: 'Stackup Simulation & DFM Audit',
    description: 'Dielectric constant (Dk/Df) matching, 50Ω/100Ω impedance calculations, copper balance audits, and automated DRC checks prior to manufacturing commitment.',
    leadTime: '12-24 Hours',
    deliverables: ['Impedance Test Coupons', 'Fabrication Panel Drawing', 'Drill & Tooling Chart'],
    image: images.timeline.engineering,
    lottieKey: 'engineering',
    technicalSpec: 'CONTROLLED IMPEDANCE ±7% TOLERANCE',
  },
  {
    number: '04',
    name: 'Prototype',
    tagline: 'Quick-Turn Multi-Layer Panelization',
    description: 'Direct laser imaging (LDI), precision CNC mechanical drilling, micro-etching, and automated solder mask application in our domestic ISO-certified cleanroom.',
    leadTime: '24-72 Hours',
    deliverables: ['1-32 Layer Raw PCB Panels', 'Microsection Cross-Section', 'E-Test Continuity Verification'],
    image: images.timeline.prototype,
    lottieKey: 'prototype',
    technicalSpec: 'LASER DIRECT IMAGING (LDI) 35µM TRACE/SPACE',
  },
  {
    number: '05',
    name: 'Testing',
    tagline: 'Automated 3D Optical & Radiographic Inspection',
    description: 'Automated optical inspection (AOI), flying probe electrical verification, impedance coupon TDR measurement, and X-ray BGA solder void density analysis.',
    leadTime: 'Same-Day',
    deliverables: ['3D AOI Inspection Log', 'X-Ray BGA Void Analysis', 'Impedance TDR Report'],
    image: images.timeline.testing,
    lottieKey: 'testing',
    technicalSpec: '3D AOI & X-RAY BGA VOID DENSITY <15%',
  },
  {
    number: '06',
    name: 'Production',
    tagline: 'Automated Cleanroom SMT Assembly',
    description: 'High-speed dual-beam pick-and-place placement down to 01005 passives, 10-zone nitrogen reflow, automated selective soldering, and conformal coating.',
    leadTime: '3-5 Days',
    deliverables: ['PCBA Production Batch', 'First Article Inspection (FAI)', 'RoHS Certificate of Conformance'],
    image: images.timeline.production,
    lottieKey: 'production',
    technicalSpec: '01005 PASSIVES & 0.35MM FINE PITCH BGA',
  },
  {
    number: '07',
    name: 'Delivery',
    tagline: 'ESD Shielded Logistics & Domestic Handover',
    description: 'Moisture barrier bag vacuum packaging with desiccant, serial tracking labels, and express domestic courier shipping with direct engineer sign-off.',
    leadTime: '24 Hours Express',
    deliverables: ['Sealed Moisture Barrier Bags', 'Faktur Pajak Invoicing', 'Traceability QR Batch Data'],
    image: images.timeline.delivery,
    lottieKey: 'delivery',
    technicalSpec: 'J-STD-033 MOISTURE BARRIER ESD PACKAGING',
  },
];

export default function ProcessJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const cursorRef = useRef<SVGCircleElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    // Desktop: SVG Zigzag Snake Path scrub animation
    mm.add('(min-width: 1024px)', () => {
      if (!containerRef.current || !pathRef.current) return;

      const path = pathRef.current;
      const pathLength = path.getTotalLength();

      // Initialize stroke dash for progressive path drawing
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // Scrub the path progressively as user scrolls down the section
      const pathTween = gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 65%',
          end: 'bottom 85%',
          scrub: 0.8,
          onUpdate: (self) => {
            const progress = self.progress;

            // Move traveling signal cursor along the SVG path
            if (cursorRef.current) {
              const point = path.getPointAtLength(progress * pathLength);
              cursorRef.current.setAttribute('cx', String(point.x));
              cursorRef.current.setAttribute('cy', String(point.y));
            }

            // Determine currently active milestone (reverses cleanly when scrolling up!)
            const activeIdx = Math.min(
              steps.length - 1,
              Math.floor(progress * steps.length)
            );
            setActiveStepIndex(activeIdx);
          },
        },
      });

      // Individual Milestone Stage Reveals (Scrubbed and Reversible)
      const stageRows = containerRef.current.querySelectorAll<HTMLElement>('[data-journey-row]');
      stageRows.forEach((row, idx) => {
        const textCol = row.querySelector<HTMLElement>('[data-stage-text]');
        const visualCol = row.querySelector<HTMLElement>('[data-stage-visual]');
        const node = row.querySelector<HTMLElement>('[data-stage-node]');

        const stageTl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 80%',
            end: 'bottom top',
            toggleActions: 'play none restart none',
          },
        });

        if (textCol && visualCol) {
          const isEven = idx % 2 === 1;
          stageTl
            .fromTo(
              node,
              { scale: 0.7, opacity: 0.4 },
              { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' }
            )
            .fromTo(
              textCol,
              { opacity: 0, x: isEven ? 30 : -30 },
              { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' },
              '-=0.3'
            )
            .fromTo(
              visualCol,
              { opacity: 0, scale: 0.95, y: 20 },
              { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'power2.out' },
              '-=0.5'
            );
        }
      });

      // Recalculate ScrollTrigger markers for all subsequent sections
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      return () => {
        pathTween.kill();
      };
    });

    // Mobile: Progressive Vertical Spine Sequence
    mm.add('(max-width: 1023px)', () => {
      if (!containerRef.current) return;

      const stageRows = containerRef.current.querySelectorAll<HTMLElement>('[data-journey-row]');
      stageRows.forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              end: 'bottom top',
              toggleActions: 'play none restart none',
            },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full py-12 lg:py-20 bg-white overflow-hidden">
      {/* ========================================================================= */}
      {/* DESKTOP BACKGROUND SVG ZIGZAG / SNAKE CIRCUIT PATH (>= 1024px) */}
      {/* ========================================================================= */}
      <div className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0">
        <svg
          viewBox="0 0 1200 3700"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Background Muted Circuit Trace */}
          <path
            d="M 600,120
               C 600,280 690,380 600,640
               C 510,900 510,1020 600,1160
               C 690,1300 690,1540 600,1680
               C 510,1820 510,2060 600,2200
               C 690,2340 690,2580 600,2720
               C 510,2860 510,3100 600,3240
               L 600,3560"
            stroke="#E5E7EB"
            strokeWidth="3"
            strokeDasharray="6 4"
            strokeLinecap="round"
          />

          {/* Active Drawing PCB Copper Trace (Scrubbed by GSAP) */}
          <path
            ref={pathRef}
            d="M 600,120
               C 600,280 690,380 600,640
               C 510,900 510,1020 600,1160
               C 690,1300 690,1540 600,1680
               C 510,1820 510,2060 600,2200
               C 690,2340 690,2580 600,2720
               C 510,2860 510,3100 600,3240
               L 600,3560"
            stroke="#087F5B"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Active Signal Traveling Probe */}
          <circle
            ref={cursorRef}
            cx="600"
            cy="120"
            r="7"
            fill="#087F5B"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            className="filter drop-shadow-sm"
          />
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* 7 ALTERNATING ZIGZAG MILESTONE STAGES */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24 sm:space-y-32 lg:space-y-40">
        {steps.map((step, idx) => {
          const isEven = idx % 2 === 1; // 0: Concept (Odd/Left), 1: Design (Even/Right), etc.
          const isActive = idx <= activeStepIndex;

          return (
            <div
              key={step.number}
              data-journey-row
              className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
            >
              {/* ========================================================================= */}
              {/* DESKTOP CENTER MILESTONE NODE (at 50% centerline) */}
              {/* ========================================================================= */}
              <div
                data-stage-node
                className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 flex-col items-center justify-center"
              >
                {/* Circular PCB Test Pad Node */}
                <div
                  className={`w-14 h-14 rounded-full border-2 flex items-center justify-center font-mono text-sm font-bold transition-all duration-500 shadow-sm ${
                    isActive
                      ? 'bg-dark text-white border-brand-500'
                      : 'bg-white text-dark/60 border-border'
                  }`}
                >
                  {step.number}
                </div>
                {/* Monospaced Vertical Stage Marker */}
                <span className="mt-2 text-[10px] font-mono font-bold tracking-widest text-brand-700 bg-white/90 px-2 py-0.5 border border-border rounded-xs">
                  {step.name.toUpperCase()}
                </span>
              </div>

              {/* ========================================================================= */}
              {/* LEFT SIDE CONTENT OR VISUAL (Depending on Zigzag Odd/Even) */}
              {/* ========================================================================= */}
              {!isEven ? (
                /* ODD STAGE (01, 03, 05, 07): LEFT IS EDITORIAL TEXT */
                <div data-stage-text className="lg:col-span-5 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-dark text-white font-mono text-xs font-bold rounded-xs">
                        {step.number} // STAGE
                      </span>
                      <span className="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider">
                        {step.name}
                      </span>
                    </div>

                    <span className="px-2.5 py-0.5 bg-surface-secondary border border-border rounded-xs font-mono text-[11px] text-dark font-medium">
                      ⚡ {step.leadTime}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-secondary block tracking-wider uppercase">
                      {step.technicalSpec}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-dark tracking-tight leading-tight">
                      {step.tagline}
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary leading-relaxed pt-1">
                      {step.description}
                    </p>
                  </div>

                  {/* Technical Deliverables Checklist */}
                  <div className="pt-4 border-t border-border space-y-2">
                    <div className="text-[11px] font-mono font-bold text-dark uppercase tracking-wider">
                      VERIFIED DELIVERABLES:
                    </div>
                    <ul className="grid grid-cols-1 gap-2 font-mono text-xs text-secondary">
                      {step.deliverables.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="text-brand-600 font-bold">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                /* EVEN STAGE (02, 04, 06): LEFT IS VISUAL + LOTTIE INTEGRATION */
                <div data-stage-visual className="lg:col-span-5 relative group">
                  <div className="relative aspect-[16/11] overflow-hidden rounded-xs border border-border bg-[#F7F7F5] shadow-sm">
                    <img
                      src={step.image.src}
                      alt={step.image.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-dark/10 pointer-events-none" />

                    {/* Integrated Interactive Lottie Animation Corner HUD */}
                    <div className="absolute top-3 right-3 p-2 bg-white/95 backdrop-blur-xs border border-border rounded-xs shadow-xs flex items-center gap-2 z-10">
                      <LottiePlayer
                        animationData={lottieAnimations[step.lottieKey]}
                        className="w-8 h-8"
                      />
                      <div className="font-mono text-[9px] text-dark leading-tight pr-1">
                        <span className="block font-bold text-brand-600">LIVE PROCESS</span>
                        <span>{step.name.toUpperCase()}</span>
                      </div>
                    </div>

                    {/* Bottom Technical Spec Coordinate Badge */}
                    <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 bg-dark/90 text-[10px] font-mono text-white/90 rounded-xs border border-white/10">
                      SYS // {step.number} • {step.technicalSpec}
                    </div>
                  </div>
                </div>
              )}

              {/* Spacer for Center SVG Snake Path on Desktop */}
              <div className="hidden lg:block lg:col-span-2" />

              {/* ========================================================================= */}
              {/* RIGHT SIDE CONTENT OR VISUAL (Depending on Zigzag Odd/Even) */}
              {/* ========================================================================= */}
              {!isEven ? (
                /* ODD STAGE (01, 03, 05, 07): RIGHT IS VISUAL + LOTTIE INTEGRATION */
                <div data-stage-visual className="lg:col-span-5 relative group">
                  <div className="relative aspect-[16/11] overflow-hidden rounded-xs border border-border bg-[#F7F7F5] shadow-sm">
                    <img
                      src={step.image.src}
                      alt={step.image.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-dark/10 pointer-events-none" />

                    {/* Integrated Interactive Lottie Animation Corner HUD */}
                    <div className="absolute top-3 right-3 p-2 bg-white/95 backdrop-blur-xs border border-border rounded-xs shadow-xs flex items-center gap-2 z-10">
                      <LottiePlayer
                        animationData={lottieAnimations[step.lottieKey]}
                        className="w-8 h-8"
                      />
                      <div className="font-mono text-[9px] text-dark leading-tight pr-1">
                        <span className="block font-bold text-brand-600">LIVE PROCESS</span>
                        <span>{step.name.toUpperCase()}</span>
                      </div>
                    </div>

                    {/* Bottom Technical Spec Coordinate Badge */}
                    <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 bg-dark/90 text-[10px] font-mono text-white/90 rounded-xs border border-white/10">
                      SYS // {step.number} • {step.technicalSpec}
                    </div>
                  </div>
                </div>
              ) : (
                /* EVEN STAGE (02, 04, 06): RIGHT IS EDITORIAL TEXT */
                <div data-stage-text className="lg:col-span-5 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-dark text-white font-mono text-xs font-bold rounded-xs">
                        {step.number} // STAGE
                      </span>
                      <span className="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider">
                        {step.name}
                      </span>
                    </div>

                    <span className="px-2.5 py-0.5 bg-surface-secondary border border-border rounded-xs font-mono text-[11px] text-dark font-medium">
                      ⚡ {step.leadTime}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-secondary block tracking-wider uppercase">
                      {step.technicalSpec}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-dark tracking-tight leading-tight">
                      {step.tagline}
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary leading-relaxed pt-1">
                      {step.description}
                    </p>
                  </div>

                  {/* Technical Deliverables Checklist */}
                  <div className="pt-4 border-t border-border space-y-2">
                    <div className="text-[11px] font-mono font-bold text-dark uppercase tracking-wider">
                      VERIFIED DELIVERABLES:
                    </div>
                    <ul className="grid grid-cols-1 gap-2 font-mono text-xs text-secondary">
                      {step.deliverables.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="text-brand-600 font-bold">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
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
