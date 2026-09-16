/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#087F5B', // Primary Green
          600: '#07694B',
          700: '#065F44',
          800: '#044431',
          900: '#022C20',
          light: '#E6F4EA',
          hover: '#099268',
        },
        dark: {
          DEFAULT: '#101828',
          card: '#162033',
          border: '#1F2D47',
          muted: '#344054',
        },
        surface: {
          DEFAULT: '#F8FAF9',
          white: '#FFFFFF',
          card: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#667085',
          light: '#98A2B3',
          dark: '#475467',
        },
        border: {
          DEFAULT: '#E4E7EC',
          light: '#F2F4F7',
          dark: '#D0D5DD',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        script: ['Caveat', 'Patrick Hand', 'cursive', 'system-ui'],
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(16, 24, 40, 0.05)',
        card: '0 2px 12px rgba(16, 24, 40, 0.04), 0 1px 2px rgba(16, 24, 40, 0.02)',
        'card-hover': '0 12px 30px -4px rgba(16, 24, 40, 0.08), 0 4px 10px rgba(16, 24, 40, 0.03)',
        floating: '0 20px 40px -10px rgba(8, 127, 91, 0.15), 0 10px 20px rgba(16, 24, 40, 0.06)',
      },
      borderRadius: {
        'card': '12px',
      },
    },
  },
  plugins: [],
};
