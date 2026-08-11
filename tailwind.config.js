import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Source Sans 3"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        calm: '0 20px 60px rgba(8, 15, 30, 0.18)',
      },
      keyframes: {
        rise: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        rise: 'rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  daisyui: {
    themes: [
      {
        focus: {
          primary: '#3b82f6',
          'primary-content': '#f8fafc',
          secondary: '#64748b',
          'secondary-content': '#f8fafc',
          accent: '#38bdf8',
          'accent-content': '#0b1220',
          neutral: '#1e293b',
          'neutral-content': '#e2e8f0',
          'base-100': '#0b1220',
          'base-200': '#111827',
          'base-300': '#1f2937',
          'base-content': '#e8eef7',
          info: '#38bdf8',
          success: '#34d399',
          warning: '#fbbf24',
          error: '#f87171',
        },
      },
      {
        focusday: {
          primary: '#2563eb',
          'primary-content': '#ffffff',
          secondary: '#475569',
          'secondary-content': '#ffffff',
          accent: '#0ea5e9',
          'accent-content': '#082f49',
          neutral: '#0f172a',
          'neutral-content': '#f8fafc',
          'base-100': '#f4f7fb',
          'base-200': '#e8eef6',
          'base-300': '#d5dee9',
          'base-content': '#0f172a',
          info: '#0284c7',
          success: '#059669',
          warning: '#d97706',
          error: '#dc2626',
        },
      },
    ],
  },
  plugins: [daisyui],
};
