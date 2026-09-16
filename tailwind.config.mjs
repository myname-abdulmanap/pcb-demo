/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F2F7F4',
          100: '#E2ECE7',
          200: '#C2D9CF',
          300: '#94BCAC',
          400: '#5C9A82',
          500: '#087F5B', // Primary Green Accent
          600: '#07694B',
          700: '#0B5D46', // Deep Green
          800: '#073F30',
          900: '#04271E',
          light: '#EBF3F0',
          hover: '#07694B',
        },
        dark: {
          DEFAULT: '#111513', // Charcoal / Near-black
          card: '#181E1B',
          border: '#232A26',
          muted: '#66706B',
        },
        surface: {
          DEFAULT: '#F7F7F5', // Warm natural off-white
          secondary: '#EFEFEC', // Light warm gray
          white: '#FFFFFF',
          card: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#66706B', // Muted text
          light: '#8F9994',
          dark: '#3D4642',
        },
        border: {
          DEFAULT: '#E5E5E2', // Crisp subtle border
          light: '#EFEFEC',
          dark: '#D1D1CD',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        script: ['Caveat', 'Patrick Hand', 'cursive', 'system-ui'],
      },
      boxShadow: {
        soft: '0 1px 3px rgba(17, 21, 19, 0.04)',
        card: '0 1px 2px rgba(17, 21, 19, 0.03)',
        'card-hover': '0 4px 12px rgba(17, 21, 19, 0.06)',
        floating: '0 8px 24px -4px rgba(17, 21, 19, 0.08)',
      },
      borderRadius: {
        card: '10px',
      },
    },
  },
  plugins: [],
};
