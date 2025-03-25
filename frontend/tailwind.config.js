/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../admin/**/*.{js,jsx,ts,tsx}", // Admin components ko bhi include karein
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}