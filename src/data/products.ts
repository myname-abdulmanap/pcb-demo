import { images } from './images';

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  overview: string;
  image: {
    src: string;
    alt: string;
  };
  icon: string;
  highlights: string[];
  capabilities: string[];
  specifications: ProductSpecification[];
  applications: string[];
  benefits: Array<{
    title: string;
    description: string;
  }>;
  process: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const productsData: ProductItem[] = [
  {
    id: "pcb-fabrication",
    slug: "pcb-fabrication",
    title: "PCB Fabrication",
    shortTitle: "Fabrication",
    tagline: "High precision PCB manufacturing with advanced layer configurations.",
    description: "High precision PCB manufacturing with various materials and layers, built to strict IPC Class 2 & Class 3 industrial standards.",
    overview: "Our PCB fabrication services deliver uncompromising reliability and tight manufacturing tolerances. Whether you need standard 2-layer boards or complex 32-layer high-density interconnect (HDI) structures, our cutting-edge manufacturing lines in Indonesia produce boards with micron-level precision, superior impedance control, and RoHS compliant finishes.",
    image: images.products.pcbFabrication,
    icon: "layers",
    highlights: [
      "1 to 32 layer count capability",
      "Standard, High-Tg FR-4, Rogers, and Aluminum cores",
      "Micron-precision laser direct imaging (LDI)",
      "100% automated optical inspection (AOI) & electrical testing",
    ],
    capabilities: [
      "Rigid PCB (1-32 layers)",
      "High Density Interconnect (HDI) with microvias",
      "Rigid-Flex & Flexible FPC",
      "Heavy Copper (up to 6 oz)",
      "Controlled Impedance (±5%)",
      "Blind & Buried Vias",
      "Via-in-Pad Plated Over (VIPPO)",
    ],
    specifications: [
      { label: "Layer Count", value: "1 – 32 Layers" },
      { label: "Base Materials", value: "FR-4 (Standard & High-Tg 170°C/180°C), Aluminum Core, Rogers RO4350B / RO4003C, Polyimide" },
      { label: "Board Thickness", value: "0.2mm – 3.2mm (±10%)" },
      { label: "Min. Trace / Spacing", value: "3 mil / 3 mil (0.075mm / 0.075mm)" },
      { label: "Min. Hole Size (CNC)", value: "0.15mm (6 mil)" },
      { label: "Min. Laser Microvia", value: "0.075mm (3 mil)" },
      { label: "Copper Weight", value: "0.5 oz – 6 oz" },
      { label: "Surface Finishes", value: "HASL Lead-Free, ENIG (Electroless Nickel Immersion Gold), Immersion Silver, OSP, Hard Gold" },
      { label: "Solder Mask Colors", value: "Green, Matte Green, Black, White, Blue, Red, Yellow" },
      { label: "Quality Compliance", value: "IPC-A-600 Class 2 / Class 3, ISO 9001, RoHS, REACH" },
    ],
    applications: [
      "Industrial automation and motor controllers",
      "High-speed networking routers and telecommunications",
      "Automotive ECU and power distribution modules",
      "IoT edge sensors and battery management systems",
      "Consumer electronics and home automation gadgets",
    ],
    benefits: [
      {
        title: "Fast Local Turnaround",
        description: "Prototypes dispatched in as little as 24 to 48 hours directly within Indonesia, avoiding long overseas customs delays.",
      },
      {
        title: "Rigorous IPC Class 3 Standards",
        description: "Zero-defect philosophy with cross-section analysis, solderability tests, and 100% flying probe electrical testing.",
      },
      {
        title: "High-Speed Signal Integrity",
        description: "Precise dielectric control and TDR testing ensure low-loss impedance matching for RF and multi-gigabit traces.",
      },
      {
        title: "Dedicated DFM Support",
        description: "Our in-house CAM engineers perform complimentary Design for Manufacturability audits before any copper is etched.",
      },
    ],
    process: [
      { step: 1, title: "Gerber & DFM Review", description: "CAM engineers verify clearances, annular rings, and layer stackup compatibility." },
      { step: 2, title: "Inner Layer Imaging & Etch", description: "Direct laser imaging transfers trace patterns onto copper foil followed by chemical etching." },
      { step: 3, title: "Lamination & Drilling", description: "Multi-layer stackups are thermally pressed under vacuum and drilled with high-speed CNC spindles." },
      { step: 4, title: "Plating & Outer Layer Processing", description: "Electroplated through-holes establish vertical continuity between layers." },
      { step: 5, title: "Solder Mask & Surface Finish", description: "Protective mask applied, followed by gold (ENIG) or lead-free HASL chemical plating." },
      { step: 6, title: "AOI, Electrical Test & Profiling", description: "100% automated optical inspection and flying-probe continuity verification before packaging." },
    ],
    faqs: [
      {
        question: "What files do I need to supply for PCB fabrication?",
        answer: "Standard RS-274X Gerber files (including copper layers, solder mask, silkscreen, and drill file in Excellon format) or ODB++ packages.",
      },
      {
        question: "Can you fabricate impedance-controlled PCBs?",
        answer: "Yes. We offer controlled impedance calculations and verification using high-precision Polar TDR instruments down to ±5% tolerance.",
      },
      {
        question: "What is your typical turnaround time for prototypes?",
        answer: "Standard 2-layer prototypes can be fabricated in 24 to 48 hours. Multilayer boards (4-8 layers) typically take 3 to 5 business days.",
      },
    ],
  },
  {
    id: "pcb-assembly",
    slug: "pcb-assembly",
    title: "PCB Assembly (PCBA)",
    shortTitle: "Assembly (PCBA)",
    tagline: "One-stop PCBA service with state-of-the-art SMT, THT, and functional testing.",
    description: "One-stop PCBA service with quality control and testing. Turnkey component sourcing, automated SMT, through-hole soldering, and firmware flashing.",
    overview: "PCB Indonesia provides comprehensive turnkey printed circuit board assembly solutions. From automated solder paste printing and ultra-precise high-speed surface mount technology (SMT) down to 01005 package size, to selective wave soldering for through-hole connectors, our facility is equipped to handle complex high-density boards with zero defects.",
    image: images.products.pcbAssembly,
    icon: "cpu",
    highlights: [
      "Turnkey, Partial Turnkey, and Consigned assembly",
      "SMT down to 01005 chips, 0.3mm pitch BGA, and QFNs",
      "3D Solder Paste Inspection (SPI) & Automated Optical Inspection (AOI)",
      "In-Circuit Testing (ICT), X-Ray inspection, and functional verification",
    ],
    capabilities: [
      "Surface Mount Technology (SMT)",
      "Through-Hole Technology (THT) / Selective Wave Soldering",
      "Mixed Technology (SMT + THT dual side)",
      "Fine-pitch BGA with X-ray inspection",
      "Conformal Coating & Potting",
      "Firmware Programming & Functional Testing",
      "Complete Box Build & Cable Harness Integration",
    ],
    specifications: [
      { label: "Assembly Types", value: "Turnkey (Component Sourcing + Fab + Assembly), Consigned (Kitted), or Hybrid" },
      { label: "SMT Component Range", value: "01005 passive chips up to 54mm x 54mm fine-pitch ICs, connectors, BGA, CSP, QFN" },
      { label: "Min. BGA Ball Pitch", value: "0.35mm with automated 3D X-Ray inspection" },
      { label: "Max. Board Size", value: "510mm x 460mm" },
      { label: "Min. Board Size", value: "50mm x 50mm (or panelized)" },
      { label: "Board Thickness", value: "0.4mm – 4.0mm" },
      { label: "Solder Types", value: "Lead-Free SAC305 (RoHS compliant), Sn63Pb37 (upon military/aerospace request)" },
      { label: "Quality Inspection", value: "3D SPI, Inline 3D AOI, 2D/3D X-Ray Inspection, First Article Inspection (FAI)" },
      { label: "Testing Services", value: "Flying Probe Test, ICT, Functional Testing (FCT), Firmware Flashing, Burn-in Testing" },
      { label: "Standards Compliance", value: "IPC-A-610 Class 2 / Class 3, ISO 9001:2015" },
    ],
    applications: [
      "Smart meters and industrial telemetry hardware",
      "Automotive sensor boards and camera modules",
      "High reliability medical patient monitors",
      "Drone flight controllers and brushless ESC motor drivers",
      "Consumer electronics, IoT wearables, and robotics",
    ],
    benefits: [
      {
        title: "Eliminate Sourcing Headaches",
        description: "We source certified authentic electronic components directly from authorized tier-1 distributors (Mouser, DigiKey, Element14, Arrow).",
      },
      {
        title: "3D X-Ray for Hidden Joints",
        description: "Full non-destructive radiographic inspection confirms voiding below 15% on all BGA, LGA, and leadless QFN solder pads.",
      },
      {
        title: "Custom Functional Test Jigs",
        description: "We build dedicated test fixtures to flash firmware, measure voltages, test RF signals, and ensure 100% working boards.",
      },
      {
        title: "ESD Protected Cleanroom Facility",
        description: "Entire assembly floor operates under strict ANSI/ESD S20.20 certified static-safe controls and humidity monitoring.",
      },
    ],
    process: [
      { step: 1, title: "BOM & Component Verification", description: "Parts matched with designators, MPNs verified against authorized distributor stocks." },
      { step: 2, title: "Solder Stencil & SPI", description: "Laser-cut electroformed stainless stencils print solder paste; 3D SPI checks paste volume." },
      { step: 3, title: "High-Speed SMT Placement", description: "Dual-gantry pick-and-place robots place thousands of micro-components per hour with micron accuracy." },
      { step: 4, title: "Multi-Zone Reflow Soldering", description: "10-zone nitrogen reflow oven applies precise thermal profiles tailored to board thermal mass." },
      { step: 5, title: "3D AOI & X-Ray Inspection", description: "Optical cameras check component presence, polarity, and skew; X-ray validates BGA balls." },
      { step: 6, title: "Through-Hole, Testing & Coating", description: "Selective wave soldering for connectors, followed by custom bed-of-nails functional test." },
    ],
    faqs: [
      {
        question: "Can I provide my own parts for assembly?",
        answer: "Yes, we accept full consignment (you send all parts), partial consignment (we source common passives, you send specialized ICs), or full turnkey.",
      },
      {
        question: "How do you verify genuine components?",
        answer: "All components procured under turnkey service come with Certificates of Conformance (CoC) from authorized franchised distributors only.",
      },
      {
        question: "Do you offer firmware flashing during assembly?",
        answer: "Yes, provide us with your binary/hex file, programmer hardware, and flashing instructions, and our test engineers will program and verify every unit.",
      },
    ],
  },
  {
    id: "pcb-design",
    slug: "pcb-design",
    title: "PCB Design Support",
    shortTitle: "Design Support",
    tagline: "Expert schematic review, high-speed routing, and DFM optimization.",
    description: "Engineering support for schematic, layout, and design optimization. Ensure first-pass manufacturing success and optimal signal integrity.",
    overview: "Avoid costly board respins and production delays with PCB Indonesia's design support services. Our seasoned hardware engineers collaborate directly with your R&D team to review schematics, route high-speed differential pairs, optimize thermal copper pours, and execute comprehensive Design for Manufacturability (DFM) and Design for Assembly (DFA) audits.",
    image: images.products.pcbDesign,
    icon: "pen-tool",
    highlights: [
      "Comprehensive DFM & DFA design rule auditing",
      "High-speed digital, RF, and mixed-signal routing",
      "Thermal management & power distribution network (PDN) simulation",
      "BOM scrubbing, lifecycle analysis, and component second-sourcing",
    ],
    capabilities: [
      "Schematic Capture & Architecture Design",
      "Multilayer PCB Layout (Altium Designer, KiCad, Cadence Allegro)",
      "High-Speed DDR4/DDR5 & PCIe Routing with Length Matching",
      "RF & Microwave Antenna Matching",
      "Thermal Dissipation & Heatsink Modeling",
      "DFM / DFA / DFT Optimization",
      "Component Obsolescence & Alternate Part Mapping",
    ],
    specifications: [
      { label: "Supported EDA Tools", value: "Altium Designer, KiCad, Cadence OrCAD/Allegro, Autodesk Eagle, Siemens PADS" },
      { label: "Routing Capabilities", value: "High-speed differential pairs, length matching down to 0.1mm, impedance control, DDRx fly-by/tree topologies" },
      { label: "Thermal Analysis", value: "Thermal via arrays, copper heat spreader calculations, component derating analysis" },
      { label: "DFM Checks", value: "Over 80 automated and manual checks covering aspect ratios, annular rings, solder mask slivers, clearance" },
      { label: "Deliverables", value: "Full schematic source files, layout files, Gerber RS-274X / ODB++, drill files, pick & place (Centroid), BOM with MPN" },
      { label: "Turnaround Time", value: "DFM Review in 4–12 hours; Complete Layouts from 3 to 10 business days" },
    ],
    applications: [
      "IoT modules requiring compact form-factors and RF antenna tuning",
      "Industrial motor drivers with high current copper isolation",
      "High-speed computing boards with PCIe, HDMI, and USB 3.2 traces",
      "Battery management systems with accurate Kelvin sense traces",
      "Low-power sensor nodes optimized for multi-year coin cell life",
    ],
    benefits: [
      {
        title: "First-Pass Success Rate >98%",
        description: "Catch footprint errors, pinout reversals, and clearance violations in CAD before committing capital to tooling.",
      },
      {
        title: "Optimized for Indonesian Supply Chain",
        description: "We verify that your specified components are readily available with minimal lead times and stable pricing.",
      },
      {
        title: "Lower Production Costs",
        description: "Our engineers optimize layer counts, hole sizes, and panel utilization to maximize board yield and reduce unit costs.",
      },
      {
        title: "Direct Engineer-to-Engineer Communication",
        description: "Work directly with local Indonesian hardware engineers fluent in Indonesian and English via Slack, Teams, or video call.",
      },
    ],
    process: [
      { step: 1, title: "Requirements & Schematic Review", description: "Engineers audit your schematic logic, power budgets, and target enclosure dimensions." },
      { step: 2, title: "Stackup & Impedance Modeling", description: "Establish layer stackup, dielectric materials, and calculate exact trace widths for target ohms." },
      { step: 3, title: "Component Placement & Thermal Planning", description: "Strategically place critical ICs, connectors, decoupling capacitors, and heat-generating parts." },
      { step: 4, title: "Precision Routing & Length Matching", description: "Route high-speed buses, analog signals, and power planes according to strict design rules." },
      { step: 5, title: "DFM/DFA Audit & DRC", description: "Perform deep Design Rule Checks to ensure smooth fabrication and zero assembly bottlenecks." },
      { step: 6, title: "Manufacturing Package Release", description: "Export complete fabrication drawings, Gerbers, BOM, centroid coordinates, and 3D STEP models." },
    ],
    faqs: [
      {
        question: "Can you help convert a schematic from KiCad to Altium?",
        answer: "Yes, our team can migrate and verify schematics and libraries across all major EDA platforms.",
      },
      {
        question: "Do you provide DFM review if we do our own layout?",
        answer: "Yes, we offer standalone DFM reviews for your existing Gerber or CAD files free of charge with fabrication orders.",
      },
      {
        question: "Do we retain full intellectual property (IP) rights?",
        answer: "Absolutely. 100% of the IP, design files, schematics, and manufacturing outputs belong exclusively to you, backed by strict NDAs.",
      },
    ],
  },
  {
    id: "prototype-custom-pcb",
    slug: "prototype-custom-pcb",
    title: "Prototype & Custom PCB",
    shortTitle: "Prototype & Custom",
    tagline: "From small-batch prototypes to high-volume customized production.",
    description: "From small-batch prototypes to high-volume production. Specialized substrates, custom shapes, rigid-flex, and quick-turn fabrication.",
    overview: "Speed to market is everything for modern hardware innovators. PCB Indonesia's Prototype & Custom PCB service provides rapid prototyping capabilities with low minimum order quantities (MOQs). Whether you are proving a concept with a 5-piece batch or ramping up to 50,000 units for mass commercial deployment, our agile manufacturing line scales seamlessly with your growth.",
    image: images.products.prototypeCustom,
    icon: "boxes",
    highlights: [
      "Low MOQ starting from just 5 prototype pieces",
      "Expedited 24 to 72 hour fast-track delivery options",
      "Specialized substrates: Rigid-Flex, Aluminum, Ceramic, Copper Core",
      "Seamless transition from pilot run to mass automated production",
    ],
    capabilities: [
      "Quick-Turn Fast-Track Prototyping",
      "Custom Outline & Milling (Complex geometries, circular, V-cut)",
      "Rigid-Flex Boards for wearable & aerospace applications",
      "Heavy Copper PCBs for high current EV & power supply equipment",
      "Impedance & RF Prototypes",
      "Pilot Run Pre-Production (50 to 500 units)",
      "Mass Production Scaling with dedicated production lines",
    ],
    specifications: [
      { label: "Minimum Order Quantity (MOQ)", value: "5 pcs for prototypes; no minimum for R&D batches" },
      { label: "Prototype Lead Time", value: "24 – 72 hours for standard FR-4 (1-4 layers)" },
      { label: "Custom Substrates", value: "Aluminum Core, Copper Base, Rogers, Teflon, Polyimide Flexible, High-Tg FR4" },
      { label: "Custom Shapes", value: "CNC Routing, V-Scoring, Tab-routing with mouse bites, Chamfered edge connectors" },
      { label: "Silkscreen & Mask Customization", value: "Custom company logos, QR codes, serial numbers, matte and gloss finishes" },
      { label: "Panelization Services", value: "Free panel design with breakaway tabs and fiducials optimized for your assembly line" },
      { label: "Scalability", value: "From 5 prototype units up to 100,000+ units/month" },
    ],
    applications: [
      "Hardware startup MVPs and investor demonstration units",
      "University research and student engineering competitions",
      "Custom sensor enclosures with non-rectangular form factors",
      "Automotive aftermarket lighting and LED display panels",
      "Wearable smart rings, watches, and flexible biomedical patches",
    ],
    benefits: [
      {
        title: "Zero Setup Penalties",
        description: "No exorbitant tooling fees on prototype orders. Test multiple revisions affordably before volume commitment.",
      },
      {
        title: "Agile Engineering Support",
        description: "Live feedback on your prototype designs within hours, ensuring zero wasted fabrication runs.",
      },
      {
        title: "Production Guarantees",
        description: "The exact same materials, stackups, and chemistry used on your prototypes are carried over into mass production.",
      },
      {
        title: "Direct Doorstep Delivery Across Indonesia",
        description: "Fast expedited shipping to Jakarta, Bandung, Surabaya, Medan, Bali, Batam, and all major Indonesian industrial parks.",
      },
    ],
    process: [
      { step: 1, title: "Instant Online Quote & File Upload", description: "Upload your Gerbers, select quantity and turnaround speed for instant pricing." },
      { step: 2, title: "Rapid Pre-Flight CAM Validation", description: "Automated DRC validates clearances within 30 minutes of order submission." },
      { step: 3, title: "Fast-Track Production Queue", description: "Boards are slotted into our dedicated rapid-prototyping fabrication cells." },
      { step: 4, title: "Automated Profiling & Inspection", description: "Laser-routed custom contours and 100% flying probe electrical testing." },
      { step: 5, title: "Express Packaging & Delivery", description: "Vacuum-sealed in moisture-barrier bags with desiccant and couriered straight to your lab." },
    ],
    faqs: [
      {
        question: "Can I order 5 different prototype designs on one panel?",
        answer: "Yes! We support multi-design panelization (combining different boards on one panel) to save you substantial fabrication costs.",
      },
      {
        question: "What is the fastest turnaround time for an emergency prototype?",
        answer: "For standard 2-layer FR-4 boards, we can complete fabrication in 24 hours with same-day or next-day courier dispatch.",
      },
      {
        question: "Do you provide stencil fabrication with prototypes?",
        answer: "Yes, we manufacture precision laser-cut frameless and framed stainless steel stencils alongside your prototype order.",
      },
    ],
  },
];
