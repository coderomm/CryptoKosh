/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, #c766ef, #7928d2 51.04%, #2b0c52)',
        'mobile-bg': "url('/mobilebg.png')",
        'desktop-bg': "url('/desktopbg.png')",
      },
    },
  },
  plugins: [],
}

