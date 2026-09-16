export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export const images = {
  hero: {
    pcbMain: {
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      alt: "High-density multi-layer green printed circuit board with soldered microchips and gold traces",
      width: 1200,
      height: 800,
    },
    pcbCloseUp: {
      src: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1000&q=80",
      alt: "Macro photography of precision surface mount components on PCB substrate",
      width: 1000,
      height: 700,
    },
  },
  introducing: {
    factoryCleanroom: {
      src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
      alt: "Illuminated high-precision printed circuit board architecture with microscopic traces",
      width: 1200,
      height: 800,
    },
  },
  products: {
    pcbFabrication: {
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      alt: "Stacked multi-layer FR-4 and Rogers high-frequency printed circuit boards",
      width: 800,
      height: 500,
    },
    pcbAssembly: {
      src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      alt: "High-speed automated robotic surface mount technology (SMT) pick-and-place assembly line",
      width: 800,
      height: 500,
    },
    pcbDesign: {
      src: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80",
      alt: "High-density PCB circuit routing, impedance control traces and CAD layout",
      width: 800,
      height: 500,
    },
    prototypeCustom: {
      src: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80",
      alt: "Rapid turnaround custom prototype printed circuit board panels",
      width: 800,
      height: 500,
    },
  },
  timeline: {
    concept: {
      src: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=800&q=80",
      alt: "System architecture and circuit schematic planning",
    },
    design: {
      src: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80",
      alt: "High-speed multi-layer PCB CAD trace layout and differential routing",
    },
    engineering: {
      src: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
      alt: "DFM verification and multi-layer copper stackup calculation",
    },
    prototype: {
      src: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80",
      alt: "24-72 hour rapid turn prototype board fabrication",
    },
    testing: {
      src: "/images/pcb-aoi-inspection.jpg",
      alt: "Automated 3D optical inspection (AOI) and radiographic X-ray testing machine in cleanroom",
    },
    production: {
      src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      alt: "High-volume automated cleanroom SMT reflow soldering assembly",
    },
    delivery: {
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      alt: "ESD vacuum packaged and quality-certified finished PCB shipments",
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
