/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			animation: {
				"pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
				"bounce-slow": "bounce 2s infinite",
				"spin-slow": "spin 3s linear infinite",
			},
			backdropBlur: {
				xs: "2px",
			},
			colors: {
				primary: {
					50: "#faf5ff",
					100: "#f3e8ff",
					200: "#e9d5ff",
					300: "#d8b4fe",
					400: "#c084fc",
					500: "#a855f7",
					600: "#9333ea",
					700: "#7c3aed",
					800: "#6b21a8",
					900: "#581c87",
				},
			},
			boxShadow: {
				glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
				glow: "0 0 20px rgba(168, 85, 247, 0.4)",
				"glow-lg": "0 0 40px rgba(168, 85, 247, 0.6)",
			},
		},
	},
	plugins: [require("@tailwindcss/line-clamp")],
};
