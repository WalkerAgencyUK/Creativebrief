/********************
 * Tailwind config
 ********************/
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        walkerPink: "#FF4778",
        walkerPinkSoft: "#FFE4EE",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0,0,0,0.06)",
      },
      borderRadius: {
        '2xl': '1rem',
      }
    },
  },
  plugins: [],
}
