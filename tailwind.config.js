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
        'custom-gradient-none': 'none',
        'mobile-bg': 'linear-gradient(180deg,rgb(234, 235, 254) 0%,rgb(219, 220, 250) 30%,rgb(190, 179, 239) 60%,rgb(207, 158, 232) 80%,rgb(220, 112, 218) 100%)',
        // 'desktop-bg': `radial-gradient(circle at center, 
        //                 rgb(233, 228, 251) 0%, 
        //                 rgb(202, 162, 234) 30%, 
        //                 rgb(191, 192, 242) 50%, 
        //                 rgb(190, 178, 239) 70%, 
        //                 rgb(216, 111, 218) 100%)`,
        'desktop-bg':`radial-gradient(circle at center, 
        rgba(195, 186, 255, 1) 0%,
        rgba(207, 232, 255, 1) 50%,
        rgba(255, 255, 255, 1) 100%
    )`
      },
    },
  },
  plugins: [],
}

