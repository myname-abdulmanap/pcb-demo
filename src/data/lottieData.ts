// Lightweight vector Lottie JSON animations for PCB manufacturing lifecycle stages

export const lottieAnimations = {
  // 01 Concept: Circuit Netlist & Signal Pulse
  concept: {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 60,
    w: 200,
    h: 200,
    nm: "Circuit Schematic",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Signal Pulse",
        sr: 1,
        ks: {
          o: { a: 1, k: [{ t: 0, s: [0] }, { t: 30, s: [100] }, { t: 60, s: [0] }] },
          r: { a: 0, k: 0 },
          p: { a: 1, k: [{ t: 0, s: [30, 100, 0] }, { t: 60, s: [170, 100, 0] }] },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 1, k: [{ t: 0, s: [50, 50, 100] }, { t: 30, s: [120, 120, 100] }, { t: 60, s: [50, 50, 100] }] }
        },
        shapes: [
          {
            ty: "el",
            p: { a: 0, k: [0, 0] },
            s: { a: 0, k: [14, 14] }
          },
          {
            ty: "fl",
            c: { a: 0, k: [0.031, 0.498, 0.357, 1] } // Brand green #087F5B
          }
        ]
      },
      {
        ddd: 0,
        ind: 2,
        ty: 4,
        nm: "Circuit Trace Path",
        sr: 1,
        ks: {
          o: { a: 0, k: 80 },
          r: { a: 0, k: 0 },
          p: { a: 0, k: [100, 100, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] }
        },
        shapes: [
          {
            ty: "sh",
            ks: {
              a: 0,
              k: {
                c: false,
                i: [[0, 0], [0, 0], [0, 0], [0, 0]],
                o: [[0, 0], [0, 0], [0, 0], [0, 0]],
                v: [[-70, 0], [-20, 0], [20, -30], [70, -30]]
              }
            }
          },
          {
            ty: "st",
            c: { a: 0, k: [0.12, 0.16, 0.2, 1] },
            w: { a: 0, k: 3 }
          }
        ]
      }
    ]
  },

  // 02 Design: High Speed CAD Routing
  design: {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 60,
    w: 200,
    h: 200,
    nm: "CAD Routing",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "CAD Cursor",
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: { a: 1, k: [{ t: 0, s: [0] }, { t: 60, s: [360] }] },
          p: { a: 1, k: [{ t: 0, s: [40, 40, 0] }, { t: 30, s: [160, 140, 0] }, { t: 60, s: [40, 40, 0] }] },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] }
        },
        shapes: [
          {
            ty: "sr",
            p: { a: 0, k: [0, 0] },
            r: { a: 0, k: 0 },
            ir: { a: 0, k: 4 },
            or: { a: 0, k: 10 },
            pt: { a: 0, k: 4 }
          },
          {
            ty: "st",
            c: { a: 0, k: [0.031, 0.498, 0.357, 1] },
            w: { a: 0, k: 2 }
          }
        ]
      }
    ]
  },

  // 03 Engineering: Multi-layer Stackup Simulation
  engineering: {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 60,
    w: 200,
    h: 200,
    nm: "Impedance Wave",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Waveform Pulse",
        sr: 1,
        ks: {
          o: { a: 1, k: [{ t: 0, s: [30] }, { t: 30, s: [100] }, { t: 60, s: [30] }] },
          r: { a: 0, k: 0 },
          p: { a: 0, k: [100, 100, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 1, k: [{ t: 0, s: [100, 80, 100] }, { t: 30, s: [100, 120, 100] }, { t: 60, s: [100, 80, 100] }] }
        },
        shapes: [
          {
            ty: "sh",
            ks: {
              a: 0,
              k: {
                c: false,
                i: [[0, -15], [0, 15], [0, -15], [0, 15]],
                o: [[0, 15], [0, -15], [0, 15], [0, -15]],
                v: [[-60, 0], [-20, 0], [20, 0], [60, 0]]
              }
            }
          },
          {
            ty: "st",
            c: { a: 0, k: [0.031, 0.498, 0.357, 1] },
            w: { a: 0, k: 3 }
          }
        ]
      }
    ]
  },

  // 04 Prototype: Laser Direct Imaging (LDI)
  prototype: {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 60,
    w: 200,
    h: 200,
    nm: "Laser Imaging",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Laser Beam",
        sr: 1,
        ks: {
          o: { a: 1, k: [{ t: 0, s: [60] }, { t: 30, s: [100] }, { t: 60, s: [60] }] },
          r: { a: 0, k: 0 },
          p: { a: 1, k: [{ t: 0, s: [40, 100, 0] }, { t: 30, s: [160, 100, 0] }, { t: 60, s: [40, 100, 0] }] },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] }
        },
        shapes: [
          {
            ty: "rc",
            p: { a: 0, k: [0, 0] },
            s: { a: 0, k: [4, 70] },
            r: { a: 0, k: 0 }
          },
          {
            ty: "fl",
            c: { a: 0, k: [0.031, 0.498, 0.357, 1] }
          }
        ]
      }
    ]
  },

  // 05 Testing: 3D AOI Optical Scan
  testing: {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 60,
    w: 200,
    h: 200,
    nm: "AOI Scanner",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Scanner Reticle",
        sr: 1,
        ks: {
          o: { a: 0, k: 90 },
          r: { a: 0, k: 0 },
          p: { a: 1, k: [{ t: 0, s: [100, 40, 0] }, { t: 30, s: [100, 160, 0] }, { t: 60, s: [100, 40, 0] }] },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 1, k: [{ t: 0, s: [100, 100, 100] }, { t: 30, s: [115, 115, 100] }, { t: 60, s: [100, 100, 100] }] }
        },
        shapes: [
          {
            ty: "el",
            p: { a: 0, k: [0, 0] },
            s: { a: 0, k: [40, 40] }
          },
          {
            ty: "st",
            c: { a: 0, k: [0.031, 0.498, 0.357, 1] },
            w: { a: 0, k: 2 }
          }
        ]
      }
    ]
  },

  // 06 Production: High-Speed SMT Pick & Place
  production: {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 60,
    w: 200,
    h: 200,
    nm: "SMT Feeder",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "SMT Head",
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: { a: 0, k: 0 },
          p: { a: 1, k: [{ t: 0, s: [100, 50, 0] }, { t: 25, s: [100, 110, 0] }, { t: 35, s: [100, 110, 0] }, { t: 60, s: [100, 50, 0] }] },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] }
        },
        shapes: [
          {
            ty: "rc",
            p: { a: 0, k: [0, 0] },
            s: { a: 0, k: [24, 18] },
            r: { a: 0, k: 2 }
          },
          {
            ty: "fl",
            c: { a: 0, k: [0.1, 0.13, 0.17, 1] }
          }
        ]
      }
    ]
  },

  // 07 Delivery: Verified Quality Seal & Handover
  delivery: {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 60,
    w: 200,
    h: 200,
    nm: "Verified Dispatch",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Shield Check",
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: { a: 0, k: 0 },
          p: { a: 0, k: [100, 100, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 1, k: [{ t: 0, s: [85, 85, 100] }, { t: 30, s: [105, 105, 100] }, { t: 60, s: [85, 85, 100] }] }
        },
        shapes: [
          {
            ty: "el",
            p: { a: 0, k: [0, 0] },
            s: { a: 0, k: [50, 50] }
          },
          {
            ty: "st",
            c: { a: 0, k: [0.031, 0.498, 0.357, 1] },
            w: { a: 0, k: 3 }
          }
        ]
      }
    ]
  }
};
