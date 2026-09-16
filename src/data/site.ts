export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  heroHeadline: string;
  heroHighlight: string;
  heroCopy: string;
  url: string;
  description: string;
  email: string;
  salesEmail: string;
  phone: string;
  whatsapp: string;
  address: {
    street: string;
    city: string;
    province: string;
    country: string;
    postalCode: string;
  };
  businessHours: string;
  socials: {
    linkedin: string;
    youtube: string;
    instagram: string;
    x: string;
  };
  stats: Array<{
    value: string;
    label: string;
    sublabel?: string;
  }>;
  valueProps: Array<{
    title: string;
    desc: string;
    icon: string;
  }>;
}

export const siteConfig: SiteConfig = {
  name: "PCB Indonesia",
  legalName: "PT PCB Teknologi Indonesia",
  tagline: "Connect Ideas. Build Tomorrow.",
  heroHeadline: "Turning Ideas Into",
  heroHighlight: "Real Solutions",
  heroCopy: "High-quality PCB fabrication and assembly services for innovators, businesses, and industries across Indonesia.",
  url: "https://pcbindonesia.co.id",
  description: "High-quality PCB fabrication and assembly services for innovators, businesses, and industries across Indonesia. From rapid prototyping to high-volume manufacturing.",
  email: "info@pcbindonesia.co.id",
  salesEmail: "sales@pcbindonesia.co.id",
  phone: "+62 21 8934 7721",
  whatsapp: "+62 811 8899 722",
  address: {
    street: "Kawasan Industri MM2100, Blok C-4 No. 12",
    city: "Cikarang Barat, Bekasi",
    province: "Jawa Barat",
    country: "Indonesia",
    postalCode: "17530",
  },
  businessHours: "Monday – Friday: 08:00 – 17:00 WIB",
  socials: {
    linkedin: "https://linkedin.com/company/pcb-indonesia",
    youtube: "https://youtube.com/@pcbindonesia",
    instagram: "https://instagram.com/pcbindonesia",
    x: "https://x.com/pcbindonesia",
  },
  stats: [
    { value: "5+", label: "Years of Experience", sublabel: "Trusted engineering expertise" },
    { value: "500+", label: "Projects Completed", sublabel: "Across diverse industries" },
    { value: "99.8%", label: "Customer Satisfaction", sublabel: "Quality target compliance" },
    { value: "100%", label: "Locally Supported", sublabel: "Direct Indonesian assistance" },
  ],
  valueProps: [
    {
      title: "High Quality",
      desc: "Reliable & certified",
      icon: "shield-check",
    },
    {
      title: "Fast Turnaround",
      desc: "From prototype to mass",
      icon: "zap",
    },
    {
      title: "Local Support",
      desc: "Based in Indonesia",
      icon: "users",
    },
    {
      title: "Competitive Pricing",
      desc: "Best value for your project",
      icon: "tag",
    },
  ],
};
