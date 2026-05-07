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
          hover: '#24243A',
        },
        gold: {
          DEFAULT: '#F5C842',
          muted: '#B8962E',
          dim: '#3D3010',
          glow: '#F5C84233',
          light: '#F7D56A',
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
          purple: '#A855F7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'gold': '0 0 20px rgba(245, 200, 66, 0.15)',
        'gold-sm': '0 0 10px rgba(245, 200, 66, 0.1)',
        'gold-lg': '0 0 40px rgba(245, 200, 66, 0.2)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.5)',
        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F5C842, #B8962E)',
        'gold-gradient-hover': 'linear-gradient(135deg, #F7D56A, #D4AA3A)',
        'card-gradient': 'linear-gradient(145deg, #1A1A26, #12121A)',
        'purple-gradient': 'linear-gradient(135deg, #A855F7, #7C3AED)',
        'success-gradient': 'linear-gradient(135deg, #22C55E, #16A34A)',
        'mesh-gradient': 'radial-gradient(at 40% 20%, rgba(245,200,66,0.08) 0px, transparent 50%), radial-gradient(at 80% 80%, rgba(59,130,246,0.06) 0px, transparent 50%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(245,200,66,0.1)' },
          '50%': { boxShadow: '0 0 25px rgba(245,200,66,0.25)' },
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}
