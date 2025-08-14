/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light theme
        light: {
          50: '#ffffff', // Pure white
          100: '#fafafa',
          150: '#fdfdfd', // extra subtle white
          200: '#f5f5f5',
          250: '#f0f0f0', // new mid tone
          300: '#eeeeee',
          350: '#e8e8e8', // new
          400: '#e0e0e0',
          450: '#d9d9d9', // new
          500: '#d0d0d0',
          550: '#c7c7c7', // new
          600: '#bdbdbd',
          650: '#b0b0b0', // new
          700: '#9e9e9e',
          750: '#8a8a8a', // new
          800: '#757575',
          850: '#5f5f5f', // new
          900: '#424242',
          950: '#2e2e2e', // deepest
          1000: '#1a1a1a', // darkest
        },
        // Dark theme
        dark: {
          50: '#000000', // Pure black
          100: '#0a0a0a',
          150: '#111111', // new
          200: '#141414',
          250: '#191919', // new
          300: '#1e1e1e',
          350: '#242424', // new
          400: '#2d2d2d',
          450: '#363636', // new
          500: '#3d3d3d',
          550: '#474747', // new
          600: '#525252',
          650: '#5d5d5d', // new
          700: '#737373',
          750: '#888888', // new
          800: '#a3a3a3',
          850: '#bfbfbf', // new
          900: '#d4d4d4',
          950: '#eaeaea', // lightest text
          1000: '#ffffff', // pure white
        },

        // Accent colors (works for both light/dark themes)
        primary: {
          50: '#e3f2ff',
          100: '#bbdeff',
          200: '#90caff',
          300: '#64b5ff',
          400: '#42a5ff',
          500: '#2196f3',
          600: '#1e88e5',
          700: '#1976d2',
          800: '#1565c0',
          900: '#0d47a1',
        },
        secondary: {
          50: '#fce4ec',
          100: '#f8bbd0',
          200: '#f48fb1',
          300: '#f06292',
          400: '#ec407a',
          500: '#e91e63',
          600: '#d81b60',
          700: '#c2185b',
          800: '#ad1457',
          900: '#880e4f',
        },
        success: {
          50: '#e8f5e9',
          100: '#c8e6c9',
          200: '#a5d6a7',
          300: '#81c784',
          400: '#66bb6a',
          500: '#4caf50',
          600: '#43a047',
          700: '#388e3c',
          800: '#2e7d32',
          900: '#1b5e20',
        },
        warning: {
          50: '#fff8e1',
          100: '#ffecb3',
          200: '#ffe082',
          300: '#ffd54f',
          400: '#ffca28',
          500: '#ffc107',
          600: '#ffb300',
          700: '#ffa000',
          800: '#ff8f00',
          900: '#ff6f00',
        },
        error: {
          50: '#ffebee',
          100: '#ffcdd2',
          200: '#ef9a9a',
          300: '#e57373',
          400: '#ef5350',
          500: '#f44336',
          600: '#e53935',
          700: '#d32f2f',
          800: '#c62828',
          900: '#b71c1c',
        },
        // Semantic aliases to make theme usage easier in components
        background: '#ffffff',
        'background-dark': '#0a0a0a',
        surface: '#fafafa',
        'surface-dark': '#1e1e1e',
        muted: '#eeeeee',
        'muted-dark': '#363636',
        text: '#212121',
        'text-dark': '#ffffff',
        border: '#e0e0e0',
        'border-dark': '#2d2d2d',
      },

      // Gradients for UI elements
      backgroundImage: {
        'gradient-light': 'linear-gradient(to bottom right, #fafafa, #eeeeee)',
        'gradient-dark': 'linear-gradient(to bottom right, #0a0a0a, #1e1e1e)',
        'gradient-primary': 'linear-gradient(to right, #2196f3, #42a5ff)',
        'gradient-secondary': 'linear-gradient(to right, #e91e63, #f48fb1)',
      },

      keyframes: {
        fadeInLeft: {
          '0%': { opacity: 0, transform: 'translateX(-50%)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
      },
      animation: {
        fadeInLeft: 'fadeInLeft 1s ease-in-out',
        blob: "blob 7s infinite",
      },
      animationDelay: {
        '2000': '2s',
        '4000': '4s',
      }
    },
  },
  plugins: [],
};
