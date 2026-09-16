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
  const mobileLineRef = useRef<SVGLineElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    // =========================================================================
    // DESKTOP: SVG Zigzag Snake Path scrub animation (>= 1024px)
    // =========================================================================
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

            // Determine currently active milestone
            const activeIdx = Math.min(
              steps.length - 1,
              Math.floor(progress * steps.length)
            );
            setActiveStepIndex(activeIdx);
          },
        },
      });

      // Individual Milestone Stage Reveals on Desktop
      const stageRows = containerRef.current.querySelectorAll<HTMLElement>('[data-journey-row-desktop]');
      stageRows.forEach((row, idx) => {
        const textCol = row.querySelector<HTMLElement>('[data-stage-text]');
        const visualCol = row.querySelector<HTMLElement>('[data-stage-visual]');
        const node = row.querySelector<HTMLElement>('[data-stage-node]');

        const stageTl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 80%',
            end: 'bottom top',
            toggleActions: 'play reverse play reverse',
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

      return () => {
        pathTween.kill();
      };
    });

    // =========================================================================
    // MOBILE: Progressive Vertical Circuit Spine (< 1024px)
    // =========================================================================
    mm.add('(max-width: 1023px)', () => {
      if (!containerRef.current) return;

      // Progressive drawing of vertical mobile circuit trace
      if (mobileLineRef.current) {
        const line = mobileLineRef.current;
        const lineLength = 1000;

        gsap.set(line, {
          strokeDasharray: lineLength,
          strokeDashoffset: lineLength,
        });

        gsap.to(line, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'bottom 85%',
            scrub: 0.5,
          },
        });
      }

      // Vertical Stage Cards reveal
      const mobileCards = containerRef.current.querySelectorAll<HTMLElement>('[data-mobile-journey-card]');
      mobileCards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full py-10 lg:py-20 bg-white overflow-hidden">
      {/* ========================================================================= */}
      {/* 1. DESKTOP VIEW (>= 1024px): ZIGZAG CURVED CIRCUIT PATH */}
      {/* ========================================================================= */}
      <div className="hidden lg:block">
        {/* Background SVG Zigzag Snake Path */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
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

        {/* 7 Alternating Zigzag Desktop Rows */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-36">
          {steps.map((step, idx) => {
            const isEven = idx % 2 === 1;
            const isActive = idx <= activeStepIndex;

            return (
              <div
                key={step.number}
                data-journey-row-desktop
                className="relative grid grid-cols-12 gap-16 items-center"
              >
                {/* Desktop Center Milestone Node */}
                <div
                  data-stage-node
                  className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center"
                >
                  <div
                    className={`w-14 h-14 rounded-full border-2 flex items-center justify-center font-mono text-sm font-bold transition-all duration-500 shadow-sm ${
                      isActive
                        ? 'bg-dark text-white border-brand-500'
                        : 'bg-white text-secondary border-border'
                    }`}
                  >
                    <span>{step.number}</span>
                  </div>
                  <span
                    className={`text-[11px] font-mono font-bold uppercase mt-1 px-2 py-0.5 rounded-xs transition-colors ${
                      isActive
                        ? 'text-brand-600 bg-white border border-brand-200'
                        : 'text-secondary/60 bg-transparent'
                    }`}
                  >
                    {step.name}
                  </span>
                </div>

                {/* Left Side Content or Visual */}
                {!isEven ? (
                  /* Odd Stage (01, 03, 05, 07): Left is Text */
                  <div data-stage-text className="col-span-5 space-y-4 pr-4">
                    <div className="flex items-center justify-between">
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
                      <h3 className="text-3xl font-extrabold font-display text-dark tracking-tight leading-tight">
                        {step.tagline}
                      </h3>
                      <p className="text-sm text-secondary leading-relaxed pt-1">
                        {step.description}
                      </p>
                    </div>

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
                  /* Even Stage (02, 04, 06): Left is Visual */
                  <div data-stage-visual className="col-span-5 relative group">
                    <div className="relative aspect-[16/11] overflow-hidden rounded-xs border border-border bg-[#F7F7F5] shadow-sm">
                      <img
                        src={step.image.src}
                        alt={step.image.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-dark/10 pointer-events-none" />

                      {/* Integrated Interactive Lottie HUD */}
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

                      <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 bg-dark/90 text-[10px] font-mono text-white/90 rounded-xs border border-white/10">
                        SYS // {step.number} • {step.technicalSpec}
                      </div>
                    </div>
                  </div>
                )}

                {/* Center Column Spacer for SVG Path */}
                <div className="col-span-2" />

                {/* Right Side Content or Visual */}
                {!isEven ? (
                  /* Odd Stage: Right is Visual */
                  <div data-stage-visual className="col-span-5 relative group">
                    <div className="relative aspect-[16/11] overflow-hidden rounded-xs border border-border bg-[#F7F7F5] shadow-sm">
                      <img
                        src={step.image.src}
                        alt={step.image.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-dark/10 pointer-events-none" />

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

                      <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 bg-dark/90 text-[10px] font-mono text-white/90 rounded-xs border border-white/10">
                        SYS // {step.number} • {step.technicalSpec}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Even Stage: Right is Text */
                  <div data-stage-text className="col-span-5 space-y-4 pl-4">
                    <div className="flex items-center justify-between">
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
                      <h3 className="text-3xl font-extrabold font-display text-dark tracking-tight leading-tight">
                        {step.tagline}
                      </h3>
                      <p className="text-sm text-secondary leading-relaxed pt-1">
                        {step.description}
                      </p>
                    </div>

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

      {/* ========================================================================= */}
      {/* 2. MOBILE VIEW (< 1024px): DEDICATED PROGRESSIVE VERTICAL PIPELINE */}
      {/* ========================================================================= */}
      <div className="block lg:hidden relative px-4 sm:px-6">
        {/* Continuous Left Vertical Circuit Spine */}
        <div className="absolute left-7 sm:left-9 top-6 bottom-10 w-1 pointer-events-none z-0">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 2 1000">
            {/* Background Muted Trace */}
            <line
              x1="1"
              y1="0"
              x2="1"
              y2="1000"
              stroke="#E5E7EB"
              strokeWidth="2"
              strokeDasharray="4 3"
            />
            {/* Foreground Green Circuit Line Drawn Progressively */}
            <line
              ref={mobileLineRef}
              x1="1"
              y1="0"
              x2="1"
              y2="1000"
              stroke="#087F5B"
              strokeWidth="3"
            />
          </svg>
        </div>

        {/* 7 Vertically Stacked Milestones in Clean Sequential Hierarchy */}
        <div className="relative z-10 space-y-12 sm:space-y-16 pl-10 sm:pl-14">
          {steps.map((step) => (
            <div
              key={step.number}
              data-mobile-journey-card
              className="relative bg-white border border-border rounded-sm p-4 sm:p-6 shadow-xs space-y-4"
            >
              {/* Circular Left Node Connected to Progressive Spine */}
              <div className="absolute -left-10 sm:-left-14 top-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-dark text-white border-2 border-brand-500 font-mono text-xs font-bold flex items-center justify-center shadow-xs">
                {step.number}
              </div>

              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-brand-600 uppercase tracking-wider">
                    STAGE {step.number} // {step.name}
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-surface-secondary border border-border rounded-xs font-mono text-[10px] text-dark font-medium">
                  ⚡ {step.leadTime}
                </span>
              </div>

              {/* Title and Specs */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-secondary uppercase block tracking-wider">
                  {step.technicalSpec}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-dark tracking-tight leading-snug">
                  {step.tagline}
                </h3>
                <p className="text-xs text-secondary leading-relaxed pt-1">
                  {step.description}
                </p>
              </div>

              {/* Responsive Visual Frame with Responsive Lottie */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xs border border-border bg-[#F7F7F5]">
                <img
                  src={step.image.src}
                  alt={step.image.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-dark/5 pointer-events-none" />

                {/* Mobile Lottie Corner HUD (Safe Size, No Canvas Overflow) */}
                <div className="absolute top-2 right-2 p-1.5 bg-white/95 backdrop-blur-xs border border-border rounded-xs shadow-xs flex items-center gap-1.5 z-10">
                  <LottiePlayer
                    animationData={lottieAnimations[step.lottieKey]}
                    className="w-6 h-6"
                  />
                  <div className="font-mono text-[8px] text-dark leading-tight pr-1">
                    <span className="block font-bold text-brand-600">LIVE</span>
                    <span>{step.name.toUpperCase()}</span>
                  </div>
                </div>
              </div>

              {/* Deliverables */}
              <div className="pt-2">
                <div className="text-[10px] font-mono font-bold text-dark uppercase tracking-wider mb-1.5">
                  DELIVERABLES:
                </div>
                <ul className="space-y-1 font-mono text-[11px] text-secondary">
                  {step.deliverables.map((item) => (
                    <li key={item} className="flex items-center gap-1.5">
                      <span className="text-brand-600 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
