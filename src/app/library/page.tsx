// src/app/library/page.tsx
"use client";

import { useMusicStore } from "@/lib/store/store";
import { PlayIcon, MusicalNoteIcon, PlusIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LibraryPage() {
	const { playlists, createPlaylist } = useMusicStore();
	const [showCreateForm, setShowCreateForm] = useState(false);
	const [newPlaylistName, setNewPlaylistName] = useState("");

	const handleCreatePlaylist = (e: React.FormEvent) => {
		e.preventDefault();
		if (newPlaylistName.trim()) {
			createPlaylist(newPlaylistName.trim());
			setNewPlaylistName("");
			setShowCreateForm(false);
		}
	};

	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold">Ma Bibliothèque</h1>
				<button
					onClick={() => setShowCreateForm(true)}
					className="flex items-center gap-2 rounded-full bg-purple-600 px-4 py-2 font-medium transition-colors hover:bg-purple-700"
				>
					<PlusIcon className="h-5 w-5" />
					Nouvelle playlist
				</button>
			</div>

			{showCreateForm && (
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className="glass rounded-xl p-6"
				>
					<h3 className="mb-4 text-lg font-semibold">Créer une nouvelle playlist</h3>
					<form onSubmit={handleCreatePlaylist} className="space-y-4">
						<input
							type="text"
							value={newPlaylistName}
							onChange={(e) => setNewPlaylistName(e.target.value)}
							placeholder="Nom de la playlist"
							className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 transition-all focus:border-purple-500 focus:bg-white/20 focus:outline-none"
							autoFocus
						/>
						<div className="flex gap-3">
							<button
								type="submit"
								className="rounded-lg bg-purple-600 px-6 py-2 font-medium transition-colors hover:bg-purple-700"
							>
								Créer
							</button>
							<button
								type="button"
								onClick={() => setShowCreateForm(false)}
								className="rounded-lg bg-gray-600 px-6 py-2 font-medium transition-colors hover:bg-gray-700"
							>
								Annuler
							</button>
						</div>
					</form>
				</motion.div>
			)}

			{playlists.length === 0 && !showCreateForm ? (
				<div className="flex flex-col items-center justify-center py-20 text-center">
					<div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
						<MusicalNoteIcon className="h-12 w-12 text-white" />
					</div>
					<h2 className="mb-2 text-2xl font-bold">Créez votre première playlist</h2>
					<p className="mb-8 text-gray-400">Organisez votre musique en créant des playlists personnalisées</p>
					<button
						onClick={() => setShowCreateForm(true)}
						className="flex items-center gap-2 rounded-full bg-purple-600 px-6 py-3 font-medium transition-colors hover:bg-purple-700"
					>
						<PlusIcon className="h-5 w-5" />
						Créer une playlist
					</button>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{playlists.map((playlist, index) => (
						<motion.div
							key={playlist.id}
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: index * 0.1 }}
						>
							<Link href={`/playlist/${playlist.id}`}>
								<div className="music-card group">
									<div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-gray-600 to-gray-700">
										{playlist.thumbnail ? (
											<Image
												src={playlist.thumbnail}
												alt={playlist.name}
												fill
												className="object-cover transition-transform duration-300 group-hover:scale-110"
											/>
										) : (
											<div className="flex h-full w-full items-center justify-center">
												<MusicalNoteIcon className="h-16 w-16 text-gray-400" />
											</div>
										)}
										<div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
											<button className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/30">
												<PlayIcon className="ml-1 h-6 w-6 text-white" />
											</button>
										</div>
									</div>
									<h3 className="mb-2 truncate font-semibold">{playlist.name}</h3>
									<p className="text-sm text-gray-400">
										{playlist.songs.length} titre{playlist.songs.length !== 1 ? "s" : ""}
									</p>
								</div>
							</Link>
						</motion.div>
					))}
				</div>
			)}
		</div>
	);
}
