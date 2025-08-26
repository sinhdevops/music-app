// import { Toaster } from "@/components/ui/toaster";
// import { ClerkProvider } from "@clerk/nextjs";
// import { dark } from "@clerk/themes";
import type { Metadata, Viewport } from "next";

import "@/styles/globals.css";
import ReactQueryProvider from "@/providers/react-query-provider";
import { Sidebar } from "@/layouts/sidebar";
import { PlayerBar } from "@/layouts/player-bar";
import { Topbar } from "@/layouts/topbar";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
	metadataBase: new URL(BASE_URL),
	applicationName: "Em Sinh Kay - Portfolio",
	title: { default: "Em Sinh Kay - Web Developer", template: "Em Sinh Kay" },
	description: "Em Sinh Kay Portfolio - Frontend Developer",
	keywords: [
		"Web Developer",
		"React",
		"Next.js",
		"TypeScript",
		"Node.js",
		"Tailwind CSS",
		"Portfolio Developer",
		"Em Sinh Kay",
	],
	authors: [{ name: "Em Sinh Kay", url: "https://github.com/sinhdevops/" }],
	creator: "Em Sinh Kay",
	publisher: "Em Sinh Kay",
	robots: {
		index: true,
		follow: true,
		"max-snippet": -1,
		"max-image-preview": "large",
		"max-video-preview": -1,
	},
	openGraph: {
		title: "Em Sinh Kay - Web Developer",
		description: "Em Sinh Kay Portfolio - Frontend Developer",
		type: "website",
		locale: "vi_VN",
		countryName: "Vietnam",
		url: BASE_URL,
	},
	twitter: {
		card: "summary_large_image",
		title: "Em Sinh Kay - Web Developer",
		description: "Em Sinh Kay Portfolio - Frontend Developer",
	},
	formatDetection: {
		email: true,
		address: false,
		telephone: false,
	},
	referrer: "origin-when-cross-origin",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	themeColor: "#000000",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		// <ClerkProvider
		// 	appearance={{
		// 		baseTheme: [dark],
		// 		variables: {
		// 			colorPrimary: "#a855f7", // Purple-500 to match your blob animation
		// 			colorBackground: "#18181b", // Zinc-900 to match your background
		// 			colorText: "#ffffff",
		// 			colorInputText: "#ffffff",
		// 			colorInputBackground: "#27272a", // Zinc-800 for subtle contrast
		// 			borderRadius: "0.5rem",
		// 		},
		// 		elements: {
		// 			card: "backdrop-blur-lg bg-zinc-900/50",
		// 			formButtonPrimary: "bg-purple-500 hover:bg-purple-600",
		// 			socialButtonsIconButton: "hover:bg-zinc-800",
		// 			footerActionLink: "text-purple-400 hover:text-purple-300",
		// 		},
		// 	}}
		// >
		<html lang="en" dir="ltr" suppressHydrationWarning>
			<body id="home" className="flex min-h-screen flex-col scroll-smooth">
				<ReactQueryProvider>
					<div className="flex flex-1">
						<Sidebar />
						<div className="flex min-w-0 flex-1 flex-col">
							<Topbar />
							<main className="min-w-0 flex-1 space-y-8 p-4">{children}</main>
						</div>
					</div>
					<PlayerBar />
				</ReactQueryProvider>
			</body>
		</html>
	);
}
