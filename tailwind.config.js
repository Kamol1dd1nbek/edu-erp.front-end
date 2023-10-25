/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            baseBg: "#E7EDF0",
            baseText: "#065FD4",
            seconsBg: "#12486B",
            baseBlack: "#0D1523",
            baseRed: "#F87F7F",
         },
      },
   },
   plugins: [],
};
