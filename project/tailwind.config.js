/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#bcdaff',
          300: '#8cc2ff',
          400: '#56a0ff',
          500: '#2b7fff',
          600: '#1661f4',
          700: '#134be1',
          800: '#173db6',
          900: '#193a8e',
        },
        secondary: {
          50: '#edfdf5',
          100: '#d4f9e6',
          200: '#adf0d0',
          300: '#79e0b3',
          400: '#44c78e',
          500: '#25aa72',
          600: '#19885b',
          700: '#176c4a',
          800: '#15563c',
          900: '#134833',
        },
        accent: {
          50: '#fff8ed',
          100: '#ffedd1',
          200: '#ffd8a3',
          300: '#ffbf6b',
          400: '#ffa133',
          500: '#fd8108',
          600: '#ee6202',
          700: '#c54a05',
          800: '#9c390c',
          900: '#7e300d',
        },
        success: {
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          500: '#eab308',
          600: '#ca8a04',
        },
        error: {
          500: '#ef4444',
          600: '#dc2626',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
      },
      transitionProperty: {
        'colors': 'background-color, border-color, color, fill, stroke',
      },
      transitionDuration: {
        '200': '200ms',
      },
      transitionTimingFunction: {
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};