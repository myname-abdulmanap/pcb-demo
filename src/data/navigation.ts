export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  children?: Array<{
    label: string;
    href: string;
    description?: string;
    icon?: string;
  }>;
}

export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "/products",
    children: [
      {
        label: "PCB Fabrication",
        href: "/products/pcb-fabrication",
        description: "High precision rigid & multilayer PCB manufacturing.",
      },
      {
        label: "PCB Assembly (PCBA)",
        href: "/products/pcb-assembly",
        description: "Turnkey SMT & THT surface mount assembly.",
      },
      {
        label: "PCB Design Support",
        href: "/products/pcb-design",
        description: "Schematic review, routing & DFM optimization.",
      },
      {
        label: "Prototype & Custom PCB",
        href: "/products/prototype-custom-pcb",
        description: "Rapid iteration prototypes & specialized boards.",
      },
    ],
  },
  { label: "Capabilities", href: "/capabilities" },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "Consumer Electronics", href: "/industries/consumer-electronics" },
      { label: "Industrial Automation", href: "/industries/industrial-automation" },
      { label: "IoT & Smart Devices", href: "/industries/iot" },
      { label: "Automotive", href: "/industries/automotive" },
      { label: "Telecommunications", href: "/industries/telecommunications" },
      { label: "Medical Devices", href: "/industries/medical" },
      { label: "Renewable Energy", href: "/industries/renewable-energy" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Blog & Articles", href: "/blog", description: "Technical insights and PCB engineering news" },
      { label: "Design Guidelines", href: "/resources#guidelines", description: "Clearances, trace widths, and DFM rules" },
      { label: "Standard Stackups", href: "/resources#stackups", description: "2 to 16 layer standard prepreg/core stackups" },
      { label: "FAQ", href: "/resources#faq", description: "Common questions on orders, files, and shipping" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerServices = [
  { label: "PCB Fabrication", href: "/products/pcb-fabrication" },
  { label: "PCB Assembly", href: "/products/pcb-assembly" },
  { label: "Design Support", href: "/products/pcb-design" },
  { label: "Prototype", href: "/products/prototype-custom-pcb" },
  { label: "Custom PCB", href: "/products/prototype-custom-pcb" },
];

export const footerQuickLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Industries", href: "/industries" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerCompany = [
  { label: "About Us", href: "/about" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Quality Standards", href: "/about#quality" },
  { label: "Careers", href: "/about#careers" },
  { label: "Contact Us", href: "/contact" },
];
