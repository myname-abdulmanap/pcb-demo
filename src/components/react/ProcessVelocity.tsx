import React, { useRef, useEffect, useState } from 'react';
import { images } from '../../data/images';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface TimelineStep {
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
}

const steps: TimelineStep[] = [
  {
    number: '01',
    name: 'Concept',
    tagline: 'System Architecture & Feasibility',
    description: 'Initial schematic definition, bill of materials (BOM) availability analysis, component obsolescence checks, and mechanical form-factor constraints verification.',
    leadTime: '1-2 Days',
    deliverables: ['Schematic Capture Verification', 'BOM Component Optimization', 'DFM Feasibility Report'],
    image: images.timeline.concept,
  },
  {
    number: '02',
    name: 'Design',
    tagline: 'High-Density CAD Layout & Routing',
    description: 'Differential pair routing, length-matching for high-speed signals, thermal relief distribution, power plane geometry, and clearance rules enforcement.',
    leadTime: '2-4 Days',
    deliverables: ['Multi-layer Gerber Files', 'IPC-2581 Netlist', '3D STEP Enclosure Model'],
    image: images.timeline.design,
  },
  {
    number: '03',
    name: 'Engineering',
    tagline: 'Stackup Simulation & DFM Audit',
    description: 'Dielectric constant (Dk/Df) matching, controlled impedance calculations, copper balance audits, and automated DRC checks before tooling commitment.',
    leadTime: '12-24 Hours',
    deliverables: ['Impedance Test Coupons', 'Fabrication Panel Drawing', 'Drill & Drill-Hole Chart'],
    image: images.timeline.engineering,
  },
  {
    number: '04',
    name: 'Prototype',
    tagline: 'Quick-Turn Multi-Layer Panelization',
    description: 'Direct laser imaging (LDI), precision CNC mechanical drilling, micro-etching, and automated solder mask application in our domestic ISO cleanroom.',
    leadTime: '24-72 Hours',
    deliverables: ['1-32 Layer Raw PCB Panels', 'Microsection Cross-Section', 'E-Test Continuity Verification'],
    image: images.timeline.prototype,
  },
  {
    number: '05',
    name: 'Testing',
    tagline: 'Automated 3D Optical & Radiographic Inspection',
    description: 'Automated optical inspection (AOI), flying probe electrical verification, impedance coupon TDR measurement, and X-ray BGA solder void density analysis.',
    leadTime: 'Same-Day',
    deliverables: ['3D AOI Inspection Log', 'X-Ray BGA Void Analysis', 'Impedance TDR Report'],
    image: images.timeline.testing,
  },
  {
    number: '06',
    name: 'Production',
    tagline: 'Automated Cleanroom SMT Assembly',
    description: 'High-speed dual-beam pick-and-place placement down to 01005 passives, 10-zone nitrogen reflow, automated selective soldering, and conformal coating.',
    leadTime: '3-5 Days (Volume)',
    deliverables: ['PCBA Production Batch', 'First Article Inspection (FAI)', 'RoHS Certificate of Conformance'],
    image: images.timeline.production,
  },
  {
    number: '07',
    name: 'Delivery',
    tagline: 'ESD Shielded Logistics & Domestic Handover',
    description: 'Moisture barrier bag vacuum packaging with desiccant, serial tracking labels, and express domestic courier shipping with direct engineer sign-off.',
    leadTime: '24 Hours Express',
    deliverables: ['Sealed Moisture Barrier Bags', 'IPC Class 3 Inspection Certificate', 'Traceability QR Batch Data'],
    image: images.timeline.delivery,
  },
];

export default function ProcessVelocity() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    // Desktop: Pinned velocity-scroll horizontal sequence
    mm.add('(min-width: 1024px)', () => {
      if (!containerRef.current || !trackRef.current) return;

      const track = trackRef.current;
      const totalWidth = track.scrollWidth - window.innerWidth + 120;

      // Quick setter for velocity skew inertia
      const skewSetter = gsap.quickTo(track, 'skewX', { duration: 0.4, ease: 'power3.out' });
      const clampSkew = gsap.utils.clamp(-3, 3);

      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        pin: true,
        scrub: 1.1,
        start: 'top top',
        end: () => `+=${Math.max(totalWidth * 1.1, 2400)}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          setProgressPercent(Math.round(progress * 100));

          // Calculate current active step based on progress
          const currentStep = Math.min(
            steps.length - 1,
            Math.floor(progress * steps.length)
          );
          setActiveStepIndex(currentStep);

          // Velocity inertia skew
          const velocity = self.getVelocity();
          const targetSkew = clampSkew(velocity / -600);
          skewSetter(targetSkew);

          // Update progress line bar
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${progress * 100}%`;
          }

          // Move the track horizontally
          gsap.set(track, { x: -progress * totalWidth });

          // Controlled parallax on images inside the cards
          const images = track.querySelectorAll<HTMLElement>('[data-process-img]');
          images.forEach((img) => {
            const shift = (progress - 0.5) * 40;
            gsap.set(img, { x: shift });
          });
        },
      });

      return () => {
        trigger.kill();
        skewSetter(0);
      };
    });

    return () => mm.revert();
  }, []);

  const scrollToStep = (index: number) => {
    if (typeof window === 'undefined') return;
    const trigger = ScrollTrigger.getById('process-velocity-trigger');
    if (trigger) {
      const targetProgress = index / (steps.length - 1);
      const targetScroll = trigger.start + targetProgress * (trigger.end - trigger.start);
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    } else if (trackRef.current) {
      // Fallback for mobile / non-pinned
      const cards = trackRef.current.querySelectorAll('article');
      if (cards[index]) {
        cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center' });
      }
    }
  };

  return (
    <div ref={containerRef} className="w-full relative bg-white py-6 lg:py-10">
      {/* Top Status & Velocity Scrub Progress Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="font-mono text-xs text-brand-700 font-bold uppercase tracking-wider">
              VELOCITY SCROLL // STAGE {steps[activeStepIndex].number} OF 07: {steps[activeStepIndex].name.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-6">
            {/* Live Progress Percentage */}
            <div className="font-mono text-xs text-secondary flex items-center gap-2">
              <span>JOURNEY PROGRESS:</span>
              <span className="font-bold text-dark">{progressPercent}%</span>
            </div>

            {/* Quick Step Indicators */}
            <div className="hidden md:flex items-center gap-1.5">
              {steps.map((step, idx) => (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => scrollToStep(idx)}
                  className={`w-6 h-6 text-[10px] font-mono font-bold rounded-xs flex items-center justify-center border transition-all ${
                    idx === activeStepIndex
                      ? 'bg-dark text-white border-dark'
                      : idx < activeStepIndex
                      ? 'bg-brand-50 text-brand-700 border-brand-300'
                      : 'bg-surface text-secondary border-border hover:border-dark'
                  }`}
                  aria-label={`Jump to stage ${step.number}: ${step.name}`}
                >
                  {step.number}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Global Progress Track Line (Desktop Velocity) */}
        <div className="w-full h-1 bg-surface-secondary rounded-full overflow-hidden mt-2">
          <div
            ref={progressBarRef}
            className="h-full bg-brand-600 transition-all duration-75 ease-out"
            style={{ width: `${(activeStepIndex / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP PINNED HORIZONTAL TRACK (>= 1024px) */}
      {/* ========================================================================= */}
      <div className="hidden lg:block overflow-hidden w-full px-8">
        <div
          ref={trackRef}
          className="flex items-stretch gap-10 will-change-transform py-4"
          style={{ width: 'max-content' }}
        >
          {steps.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <article
                key={step.number}
                className={`relative flex flex-col justify-between w-[520px] xl:w-[580px] p-8 rounded-sm border transition-all duration-300 ${
                  isActive
                    ? 'border-dark bg-white shadow-md'
                    : 'border-border bg-[#FAFAFA] opacity-85 hover:opacity-100 hover:border-dark/40'
                }`}
              >
                {/* Background Giant Watermark Index */}
                <div className="absolute right-6 top-4 font-mono font-black text-7xl text-dark/[0.04] select-none pointer-events-none">
                  {step.number}
                </div>

                {/* Card Top: Stage Number, Lead Time, Status */}
                <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-dark text-white font-mono text-xs font-bold rounded-xs">
                      {step.number}
                    </span>
                    <span className="font-mono text-xs font-bold text-brand-700 tracking-wider uppercase">
                      // {step.name}
                    </span>
                  </div>
                </div>

                {/* Middle: Authentic PCB & Manufacturing Image with Parallax Shift */}
                <div className="relative aspect-[16/9] overflow-hidden rounded-xs border border-border bg-dark/5 mb-6 group">
                  <img
                    data-process-img
                    src={step.image.src}
                    alt={step.image.alt}
                    className="w-[110%] h-[110%] max-w-none -ml-[5%] -mt-[5%] object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-dark/10 pointer-events-none" />

                  {/* Corner Inspection Coordinates Overlay */}
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-dark/80 backdrop-blur-xs text-[10px] font-mono text-white/90 rounded-xs border border-white/10">
                    STAGE {step.number} // {step.tagline}
                  </div>
                </div>

                {/* Editorial Typography & Description */}
                <div className="space-y-3 mb-6">
                  <h3 className="text-xl xl:text-2xl font-bold font-display text-dark tracking-tight">
                    {step.tagline}
                  </h3>
                  <p className="text-xs xl:text-sm text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Deliverables Checklist (Monospaced Technical Style) */}
                <div className="pt-4 border-t border-border space-y-2">
                  <div className="text-[11px] font-mono font-bold text-dark uppercase tracking-wider">
                    KEY MILESTONE DELIVERABLES:
                  </div>
                  <ul className="grid grid-cols-1 gap-1.5 font-mono text-xs text-secondary">
                    {step.deliverables.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="text-brand-600 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Industrial Circuit Connector Line to Next Stage */}
                {idx < steps.length - 1 && (
                  <div className="absolute -right-8 top-1/2 -translate-y-1/2 hidden xl:flex items-center pointer-events-none z-10">
                    <div className="w-6 h-[2px] bg-brand-500" />
                    <div className="w-2 h-2 rounded-full border border-brand-500 bg-white" />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE VERTICAL SCROLL-DRIVEN SEQUENCE (< 1024px) */}
      {/* ========================================================================= */}
      <div className="lg:hidden px-4 sm:px-6 space-y-8 relative">
        {/* Continuous Vertical Copper Trace Spine */}
        <div className="absolute left-8 sm:left-10 top-4 bottom-4 w-0.5 bg-border -z-0" />

        {steps.map((step, idx) => (
          <article
            key={step.number}
            data-mobile-process-card
            className="relative pl-10 sm:pl-14 group"
          >
            {/* Timeline Node on Spine */}
            <div className="absolute left-0 sm:left-2 top-0 w-8 h-8 rounded-full bg-white border-2 border-brand-500 flex items-center justify-center font-mono text-xs font-bold text-dark shadow-sm z-10">
              {step.number}
            </div>

            {/* Stage Card */}
            <div className="p-5 bg-white border border-border rounded-sm shadow-xs space-y-4">
              <div className="border-b border-border pb-3">
                <span className="font-mono text-xs font-bold text-brand-600 block uppercase">
                  STAGE {step.number}
                </span>
                <h3 className="text-lg font-bold font-display text-dark">
                  {step.name}
                </h3>
              </div>

              {/* Photo Frame */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-xs border border-border bg-dark/5">
                <img
                  src={step.image.src}
                  alt={step.image.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="space-y-1.5">
                <h4 className="text-sm font-bold text-dark font-display">
                  {step.tagline}
                </h4>
                <p className="text-xs text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-3 border-t border-border space-y-1.5 font-mono text-[11px] text-secondary">
                <div className="font-bold text-dark uppercase tracking-wider text-[10px]">
                  DELIVERABLES:
                </div>
                {step.deliverables.map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <span className="text-brand-600 font-bold">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
