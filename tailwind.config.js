/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}', // ✅ Includes all Next.js App Router files
    './src/pages/**/*.{js,ts,jsx,tsx}', // ✅ Supports both Pages and App Router
    './src/components/**/*.{js,ts,jsx,tsx}', // ✅ Ensures components are styled
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
