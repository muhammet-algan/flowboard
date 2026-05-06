/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#0A0A0F',
          surface: '#12121A',
          elevated: '#1A1A26',
          border: '#1E1E2E',
        },
        gold: {
          DEFAULT: '#F5C842',
          muted: '#B8962E',
          dim: '#3D3010',
          glow: '#F5C84233',
        },
        text: {
          primary: '#E8E8F0',
          secondary: '#A0A0C0',
          muted: '#6B6B8A',
        },
        status: {
          success: '#22C55E',
          warning: '#F59E0B',
          danger: '#EF4444',
          info: '#3B82F6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold': '0 0 20px rgba(245, 200, 66, 0.15)',
        'gold-sm': '0 0 10px rgba(245, 200, 66, 0.1)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F5C842, #B8962E)',
        'card-gradient': 'linear-gradient(145deg, #1A1A26, #12121A)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
