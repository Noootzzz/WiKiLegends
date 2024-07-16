/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        black: '#111',
        grey: '#CACCE0',
        white: '#F7F9FB',
        background: '#020817',
        primary: '#3576DF',
        secondary: '#1E293B',
        border: '#1E293B',
        dark: '#11112a',
        accent: '#ff2528',
        'hover-primary': '#313160',
        'hover-accent': '#f2494c',
      },
      transitionDuration: {
        tr: '0.2s',
      },
    },
  },
  plugins: [],
};