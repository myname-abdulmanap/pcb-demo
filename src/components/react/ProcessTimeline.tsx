import React, { useState } from 'react';
import { images } from '../../data/images';

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
    description: 'Initial schematic definition, bill of materials (BOM) availability analysis, and mechanical form-factor constraints verification.',
    leadTime: '1-2 Days',
    deliverables: ['Schematic Capture', 'BOM Component Optimization', 'DFM Feasibility Report'],
    image: images.timeline.concept,
  },
  {
    number: '02',
    name: 'Design',
    tagline: 'High-Density CAD Layout & Routing',
    description: 'Differential pair routing, length-matching for high-speed signals, thermal relief distribution, and clearance rules enforcement.',
    leadTime: '2-4 Days',
    deliverables: ['Multi-layer Gerber Files', 'IPC-2581 Netlist', '3D STEP Enclosure Model'],
    image: images.timeline.design,
  },
  {
    number: '03',
    name: 'Engineering',
    tagline: 'Stackup Simulation & DFM Audit',
    description: 'Dielectric constant (Dk/Df) matching, controlled impedance calculations, copper balance audits, and automated DRC checks.',
    leadTime: '12-24 Hours',
    deliverables: ['Impedance Test Coupons', 'Fabrication Panel Drawing', 'Drill & Drill-Hole Chart'],
    image: images.timeline.engineering,
  },
  {
    number: '04',
    name: 'Prototype',
    tagline: 'Quick-Turn Multi-Layer Panelization',
    description: 'Direct laser imaging (LDI), precision CNC mechanical drilling, micro-etching, and automated solder mask application.',
    leadTime: '24-72 Hours',
    deliverables: ['1-32 Layer Raw PCB Panels', 'Microsection Cross-Section', 'E-Test Continuity Verification'],
    image: images.timeline.prototype,
  },
  {
    number: '05',
    name: 'Testing',
    tagline: 'Automated 3D Optical & Radiographic Inspection',
    description: 'Automated optical inspection (AOI), flying probe electrical verification, and X-ray BGA solder void density analysis.',
    leadTime: 'Same-Day',
    deliverables: ['3D AOI Inspection Log', 'X-Ray BGA Void Analysis', 'Impedance TDR Report'],
    image: images.timeline.testing,
  },
  {
    number: '06',
    name: 'Production',
    tagline: 'Automated Cleanroom SMT Assembly',
    description: 'High-speed dual-beam pick-and-place placement down to 01005 passives, 10-zone nitrogen reflow, and conformal coating.',
    leadTime: '3-5 Days (Volume)',
    deliverables: ['PCBA Production Batch', 'First Article Inspection (FAI)', 'RoHS Certificate of Conformance'],
    image: images.timeline.production,
  },
  {
    number: '07',
    name: 'Delivery',
    tagline: 'ESD Shielded Logistics & Domestic Handover',
    description: 'Moisture barrier bag vacuum packaging with desiccant, serial tracking labels, and express domestic courier shipping.',
    leadTime: '24 Hours Express',
    deliverables: ['Sealed Moisture Barrier Bags', 'IPC Class 3 Inspection Certificate', 'Traceability QR Batch Data'],
    image: images.timeline.delivery,
  },
];

export default function ProcessTimeline() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = steps[activeStepIndex];

  return (
    <div className="w-full">
      {/* ========================================================================= */}
      {/* DESKTOP TIMELINE (>= 1024px) */}
      {/* ========================================================================= */}
      <div className="hidden lg:block space-y-8">
        {/* Horizontal Navigation Track */}
        <div className="relative border-b border-border pb-6">
          {/* Background Connecting Line */}
          <div className="absolute top-4 left-4 right-4 h-0.5 bg-border -z-0" />
          {/* Active Progress Fill */}
          <div
            className="absolute top-4 left-4 h-0.5 bg-brand-500 transition-all duration-500 ease-out -z-0"
            style={{ width: `${(activeStepIndex / (steps.length - 1)) * 96}%` }}
          />

          <div className="flex items-center justify-between relative z-10">
            {steps.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              const isPast = idx < activeStepIndex;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActiveStepIndex(idx)}
                  className="flex flex-col items-center group focus:outline-none"
                >
                  {/* Step Node */}
                  <div
                    className={`w-9 h-9 rounded-sm flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                      isActive
                        ? 'bg-brand-500 text-white border-2 border-dark shadow-sm'
                        : isPast
                        ? 'bg-brand-50 text-brand-700 border border-brand-300'
                        : 'bg-white text-secondary border border-border group-hover:border-dark'
                    }`}
                  >
                    {step.number}
                  </div>

                  {/* Step Label */}
                  <span
                    className={`mt-3 font-mono text-xs uppercase tracking-wider transition-colors ${
                      isActive ? 'text-dark font-bold' : 'text-secondary group-hover:text-dark'
                    }`}
                  >
                    {step.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Milestone Detail Stage */}
        <div className="grid grid-cols-12 gap-10 items-center p-8 bg-white border border-border rounded-sm">
          {/* Left Narrative */}
          <div className="col-span-6 space-y-5">
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="px-2 py-0.5 bg-brand-50 border border-brand-200 text-brand-700 font-bold rounded-sm">
                STAGE // {activeStep.number} OF 07
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-bold font-display text-dark tracking-tight">
                {activeStep.tagline}
              </h3>
              <p className="text-sm text-secondary leading-relaxed mt-2">
                {activeStep.description}
              </p>
            </div>

            {/* Deliverables Checklist */}
            <div className="space-y-2 pt-2 border-t border-border">
              <span className="text-[11px] font-mono uppercase tracking-wider text-secondary/80 block">
                Engineering Deliverables:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeStep.deliverables.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 font-mono text-xs text-dark">
                    <span className="text-brand-600 font-bold">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step Navigation Controls */}
            <div className="flex items-center gap-3 pt-3">
              <button
                type="button"
                disabled={activeStepIndex === 0}
                onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 border border-border text-dark text-xs font-mono disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-secondary transition-colors"
              >
                ← PREVIOUS STAGE
              </button>
              <button
                type="button"
                disabled={activeStepIndex === steps.length - 1}
                onClick={() => setActiveStepIndex((prev) => Math.min(steps.length - 1, prev + 1))}
                className="px-4 py-2 bg-dark text-white text-xs font-mono disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brand-600 transition-colors"
              >
                NEXT STAGE →
              </button>
            </div>
          </div>

          {/* Right Image Stage */}
          <div className="col-span-6">
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-border bg-surface-secondary">
              <img
                key={activeStep.image.src}
                src={activeStep.image.src}
                alt={activeStep.image.alt}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-dark/5 pointer-events-none" />
              <div className="absolute bottom-3 left-3 bg-dark/90 text-white font-mono text-[10px] px-2.5 py-1 rounded-sm">
                VERIFIED PROCESS // {activeStep.name.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE VERTICAL TIMELINE (< 1024px) */}
      {/* ========================================================================= */}
      <div className="lg:hidden space-y-6">
        {steps.map((step, idx) => (
          <div
            key={step.number}
            className="p-5 bg-white border border-border rounded-sm space-y-4"
          >
            <div className="pb-3 border-b border-border font-mono text-xs">
              <span className="text-brand-600 font-bold">{step.number} // {step.name.toUpperCase()}</span>
            </div>

            <div className="relative aspect-[16/9] overflow-hidden rounded-sm border border-border bg-surface-secondary">
              <img
                src={step.image.src}
                alt={step.image.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div>
              <h4 className="text-base font-bold font-display text-dark">
                {step.tagline}
              </h4>
              <p className="text-xs text-secondary mt-1 leading-relaxed">
                {step.description}
              </p>
            </div>

            <div className="pt-2 border-t border-border space-y-1">
              {step.deliverables.map((item, i) => (
                <div key={i} className="flex items-center gap-2 font-mono text-[11px] text-dark">
                  <span className="text-brand-600 font-bold">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
