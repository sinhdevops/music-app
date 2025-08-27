// src/app/search/page.tsx
"use client";

import { useMusicStore } from "@/lib/store/store";
import { PlayIcon, HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SearchPage() {
	const { searchResults, searchQuery, playSong, favorites, toggleFavorite, currentSong } = useMusicStore();

	const formatDuration = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
	};

	if (!searchQuery) {
		return (
			<div className="flex h-full flex-col items-center justify-center text-center">
				<div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
					<MagnifyingGlassIcon className="h-12 w-12 text-white" />
				</div>
				<h2 className="mb-2 text-2xl font-bold">Recherchez votre musique</h2>
				<p className="mb-8 text-gray-400">Trouvez vos artistes, albums et titres préférés</p>

				<div className="grid w-full max-w-2xl grid-cols-2 gap-4 md:grid-cols-4">
					{["Pop", "Rock", "Hip-Hop", "Jazz", "Électronique", "Classique", "R&B", "Country"].map((genre) => (
						<div
							key={genre}
							className="flex aspect-square cursor-pointer items-end rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 p-4 transition-transform hover:scale-105"
						>
							<span className="text-lg font-bold">{genre}</span>
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div>
				<h1 className="mb-2 text-3xl font-bold">Résultats pour "{searchQuery}"</h1>
				<p className="text-gray-400">
					{searchResults.length} résultat{searchResults.length !== 1 ? "s" : ""} trouvé
					{searchResults.length !== 1 ? "s" : ""}
				</p>
			</div>

			{searchResults.length > 0 ? (
				<div className="space-y-2">
					{searchResults.map((song, index) => {
						const isFavorite = favorites.some((fav) => fav.id === song.id);
						const isCurrentSong = currentSong?.id === song.id;

						return (
							<motion.div
								key={song.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
								className={`group flex cursor-pointer items-center gap-4 rounded-lg p-3 transition-all hover:bg-white/10 ${
									isCurrentSong ? "bg-white/10" : ""
								}`}
								onClick={() => playSong(song, searchResults, index)}
							>
								<div className="relative h-12 w-12 overflow-hidden rounded-md">
									<Image src={song.thumbnail} alt={song.title} fill className="object-cover" />
									<div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
										<PlayIcon className="h-4 w-4 text-white" />
									</div>
								</div>

								<div className="min-w-0 flex-1">
									<h3
										className={`truncate font-medium ${
											isCurrentSong ? "text-purple-400" : "text-white"
										}`}
									>
										{song.title}
									</h3>
									<p className="truncate text-sm text-gray-400">{song.artist}</p>
								</div>

								<div className="flex items-center gap-4">
									<span className="text-sm text-gray-400 tabular-nums">
										{formatDuration(song.duration)}
									</span>

									<button
										onClick={(e) => {
											e.stopPropagation();
											toggleFavorite(song);
										}}
										className="rounded-full p-2 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white/10"
									>
										{isFavorite ? (
											<HeartIcon className="h-4 w-4 text-red-500" />
										) : (
											<HeartOutline className="h-4 w-4 text-gray-400 hover:text-white" />
										)}
									</button>
								</div>
							</motion.div>
						);
					})}
				</div>
			) : (
				<div className="py-12 text-center">
					<p className="text-gray-400">Aucun résultat trouvé pour votre recherche.</p>
				</div>
			)}
		</div>
	);
}
