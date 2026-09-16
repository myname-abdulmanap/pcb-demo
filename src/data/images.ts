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
      alt: "High-density green printed circuit board with soldered microchips and gold traces",
      width: 1200,
      height: 800,
    },
    pcbCloseUp: {
      src: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1000&q=80",
      alt: "Close up of high quality PCB circuit board with surface mount components",
      width: 1000,
      height: 700,
    },
  },
  introducing: {
    factoryCleanroom: {
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
      alt: "PCB manufacturing technician in cleanroom monitoring automated SMT pick and place machinery",
      width: 1200,
      height: 800,
    },
  },
  products: {
    pcbFabrication: {
      src: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=800&q=80",
      alt: "Stacked fabricated multi-layer green printed circuit boards ready for assembly",
      width: 800,
      height: 500,
    },
    pcbAssembly: {
      src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      alt: "Precision PCB assembly with robotic surface mount technology tweezers and micro solder joints",
      width: 800,
      height: 500,
    },
    pcbDesign: {
      src: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=800&q=80",
      alt: "Electronics engineer verifying circuit schematic layout and PCB design routing",
      width: 800,
      height: 500,
    },
    prototypeCustom: {
      src: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80",
      alt: "Custom rapid prototype PCB boards with varied dimensions and component layouts",
      width: 800,
      height: 500,
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
      src: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=800&q=80",
      alt: "Automated reflow oven soldering and precision SMT placement inspection",
      width: 800,
      height: 480,
    },
    sustainability: {
      src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
      alt: "Green seedling sprout growing on an eco-friendly RoHS lead-free circuit board",
      width: 800,
      height: 480,
    },
  },
  capabilities: {
    multilayer: {
      src: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
      alt: "High-layer count motherboard cross section and through-hole vias",
      width: 800,
      height: 500,
    },
    testing: {
      src: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80",
      alt: "Automated optical inspection (AOI) probe testing electronic circuits",
      width: 800,
      height: 500,
    },
  },
  about: {
    team: {
      src: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80",
      alt: "Engineering team collaborating in electronics laboratory with test equipment",
      width: 1200,
      height: 700,
    },
  },
};
