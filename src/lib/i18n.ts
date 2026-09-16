// Robust bilingual translation engine for PCB Indonesia (EN <-> ID)
// Guarantees zero mixed language across all sections, headers, footers, and interactive elements

export type SupportedLang = 'EN' | 'ID';

export const navTranslations: Record<string, string> = {
  'Home': 'Beranda',
  'Products': 'Produk',
  'Capabilities': 'Kapabilitas',
  'Industries': 'Industri',
  'Resources': 'Panduan',
  'Blog': 'Blog',
  'About': 'Tentang Kami',
  'Contact': 'Kontak',
  'Get a Quote': 'Minta Penawaran',
  'Talk to Our Team': 'Hubungi Tim Kami',
  'Get an Instant Quote': 'Minta Penawaran Cepat',
  'PCB Fabrication': 'Fabrikasi PCB',
  'PCB Assembly (PCBA)': 'Perakitan PCB (PCBA)',
  'PCB Design Support': 'Dukungan Desain PCB',
  'Prototype & Custom PCB': 'Prototipe & PCB Kustom',
};

export const enToIdMap: Record<string, string> = {
  // Navigation & Actions
  ...navTranslations,
  'Search': 'Cari',
  'MENU': 'MENU',
  'CLOSE': 'TUTUP',
  'Close': 'Tutup',
  'Select language': 'Pilih bahasa',

  // Hero Section
  "01 // INDONESIA'S TRUSTED PCB MANUFACTURING PARTNER": "01 // MITRA MANUFAKTUR PCB TERPERCAYA INDONESIA",
  'Engineering Precision Circuits,': 'Rekayasa Sirkuit Presisi Tinggi,',
  'Built for': 'Dibangun untuk',
  'High-Yield Hardware': 'Hardware Berdaya Saing',
  'High-precision multi-layer PCB fabrication and rapid SMT assembly services for innovators, engineering teams, and electronics manufacturers throughout Indonesia.':
    'Layanan fabrikasi PCB multi-layer presisi tinggi dan perakitan SMT cepat untuk inovator, tim rekayasa, dan produsen elektronika di seluruh Indonesia.',
  '01 / QUALITY': '01 / KUALITAS',
  'IPC Class 2 & 3': 'Standar IPC Kelas 2 & 3',
  'AOI & X-Ray inspection': 'Inspeksi 3D AOI & X-Ray',
  '02 / SPEED': '02 / KECEPATAN',
  '24-72h Quick Turn': 'Pengerjaan 24-72 Jam',
  'Prototypes to mass': 'Prototipe ke massal',
  '03 / CAPABILITY': '03 / KAPABILITAS',
  '1-32 Layers HDI': '1-32 Lapisan & HDI',
  'Controlled impedance': 'Impedansi terkontrol',
  '04 / DFM': '04 / DUKUNGAN DFM',
  'Direct Support': 'Bantuan Ahli Langsung',
  'Impedance & stackups': 'Impedansi & stackup',
  'Better Electronics,': 'Elektronika Unggulan,',
  'A Brighter Indonesia': 'Indonesia Berdaya',
  'PRECISION SMT & MULTILAYER PCB': 'PERAKITAN SMT PRESISI & PCB MULTILAYER',
  'MADE IN INDONESIA': 'BUATAN INDONESIA',

  // Statement Section 1
  '01 // EDITORIAL STATEMENT': '01 // KOMITMEN KAMI',
  'IPC-A-610 CLASS 3 HIGH-RELIABILITY': 'KEANDALAN TINGGI IPC-A-610 KELAS 3',
  'DIRECT DOMESTIC FABRICATION': 'FABRIKASI DOMESTIK LANGSUNG',
  '“Powering': '“Mendorong',
  'Indonesia’s Electronics.”': 'Elektronika Indonesia.”',
  '[ SYSTEM SPECIFICATION ]': '[ SPESIFIKASI SISTEM ]',
  '1 TO 32 LAYERS • CONTROLLED IMPEDANCE • LASER DIRECT IMAGING': '1 HINGGA 32 LAPISAN • IMPEDANSI TERKONTROL • LASER DIRECT IMAGING',
  'BOGOR HEADQUARTERS & MANUFACTURING FACILITY': 'KANTOR PUSAT & PABRIK MANUFAKTUR BOGOR',

  // Built for Indonesia Section
  '02 // NATIONAL IMPACT & SOVEREIGNTY': '02 // KEDAULATAN HARDWARE & DAMPAK NASIONAL',
  "Built for Indonesia's": 'Dibangun untuk Masa Depan',
  'Electronics Future': 'Elektronika Indonesia',
  "We are dedicated to strengthening Indonesia's domestic hardware ecosystem. By pairing multi-layer PCB fabrication, precision SMT assembly, and strict IPC Class 3 quality inspection under one roof, we eliminate overseas supply chain friction and empower Indonesian engineers to manufacture world-class electronic devices locally.":
    'Kami berdedikasi memperkuat ekosistem perangkat keras dalam negeri Indonesia. Dengan memadukan fabrikasi PCB multi-layer, perakitan SMT presisi tinggi, dan inspeksi ketat standar IPC Kelas 3 di fasilitas Bogor kami, kami mengeliminasi hambatan rantai pasok luar negeri dan memberdayakan para engineer Indonesia memproduksi perangkat elektronik berstandar global secara lokal.',
  'From IoT sensors and telecommunication equipment to automotive power controllers and industrial automation, we ensure high repeatability, transparent domestic billing, and rapid turnaround.':
    'Mulai dari sensor IoT dan telekomunikasi hingga pengendali daya otomotif dan otomasi industri, kami menjamin akurasi tinggi, transaksi rupiah transparan, dan pengiriman ekspres.',
  'Explore our manufacturing philosophy': 'Pelajari filosofi manufaktur kami',
  '[ SYSTEM // ADVANCED SMT & FABRICATION ]': '[ SISTEM // SMT & FABRIKASI PRESISI ]',
  'ACTIVE': 'AKTIF',

  // Products & Services Section
  '03 // CORE CAPABILITIES': '03 // KAPABILITAS UTAMA',
  'Our Products & Services': 'Produk & Layanan Kami',
  'Turnkey PCB fabrication and automated SMT assembly tailored for quick-turn prototypes through high-volume production runs.':
    'Fabrikasi PCB turnkey dan perakitan SMT otomatis yang dirancang untuk prototipe cepat hingga produksi volume massal.',
  'Explore all capabilities': 'Jelajahi seluruh kapabilitas',
  'Explore Specification': 'Lihat Spesifikasi Lengkap',
  'Configure & Order': 'Konsultasi & Pesan',

  // Industries Section
  '04 // SECTORS SERVED': '04 // SEKTOR YANG DILAYANI',
  'Powering Innovation': 'Mendukung Inovasi di',
  'Across Industries': 'Berbagai Sektor Industri',
  'High-performance PCB substrates engineered to endure demanding operational conditions across 7 mission-critical sectors.':
    'Substrat PCB berkinerja tinggi yang dirancang untuk kondisi operasional ekstrem di 7 sektor industri penting.',

  // Why Build With PCB Indonesia
  '05 // VALUE PROPOSITIONS': '05 // KEUNGGULAN UTAMA',
  'Why Build With': 'Mengapa Memilih',
  'PCB Indonesia': 'PCB Indonesia',
  'We combine local proximity, global manufacturing certifications, and direct engineering collaboration to eliminate offshore supply chain delays.':
    'Kami memadukan fasilitas lokal di Bogor, sertifikasi manufaktur global, dan asistensi teknis langsung untuk meniadakan keterlambatan pasokan luar negeri.',
  'Engineering Expertise': 'Keahlian Rekayasa Mendalam',
  'In-house technical support assisting with DFM audits, high-speed routing, controlled impedance, and material selection.':
    'Dukungan engineer berpengalaman untuk audit DFM, routing kecepatan tinggi, impedansi terkontrol, dan pemilihan material terbaik.',
  'Certified Quality': 'Kualitas Terverifikasi',
  'Strict quality standards compliant with IPC-A-600/610 Class 2 & 3, automated 3D AOI, and radiographic X-Ray inspection.':
    'Standar kualitas ketat bersertifikat IPC-A-600/610 Kelas 2 & 3, inspeksi 3D AOI otomatis, dan analisis X-Ray BGA menyeluruh.',
  'Zero Customs Friction': 'Bebas Hambatan Impor',
  'Direct engineering collaboration, fast dispatch from our Bogor facility, zero offshore customs delays, and express domestic logistics.':
    'Komunikasi langsung dalam Bahasa Indonesia/Inggris, pengiriman cepat dari fasilitas Bogor, tanpa hambatan bea cukai, dan logistik ekspres.',
  'Scalable Capacity': 'Kapasitas Produksi Skalabel',
  'Seamlessly transition from quick-turn prototype batches to 100,000+ volume production with consistent material stackups.':
    'Transisi mulus dari prototipe kilat ke produksi volume massal 100.000+ unit dengan konsistensi material stackup terjamin.',

  // Statement Section 2
  '02 // EDITORIAL STATEMENT': '02 // PERNYATAAN EDITORIAL',
  'MISSION-CRITICAL ARCHITECTURE': 'ARSITEKTUR PERANGKAT KERAS KRITIS',
  'SCHEMATIC TO MASS SILICON': 'DARI SKEMATIK HINGGA PRODUKSI MASSAL',
  '“Engineered': '“Dirancang',
  'For': 'Untuk',
  'What’s': 'Masa',
  'Next.”': 'Depan.”',
  'Accelerating domestic hardware development with sub-millimeter precision, end-to-end traceability, and zero offshore customs bottlenecks.':
    'Mempercepat pengembangan hardware dalam negeri dengan presisi sub-milimeter, keterlacakan penuh, dan bebas kendala impor luar negeri.',
  '[ PIPELINE INTEGRITY ]': '[ INTEGRITAS PRODUKSI ]',
  '24H PROTOTYPES • 100K+ MASS VOLUME • 100% IPC CLASS 3 TESTING': 'PROTOTIPE 24 JAM • 100RB+ PRODUKSI • 100% PENGUJIAN IPC KELAS 3',
  'IPC-A-600/610 STANDARDS': 'STANDAR IPC-A-600/610',
  'INDONESIAN ENGINEERING': 'REKAYASA INDONESIA',

  // Process Section
  '06 // WORKFLOW PIPELINE': '06 // ALUR PRODUKSI',
  'From Concept to': 'Dari Konsep Menuju',
  'Production': 'Produksi Massal',
  'Seven verified engineering milestones from initial schematic concept to express ESD-shielded domestic delivery.':
    'Tujuh tahapan rekayasa terverifikasi dari evaluasi skematik awal hingga pengiriman berstandar ESD dari Bogor.',
  'Request an instant quote': 'Minta penawaran instan',
  'Concept': 'Konsep',
  'Design': 'Desain',
  'Engineering': 'Rekayasa',
  'Prototype': 'Prototipe',
  'Testing': 'Pengujian',
  'Delivery': 'Pengiriman',
  'System Architecture & Feasibility': 'Arsitektur Sistem & Uji Kelayakan',
  'High-Density CAD Layout & Routing': 'Layout CAD & Routing Densitas Tinggi',
  'Stackup Simulation & DFM Audit': 'Simulasi Stackup & Audit DFM',
  'Quick-Turn Multi-Layer Panelization': 'Panelisasi Multi-Layer Cepat',
  'Automated 3D Optical & Radiographic Inspection': 'Inspeksi Optik 3D & X-Ray Otomatis',
  'Automated Cleanroom SMT Assembly': 'Perakitan SMT Cleanroom Otomatis',
  'ESD Shielded Logistics & Domestic Handover': 'Logistik Pelindung ESD & Serah Terima',
  'VERIFIED DELIVERABLES:': 'HASIL TERVERIFIKASI:',
  'DELIVERABLES:': 'HASIL TERVERIFIKASI:',

  // Clients Section
  '07 // TRUSTED NETWORK': '07 // JARINGAN TERPERCAYA',
  'Our Clients & Partners': 'Klien & Mitra Industri Kami',
  'Trusted by innovative technology companies, defense manufacturers, universities, and industrial enterprises across Indonesia.':
    'Dipercaya oleh berbagai perusahaan teknologi terkemuka, manufaktur industri, universitas riset, dan BUMN di seluruh Indonesia.',

  // Blog Section
  '08 // ENGINEERING INSIGHTS': '08 // WAWASAN REKAYASA',
  'Latest from Our Blog': 'Artikel & Wawasan Terbaru',
  'Technical guides, industry news, and manufacturing insights from our team.':
    'Panduan teknis, kabar industri, dan wawasan manufaktur dari tim ahli kami.',
  'Read full article': 'Baca artikel lengkap',
  'View all articles': 'Lihat semua artikel',

  // CTA Section
  '09 // IMMEDIATE ACTION': '09 // LANGKAH SELANJUTNYA',
  'Ready to Build Your Hardware in Indonesia?': 'Siap Memproduksi Hardware Anda di Indonesia?',
  'Upload your Gerber files and bill of materials (BOM). Our domestic engineering team in Bogor will perform a comprehensive DFM audit and provide an instant, transparent quote within 2 business hours.':
    'Unggah file Gerber dan Bill of Materials (BOM) Anda. Tim engineer kami di Bogor akan melakukan audit DFM mendalam dan memberikan penawaran transparan dalam 2 jam kerja.',
  'Schedule Engineering Review': 'Jadwalkan Diskusi Teknis',

  // Footer Section
  'Quick Links': 'Tautan Cepat',
  'Our Services': 'Layanan Kami',
  'Connect & Social Media': 'Koneksi & Media Sosial',
  'Follow our latest updates, technical case studies, and electronics industry news.':
    'Ikuti informasi terkini, studi kasus teknis, dan pembaruan industri PCB.',
  'Subscribe to Our Newsletter': 'Berlangganan Buletin Teknis',
  'Get the latest updates, tips, and electronics industry insights.':
    'Dapatkan informasi terbaru, tips desain PCB, dan wawasan manufaktur.',
  'Factory & Headquarters (Bogor):': 'Pabrik & Kantor Pusat (Bogor):',
  'Hours:': 'Jam Operasional:',
  'Privacy Policy': 'Kebijakan Privasi',
  'Terms of Service': 'Ketentuan Layanan',
  'Sitemap': 'Peta Situs',
  'Subscribe': 'Langganan',
  'Enter your work email': 'Masukkan email kerja Anda',
};

// Generate reverse dictionary dynamically (ID -> EN)
export const idToEnMap: Record<string, string> = {};
Object.entries(enToIdMap).forEach(([en, id]) => {
  idToEnMap[id] = en;
});

// Helper to get active language
export function getStoredLanguage(): SupportedLang {
  if (typeof window === 'undefined') return 'EN';
  const saved = localStorage.getItem('pcb_lang');
  return saved === 'ID' ? 'ID' : 'EN';
}

// Function to translate the entire DOM seamlessly
export function applyTranslations(targetLang: SupportedLang) {
  if (typeof window === 'undefined') return;

  // Persist choice
  localStorage.setItem('pcb_lang', targetLang);
  document.documentElement.lang = targetLang === 'ID' ? 'id' : 'en';

  const isId = targetLang === 'ID';

  // 1. Explicit data-i18n attributes (100% deterministic)
  document.querySelectorAll<HTMLElement>('[data-i18n-en]').forEach((el) => {
    const target = isId ? el.getAttribute('data-i18n-id') : el.getAttribute('data-i18n-en');
    if (target) {
      el.textContent = target;
    }
  });

  // 2. Navigation & Service Links
  document.querySelectorAll<HTMLElement>('[data-nav-link]').forEach((el) => {
    const original = el.getAttribute('data-nav-link') || el.textContent?.trim() || '';
    if (isId && navTranslations[original]) {
      el.textContent = navTranslations[original];
    } else if (!isId && original) {
      el.textContent = original;
    }
  });

  // 3. Statement 1 Quote Rebuilding
  const stmt1Word = document.querySelector<HTMLElement>('[data-statement-word-1]');
  if (stmt1Word) {
    stmt1Word.textContent = isId ? '“Mendorong' : '“Powering';
  }

  const stmt1Typed = document.querySelector<HTMLElement>('[data-statement-typed-text]');
  if (stmt1Typed) {
    const targetPhrase = isId ? 'Elektronika Indonesia.”' : 'Indonesia’s Electronics.”';
    stmt1Typed.innerHTML = '';
    for (let i = 0; i < targetPhrase.length; i++) {
      const span = document.createElement('span');
      span.textContent = targetPhrase[i];
      span.className = 'inline-block opacity-1 will-change-transform';
      if (targetPhrase[i] === ' ') span.style.width = '0.28em';
      stmt1Typed.appendChild(span);
    }
  }

  // 4. Statement 2 Words
  const stmt2Words = document.querySelectorAll<HTMLElement>('[data-statement-2-word]');
  if (stmt2Words.length >= 4) {
    const wordsId = ['“Dirancang', 'Untuk', 'Masa', 'Depan.”'];
    const wordsEn = ['“Engineered', 'For', 'What’s', 'Next.”'];
    const wordList = isId ? wordsId : wordsEn;
    stmt2Words.forEach((wordEl, idx) => {
      if (wordList[idx]) {
        wordEl.textContent = wordList[idx];
      }
    });
  }

  // 5. General Text Node Replacement using Dictionary
  const map = isId ? enToIdMap : idToEnMap;

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        if (!node.textContent || !node.textContent.trim()) return NodeFilter.FILTER_SKIP;
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_SKIP;
        const tag = parent.tagName.toLowerCase();
        if (
          tag === 'script' ||
          tag === 'style' ||
          tag === 'svg' ||
          tag === 'path' ||
          tag === 'code' ||
          tag === 'pre'
        ) {
          return NodeFilter.FILTER_SKIP;
        }
        // If parent already handled by data-i18n-en, skip
        if (parent.hasAttribute('data-i18n-en')) {
          return NodeFilter.FILTER_SKIP;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    }
  );

  const pendingUpdates: { node: Text; newText: string }[] = [];
  let current = walker.nextNode();

  while (current) {
    const text = current.textContent?.trim();
    if (text && map[text]) {
      pendingUpdates.push({ node: current as Text, newText: map[text] });
    }
    current = walker.nextNode();
  }

  pendingUpdates.forEach(({ node, newText }) => {
    node.textContent = newText;
  });

  // 6. Input Placeholders
  document.querySelectorAll<HTMLInputElement>('input[placeholder], textarea[placeholder]').forEach((el) => {
    const ph = el.placeholder.trim();
    if (ph && map[ph]) {
      el.placeholder = map[ph];
    }
  });

  // 7. Broadcast event for React components
  window.dispatchEvent(new CustomEvent('languageChange', { detail: { lang: targetLang } }));
}
