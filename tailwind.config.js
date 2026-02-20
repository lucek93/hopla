/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#f4f3f0",
        bg2: "#eceae5",
        ink: "#1a1916",
        mid: "#6b6963",
        faint: "#b8b5b0",
        line: "rgba(26,25,22,0.1)",
        white: "#fafaf8",
      },
      fontFamily: {
        grotesk: [
          "Neue Haas Grotesk Display Pro",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      writingMode: {
        vertical: "vertical-rl",
      },
      rotate: {
        180: "180deg",
      },
      saturate: {
        40: ".4",
        60: ".6",
        75: ".75",
        90: ".9",
      },
      brightness: {
        90: ".9",
        102: "1.02",
        104: "1.04",
        108: "1.08",
      },
      animation: {
        ticker: "tick 22s linear infinite",
        fadein: "rise 0.8s cubic-bezier(.22,1,.36,1) 0.2s forwards",
        fadein2: "rise 1s cubic-bezier(.22,1,.36,1) 0.35s forwards",
        fadein3: "rise 0.8s cubic-bezier(.22,1,.36,1) 0.6s forwards",
        zoomout: "zoomOut 1.6s cubic-bezier(.22,1,.36,1) forwards",
      },
      keyframes: {
        tick: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        rise: {
          to: { opacity: "1", transform: "translateY(0)" },
        },
        zoomOut: {
          to: { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
