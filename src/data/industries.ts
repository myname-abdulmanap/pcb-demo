export interface IndustryItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  challenges: string[];
  solutions: string[];
  keyStandards: string[];
  applications: string[];
  stats: {
    label: string;
    value: string;
  }[];
}

export const industriesData: IndustryItem[] = [
  {
    id: "consumer-electronics",
    slug: "consumer-electronics",
    name: "Consumer Electronics",
    tagline: "Compact, high-density circuitry for the next generation of smart devices.",
    description: "From smart wearables and audio gadgets to home appliances, we deliver thin, multi-layer, and rigid-flex PCBs engineered for mass production and ergonomic form factors.",
    icon: "laptop",
    challenges: [
      "Extremely limited enclosure space requiring HDI and microvias",
      "Thermal management in fanless, sealed consumer enclosures",
      "Cost-sensitive volume production with aggressive delivery timelines",
    ],
    solutions: [
      "Ultra-thin multi-layer stackups (down to 0.4mm board thickness)",
      "High-speed SMT assembly accommodating 01005 passives and 0.35mm pitch BGAs",
      "Scalable panelization to drive down per-unit assembly costs",
    ],
    keyStandards: ["IPC Class 2", "RoHS Compliance", "REACH", "CE/FCC EMC Ready"],
    applications: [
      "Smartphones, smartwatches, and fitness trackers",
      "Wireless audio earbuds and Bluetooth speakers",
      "Smart home automation hubs and IoT thermostats",
      "Drone flight controllers and RC remote transmitters",
    ],
    stats: [
      { label: "Minimum Component Size", value: "01005" },
      { label: "Board Thickness", value: "0.2 – 3.2mm" },
      { label: "Production Capacity", value: "50,000+ pcs/mo" },
    ],
  },
  {
    id: "industrial-automation",
    slug: "industrial-automation",
    name: "Industrial Automation",
    tagline: "Ruggedized circuit solutions built to withstand harsh factory environments.",
    description: "Heavy copper boards, conformal coating, and strict component screening designed for 24/7 reliability amidst vibration, electrical noise, and extreme operating temperatures.",
    icon: "cpu",
    challenges: [
      "High ambient operating temperatures, humidity, and chemical exposure",
      "Heavy current transients, inductive kickback, and electrical noise",
      "Requirement for 10+ year operational lifespans with zero downtime",
    ],
    solutions: [
      "Heavy copper fabrication up to 6 oz for high-current power stages",
      "Automated robotic silicone and polyurethane conformal coating",
      "High-Tg FR-4 substrates (Tg 170°C – 180°C) with low CTE expansion",
    ],
    keyStandards: ["IPC-A-610 Class 3", "ISO 9001:2015", "UL 94V-0 Flame Retardant"],
    applications: [
      "Programmable Logic Controllers (PLCs) and I/O modules",
      "Variable Frequency Motor Drives (VFDs) and servo inverters",
      "Industrial robotic arm motion controllers and sensor interfaces",
      "Factory automated optical inspection (AOI) instrumentation",
    ],
    stats: [
      { label: "Max Copper Weight", value: "Up to 6 oz" },
      { label: "Substrate Rating", value: "High-Tg 180°C" },
      { label: "Conformal Coating", value: "Automated Selective" },
    ],
  },
  {
    id: "iot",
    slug: "iot",
    name: "IoT & Smart Devices",
    tagline: "Ultra-low power RF circuit boards connecting modern Indonesia.",
    description: "Specialized low-loss RF layouts, impedance-controlled trace routing, and energy-efficient power architecture for connected sensors and cellular IoT nodes.",
    icon: "wifi",
    challenges: [
      "Multi-year battery longevity demanding nanoamp sleep currents",
      "Antenna tuning and RF signal loss across compact board areas",
      "Integration of LoRa, NB-IoT, BLE, and GPS antennas in close proximity",
    ],
    solutions: [
      "Precise ±5% controlled impedance on Rogers and high-performance FR-4",
      "Custom RF matching network simulation and network analyzer testing",
      "Micro-vias and blind vias to maximize ground shielding planes",
    ],
    keyStandards: ["FCC / CE Radio Regulations", "IPC-A-600 Class 2", "RoHS"],
    applications: [
      "Smart agricultural soil moisture and weather monitoring probes",
      "Smart water, gas, and electrical utility meters (AMR/AMI)",
      "Cold-chain logistics tracking beacons and environmental monitors",
      "Smart city street lighting controllers and flood telemetry sensors",
    ],
    stats: [
      { label: "Impedance Control", value: "±5% Precision" },
      { label: "RF Substrates", value: "Rogers / FR4 Hybrid" },
      { label: "Sleep Current Optimization", value: "Sub-microamp" },
    ],
  },
  {
    id: "automotive",
    slug: "automotive",
    name: "Automotive",
    tagline: "High-reliability PCB fabrication engineered for vehicular safety and power electronics.",
    description: "Mission-critical circuit boards built to withstand thermal shock, relentless vibration, and high current loads in automotive control units and electric vehicle systems.",
    icon: "car",
    challenges: [
      "Thermal cycling between -40°C and +125°C under engine bay hoods",
      "Zero-defect tolerance for safety-critical braking and steering systems",
      "High voltage and current isolation in Electric Vehicle (EV) battery packs",
    ],
    solutions: [
      "IPC Class 3 manufacturing guidelines and stringent FAI verification",
      "Heavy copper and aluminum-backed PCBs for EV inverter thermal relief",
      "100% 3D X-Ray radiographic inspection of all BGA and power IC joints",
    ],
    keyStandards: ["IATF 16949 Mindset", "IPC-6012 Class 3", "AEC-Q Qualified Components"],
    applications: [
      "Electric vehicle (EV) Battery Management Systems (BMS)",
      "Automotive LED headlamp matrices and daytime running light drivers",
      "Advanced Driver Assistance Systems (ADAS) sensor and radar hubs",
      "In-cabin infotainment touchscreens and digital instrument clusters",
    ],
    stats: [
      { label: "Temp Cycling Range", value: "-40°C to +125°C" },
      { label: "Defect Target", value: "Zero PPM" },
      { label: "Layer Stackups", value: "Heavy Copper 4–12L" },
    ],
  },
  {
    id: "telecommunications",
    slug: "telecommunications",
    name: "Telecommunications",
    tagline: "High-frequency, low-loss PCBs powering Indonesia's 4G/5G digital infrastructure.",
    description: "High-speed backplanes, microwave transceiver boards, and optical network interfaces fabricated with low dielectric loss tangent substrates.",
    icon: "radio",
    challenges: [
      "High-frequency signal attenuation and insertion loss above 10 GHz",
      "Inter-pair and intra-pair skew across multi-gigabit differential lines",
      "Complex backplane layer counts exceeding 24 layers",
    ],
    solutions: [
      "Rogers RO4350B, RO4003C, and Panasonic Megtron 6 low-loss laminates",
      "Back-drilling of via stubs to eliminate signal reflections at high speeds",
      "Sub-picosecond skew length matching in CAD and verified via TDR",
    ],
    keyStandards: ["IPC-A-600 Class 3", "Telcordia GR-78-CORE", "RoHS"],
    applications: [
      "5G cellular small cell transceivers and massive MIMO antenna arrays",
      "Fiber-optic transponder cards and 100G/400G network switches",
      "Microwave point-to-point wireless backhaul links",
      "Satellite ground station terminals and VSAT modems",
    ],
    stats: [
      { label: "Max Signal Speed", value: "56+ Gbps PAM4" },
      { label: "Dielectric Constant (Dk)", value: "3.48 (Rogers)" },
      { label: "Via Back-Drilling", value: "Standard Capability" },
    ],
  },
  {
    id: "medical",
    slug: "medical",
    name: "Medical Devices",
    tagline: "Uncompromising precision and traceability for diagnostic and life-support hardware.",
    description: "Rigid and flex PCBs produced with full component lot traceability, cleanroom assembly, and zero-defect quality control for healthcare technologies.",
    icon: "heart-pulse",
    challenges: [
      "Stringent patient safety standards and electrical isolation barriers",
      "Ultra-compact biocompatible form factors for wearable diagnostics",
      "Rigid regulatory traceability down to individual component batch numbers",
    ],
    solutions: [
      "Full digital lot traceability for all bare boards and assembled components",
      "IPC Class 3 inspection with 100% automated optical and electrical testing",
      "Biocompatible polyimide flex circuits for non-invasive patient monitors",
    ],
    keyStandards: ["ISO 13485 Principles", "IPC Class 3", "RoHS / REACH Medical Exempt"],
    applications: [
      "Portable patient ECG/EKG and pulse oximeter monitors",
      "Digital ultrasound transducers and portable imaging devices",
      "Automated laboratory blood analyzers and centrifuge controllers",
      "Hospital ICU infusion pumps and respiratory ventilators",
    ],
    stats: [
      { label: "Inspection Coverage", value: "100% 3D AOI & X-Ray" },
      { label: "Cleanroom Standards", value: "ISO Class 7" },
      { label: "Traceability", value: "100% Barcode Tracked" },
    ],
  },
  {
    id: "renewable-energy",
    slug: "renewable-energy",
    name: "Renewable Energy",
    tagline: "High-efficiency power electronics driving green solar and energy storage systems.",
    description: "Heavy copper power boards, aluminum core LED substrates, and high-voltage DC-DC converters engineered for Indonesia's clean energy transition.",
    icon: "sun",
    challenges: [
      "High continuous DC voltages (up to 1500V) in solar string inverters",
      "Massive thermal dissipation required from high-power IGBT/MOSFET switches",
      "Outdoor exposure to tropical heat, humidity, and UV degradation",
    ],
    solutions: [
      "Aluminum core Metal Clad PCBs (MCPCB) with 2.0–3.0 W/m·K thermal conductivity",
      "Wide creepage and clearance routing with high CTI (Comparative Tracking Index) laminates",
      "Heavy copper 3 oz – 6 oz inner and outer layers for high current paths",
    ],
    keyStandards: ["IEC 62109 Safety", "UL 746E", "IPC-2221 Creepage & Clearance"],
    applications: [
      "Solar grid-tie and off-grid micro-inverters",
      "Battery Energy Storage Systems (BESS) charge controllers",
      "EV fast-charging station power conversion modules",
      "Micro-hydro and wind turbine MPPT telemetry controllers",
    ],
    stats: [
      { label: "Thermal Conductivity", value: "Up to 3.0 W/m·K" },
      { label: "Continuous Voltage", value: "Up to 1500V DC" },
      { label: "Substrate Type", value: "Aluminum MCPCB / FR4" },
    ],
  },
];
