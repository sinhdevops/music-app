// src/components/Sidebar.tsx
"use client";

import { useMusicStore } from "@/lib/store/store";
import {
	HomeIcon,
	MagnifyingGlassIcon,
	MusicalNoteIcon,
	HeartIcon,
	PlusIcon,
	RadioIcon,
} from "@heroicons/react/24/outline";
import {
	HomeIcon as HomeSolid,
	MagnifyingGlassIcon as SearchSolid,
	MusicalNoteIcon as MusicSolid,
	HeartIcon as HeartSolid,
	RadioIcon as RadioSolid,
} from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Sidebar() {
	const pathname = usePathname();
	const { playlists, createPlaylist } = useMusicStore();
	const [newPlaylistName, setNewPlaylistName] = useState("");
	const [showCreateForm, setShowCreateForm] = useState(false);

	const navigation = [
		{ name: "Accueil", href: "/", icon: HomeIcon, activeIcon: HomeSolid },
		{ name: "Recherche", href: "/search", icon: MagnifyingGlassIcon, activeIcon: SearchSolid },
		{ name: "Ma bibliothèque", href: "/library", icon: MusicalNoteIcon, activeIcon: MusicSolid },
		{ name: "Favoris", href: "/favorites", icon: HeartIcon, activeIcon: HeartSolid },
		{ name: "Radio", href: "/radio", icon: RadioIcon, activeIcon: RadioSolid },
	];

	const handleCreatePlaylist = (e: React.FormEvent) => {
		e.preventDefault();
		if (newPlaylistName.trim()) {
			createPlaylist(newPlaylistName.trim());
			setNewPlaylistName("");
			setShowCreateForm(false);
		}
	};

	return (
		<div className="glass flex w-64 flex-col border-r border-white/10">
			{/* Logo */}
			<div className="p-6">
				<div className="flex items-center gap-2">
					<div className="gradient-purple flex h-8 w-8 items-center justify-center rounded-lg">
						<MusicalNoteIcon className="h-5 w-5 text-white" />
					</div>
					<span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-xl font-bold text-transparent">
						ZingMP3
					</span>
				</div>
			</div>

			{/* Navigation */}
			<nav className="space-y-1 px-3">
				{navigation.map((item) => {
					const isActive = pathname === item.href;
					const Icon = isActive ? item.activeIcon : item.icon;

					return (
						<Link key={item.name} href={item.href}>
							<motion.div
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								className={cn(
									"hover:bg-secondary/70 sidebar-item flex items-center gap-3 rounded-xl px-3 py-2",
									isActive && "bg-secondary",
								)}
							>
								<Icon className="h-6 w-6" />
								<span className="font-medium">{item.name}</span>
							</motion.div>
						</Link>
					);
				})}
			</nav>

			{/* Playlists Section */}
			<div className="mt-8 flex-1 px-3">
				<div className="mb-4 flex items-center justify-between">
					<h2 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Mes Playlists</h2>
					<button
						onClick={() => setShowCreateForm(true)}
						className="rounded p-1 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
					>
						<PlusIcon className="h-5 w-5" />
					</button>
				</div>

				{showCreateForm && (
					<motion.form
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						onSubmit={handleCreatePlaylist}
						className="glass mb-4 rounded-lg p-3"
					>
						<input
							type="text"
							value={newPlaylistName}
							onChange={(e) => setNewPlaylistName(e.target.value)}
							placeholder="Nom de la playlist"
							className="w-full rounded border border-white/20 bg-transparent px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
							autoFocus
						/>
						<div className="mt-3 flex gap-2">
							<button
								type="submit"
								className="rounded bg-purple-600 px-3 py-1 text-xs transition-colors hover:bg-purple-700"
							>
								Créer
							</button>
							<button
								type="button"
								onClick={() => setShowCreateForm(false)}
								className="rounded bg-gray-600 px-3 py-1 text-xs transition-colors hover:bg-gray-700"
							>
								Annuler
							</button>
						</div>
					</motion.form>
				)}

				<div className="scrollbar-thin space-y-2 overflow-y-auto">
					{playlists.map((playlist) => (
						<Link key={playlist.id} href={`/playlist/${playlist.id}`}>
							<div className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/10">
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-gray-600 to-gray-700">
									<MusicalNoteIcon className="h-5 w-5 text-gray-300" />
								</div>
								<div className="min-w-0 flex-1">
									<p className="truncate text-sm font-medium text-white">{playlist.name}</p>
									<p className="text-xs text-gray-400">{playlist.songs.length} titres</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
