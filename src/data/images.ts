export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export const images = {
  hero: {
    pcbMain: {
      src: "/images/hero-pcb-main.jpg",
      alt: "Macro photography of high-precision green multi-layer PCB with ENIG gold contact pads and surface mount components",
      width: 1200,
      height: 900,
    },
    pcbCloseUp: {
      src: "/images/hero-pcb-main.jpg",
      alt: "Macro photography of precision surface mount components on PCB substrate",
      width: 1000,
      height: 700,
    },
  },
  introducing: {
    factoryCleanroom: {
      src: "/images/factory-cleanroom.jpg",
      alt: "Automated high-tech SMT electronics cleanroom assembly line in Bogor manufacturing facility",
      width: 1200,
      height: 900,
    },
  },
  products: {
    pcbFabrication: {
      src: "/images/product-pcb-fabrication.jpg",
      alt: "High-density multi-panel bare PCB fabrication panel with gold ENIG finish and routed breakaway tabs",
      width: 800,
      height: 450,
    },
    pcbAssembly: {
      src: "/images/product-pcb-assembly.jpg",
      alt: "High-speed automated robotic SMT pick-and-place nozzle placing microchip on circuit board",
      width: 800,
      height: 450,
    },
    pcbDesign: {
      src: "/images/product-pcb-design.jpg",
      alt: "Hardware engineering CAD workstation with 3D multi-layer PCB routing layout and schematic",
      width: 800,
      height: 450,
    },
    prototypeCustom: {
      src: "/images/product-prototype-custom.jpg",
      alt: "Custom prototype printed circuit boards in multiple solder mask colors with gold edge fingers",
      width: 800,
      height: 450,
    },
  },
  timeline: {
    concept: {
      src: "/images/process-concept.jpg",
      alt: "System architecture and circuit schematic planning on engineering tablet with components",
    },
    design: {
      src: "/images/process-design.jpg",
      alt: "High-speed multi-layer PCB CAD trace layout and differential impedance routing on screen",
    },
    engineering: {
      src: "/images/process-engineering.jpg",
      alt: "DFM verification, 8-layer copper stackup calculation, and impedance simulation graph",
    },
    prototype: {
      src: "/images/process-prototype.jpg",
      alt: "High precision CNC PCB prototyping mill carving fine copper circuit tracks on laminate",
    },
    testing: {
      src: "/images/pcb-aoi-inspection.jpg",
      alt: "Automated 3D optical inspection (AOI) and radiographic X-ray testing machine in cleanroom",
    },
    production: {
      src: "/images/process-production.jpg",
      alt: "High-volume automated cleanroom SMT line with reflow soldering oven",
    },
    delivery: {
      src: "/images/process-delivery.jpg",
      alt: "ESD moisture barrier vacuum sealed PCB batches with QC PASS certification stickers",
    },
  },
  industries: {
    consumerElectronics: {
      src: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=900&q=80",
      alt: "Ultra-compact multi-layer PCB for consumer wearables and smart hardware",
      width: 900,
      height: 600,
    },
    industrialAutomation: {
      src: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=900&q=80",
      alt: "Heavy copper high-reliability PCB for industrial PLCs and robotic drivers",
      width: 900,
      height: 600,
    },
    iot: {
      src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=80",
      alt: "Low-power RF wireless sensor node PCB with integrated trace antennas",
      width: 900,
      height: 600,
    },
    automotive: {
      src: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=900&q=80",
      alt: "IATF 16949-grade automotive ECU and battery management system circuit board",
      width: 900,
      height: 600,
    },
    telecommunications: {
      src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=900&q=80",
      alt: "5G high-frequency Rogers substrate PCB array for telecommunication base stations",
      width: 900,
      height: 600,
    },
    medical: {
      src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80",
      alt: "ISO 13485-certified bio-signal amplifier and diagnostic medical device PCB",
      width: 900,
      height: 600,
    },
    renewableEnergy: {
      src: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=900&q=80",
      alt: "High-voltage metal-core PCB (MCPCB) for solar inverters and power conversion",
      width: 900,
      height: 600,
    },
  },
  blog: {
    material: {
      src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      alt: "Close-up macro of fiberglass substrate and copper layer in high performance PCB",
      width: 800,
      height: 480,
    },
    assembly: {
      src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      alt: "Automated high-speed precision robotic SMT placement machinery",
      width: 800,
      height: 480,
    },
    sustainability: {
      src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
      alt: "Eco-friendly RoHS lead-free circuit board architecture",
      width: 800,
      height: 480,
    },
  },
  about: {
    team: {
      src: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80",
      alt: "Integrated microchip mounted on high-precision circuit board substrate",
      width: 1200,
      height: 700,
    },
  },
};
