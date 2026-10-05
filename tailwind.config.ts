import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        flyer: {
          bg: "#F8F6F0",
          card: "#FFFFFF",
          dark: "#0F0F11",
          muted: "#5C5C64",
          border: "#E5E0D8",
          red: "#E31B23",
          redHover: "#C4131A",
          redLight: "#FDEBED",
        },
        corazon: {
          bg: "#F8F6F0",
          title: "#0F0F11",
          accent: "#E31B23",
          action: "#E31B23",
          text: "#0F0F11",
        },
      },
    },
  },
  plugins: [],
};

export default config;
