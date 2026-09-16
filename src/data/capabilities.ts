export interface CapabilityItem {
  id: string;
  title: string;
  category: "fabrication" | "assembly" | "testing" | "engineering";
  description: string;
  icon: string;
  specs: string[];
}

export const capabilitiesData: CapabilityItem[] = [
  {
    id: "pcb-fabrication",
    title: "PCB Fabrication",
    category: "fabrication",
    description: "Multi-layer rigid PCB manufacturing from 1 to 32 layers with high thermal dissipation and tight tolerances.",
    icon: "layers",
    specs: ["1–32 Layers", "FR4 / High-Tg / Rogers", "3mil/3mil Min Trace/Space"],
  },
  {
    id: "multilayer-pcb",
    title: "Multilayer PCB",
    category: "fabrication",
    description: "Advanced layer stackups with high-Tg substrates, blind and buried vias for complex electronic systems.",
    icon: "grid",
    specs: ["Up to 32 Layers", "Blind & Buried Vias", "Controlled Impedance ±5%"],
  },
  {
    id: "hdi-pcb",
    title: "HDI PCB",
    category: "fabrication",
    description: "High-Density Interconnect boards with microvias and fine line spacing for compact high-performance devices.",
    icon: "minimize-2",
    specs: ["Laser Microvias 3 mil", "Via-in-Pad Plating", "Any-Layer HDI"],
  },
  {
    id: "flexible-pcb",
    title: "Flexible PCB",
    category: "fabrication",
    description: "Single-sided, double-sided, and multilayer flex circuits and rigid-flex hybrids for space-constrained applications.",
    icon: "repeat",
    specs: ["Polyimide Substrate", "Dynamic Flex Life", "Rigid-Flex Combinations"],
  },
  {
    id: "pcb-assembly",
    title: "PCB Assembly",
    category: "assembly",
    description: "Turnkey electronic manufacturing services with automated SMT and selective wave soldering.",
    icon: "cpu",
    specs: ["Turnkey / Consigned", "Lead-free SAC305", "Class 2 / Class 3 IPC"],
  },
  {
    id: "smt-assembly",
    title: "SMT Assembly",
    category: "assembly",
    description: "High-speed surface mount technology placing microscopic 01005 components, BGAs, and fine-pitch ICs.",
    icon: "crosshair",
    specs: ["01005 Package Support", "0.35mm Pitch BGA", "Dual-Gantry High-Speed"],
  },
  {
    id: "tht-assembly",
    title: "THT Assembly",
    category: "assembly",
    description: "Through-hole assembly using automated wave soldering and selective robotic soldering for rugged connectors.",
    icon: "git-commit",
    specs: ["Selective Wave Soldering", "Manual IPC Certified Hand", "Heavy Terminals"],
  },
  {
    id: "prototype-manufacturing",
    title: "Prototype Manufacturing",
    category: "fabrication",
    description: "Rapid turnaround prototype runs to validate designs quickly before committing to full-scale production.",
    icon: "zap",
    specs: ["24–48h Quick Turn", "Low MOQ from 5 pcs", "Full Electrical Testing"],
  },
  {
    id: "quality-inspection",
    title: "Quality Inspection",
    category: "testing",
    description: "Comprehensive QA including 3D AOI, solder paste inspection, and high-resolution X-ray imaging for BGA packages.",
    icon: "check-circle",
    specs: ["3D Inline AOI", "3D Solder Paste (SPI)", "High-Resolution 2D/3D X-Ray"],
  },
  {
    id: "functional-testing",
    title: "Functional Testing",
    category: "testing",
    description: "Custom test jigs, bed-of-nails fixtures, firmware flashing, and functional verification for 100% working units.",
    icon: "activity",
    specs: ["Custom Test Fixtures", "In-Circuit Testing (ICT)", "Firmware Programming & Burn-In"],
  },
];
