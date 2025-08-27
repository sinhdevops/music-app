// src/components/Header.tsx
"use client";

import { useMusicStore } from "@/lib/store/store";
import { MagnifyingGlassIcon, UserIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
	const { searchQuery, setSearchQuery, setSearchResults, theme, setTheme } = useMusicStore();
	const [isSearchFocused, setIsSearchFocused] = useState(false);

	// Mock search function - replace with real API call
	const handleSearch = async (query: string) => {
		if (!query.trim()) {
			setSearchResults([]);
			return;
		}

		// Simulate API call
		setTimeout(() => {
			const mockResults = [
				{
					id: "1",
					title: `Résultat pour "${query}"`,
					artist: "Artiste Test",
					album: "Album Test",
					duration: 180,
					thumbnail: "/placeholder-song.jpg",
					url: "/sample-song.mp3",
				},
			];
			setSearchResults(mockResults);
		}, 300);
	};

	useEffect(() => {
		const debounceTimer = setTimeout(() => {
			handleSearch(searchQuery);
		}, 300);

		return () => clearTimeout(debounceTimer);
	}, [searchQuery]);

	const themes = [
		{ name: "Sombre", value: "dark" as const, bg: "bg-gray-900" },
		{ name: "Clair", value: "light" as const, bg: "bg-white" },
		{ name: "Violet", value: "purple" as const, bg: "bg-purple-900" },
	];

	return (
		<header className="glass border-b border-white/10 p-4">
			<div className="flex items-center justify-between">
				{/* Search Bar */}
				<div className="max-w-md flex-1">
					<div className={`relative transition-all duration-200 ${isSearchFocused ? "scale-105" : ""}`}>
						<MagnifyingGlassIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
						<input
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							onFocus={() => setIsSearchFocused(true)}
							onBlur={() => setIsSearchFocused(false)}
							placeholder="Rechercher des titres, artistes, albums..."
							className="w-full rounded-full border border-white/20 bg-white/10 py-2 pr-4 pl-10 text-white placeholder-gray-400 transition-all focus:border-purple-500 focus:bg-white/20 focus:outline-none"
						/>
					</div>
				</div>

				{/* User Actions */}
				<div className="flex items-center gap-4">
					{/* Theme Selector */}
					<Button className="ml-auto">
						Nâng cấp tài khoản <Sparkles className="ml-2" />
					</Button>
					<div className="group relative">
						<button className="rounded-full p-2 transition-colors hover:bg-white/10">
							<Cog6ToothIcon className="h-6 w-6" />
						</button>

						<motion.div
							initial={{ opacity: 0, scale: 0.95, y: 10 }}
							whileHover={{ opacity: 1, scale: 1, y: 0 }}
							className="glass pointer-events-none absolute right-0 z-50 mt-2 w-32 rounded-lg border border-white/20 py-2 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100"
						>
							{themes.map((themeOption) => (
								<button
									key={themeOption.value}
									onClick={() => setTheme(themeOption.value)}
									className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition-colors hover:bg-white/10 ${
										theme === themeOption.value ? "text-purple-400" : "text-gray-300"
									}`}
								>
									<div className={`h-3 w-3 rounded-full ${themeOption.bg}`} />
									{themeOption.name}
								</button>
							))}
						</motion.div>
					</div>

					{/* User Avatar */}
					<button className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 transition-transform hover:scale-105">
						<UserIcon className="h-5 w-5" />
					</button>
				</div>
			</div>
		</header>
	);
}
