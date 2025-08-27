// src/app/favorites/page.tsx
"use client";

import { useMusicStore } from "@/lib/store/store";
import { PlayIcon, TrashIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Image from "next/image";

export default function FavoritesPage() {
	const { favorites, playSong, toggleFavorite, currentSong, isPlaying } = useMusicStore();

	const formatDuration = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
	};

	if (favorites.length === 0) {
		return (
			<div className="flex h-full flex-col items-center justify-center text-center">
				<div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-pink-500">
					<HeartIcon className="h-12 w-12 text-white" />
				</div>
				<h2 className="mb-2 text-2xl font-bold">Aucun favori pour le moment</h2>
				<p className="mb-8 text-gray-400">Ajoutez des titres à vos favoris pour les retrouver ici</p>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-6">
				<div className="flex h-32 w-32 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-pink-500">
					<HeartIcon className="h-16 w-16 text-white" />
				</div>
				<div>
					<h1 className="mb-2 text-4xl font-bold">Mes Favoris</h1>
					<p className="text-gray-400">
						{favorites.length} titre{favorites.length !== 1 ? "s" : ""} aimé
						{favorites.length !== 1 ? "s" : ""}
					</p>
					<button
						onClick={() => playSong(favorites[0], favorites, 0)}
						className="mt-4 flex items-center gap-2 rounded-full bg-purple-600 px-8 py-3 font-medium transition-colors hover:bg-purple-700"
					>
						<PlayIcon className="h-5 w-5" />
						Tout lire
					</button>
				</div>
			</div>

			<div className="space-y-2">
				{favorites.map((song, index) => {
					const isCurrentSong = currentSong?.id === song.id;

					return (
						<motion.div
							key={song.id}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: index * 0.05 }}
							className={`group flex cursor-pointer items-center gap-4 rounded-lg p-3 transition-all hover:bg-white/10 ${
								isCurrentSong ? "bg-white/10" : ""
							}`}
							onClick={() => playSong(song, favorites, index)}
						>
							<div className="flex w-8 items-center justify-center font-medium text-gray-400">
								{isCurrentSong && isPlaying ? (
									<div className="flex gap-1">
										<div className="h-4 w-1 animate-pulse rounded-full bg-purple-500" />
										<div className="h-4 w-1 animate-pulse rounded-full bg-purple-500 delay-100" />
										<div className="h-4 w-1 animate-pulse rounded-full bg-purple-500 delay-200" />
									</div>
								) : (
									<>
										<span className="group-hover:hidden">{index + 1}</span>
										<PlayIcon className="hidden h-4 w-4 text-white group-hover:block" />
									</>
								)}
							</div>

							<div className="relative h-12 w-12 overflow-hidden rounded-md">
								<Image src={song.thumbnail} alt={song.title} fill className="object-cover" />
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
									className="rounded-full p-2 text-red-500 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white/10"
								>
									<TrashIcon className="h-4 w-4" />
								</button>
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
