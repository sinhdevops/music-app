"use client";

import { useMusicStore, Song } from "@/lib/store/store";
import { PlayIcon, HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import MusicSection from "./_components/music-section";
import { useTop100 } from "@/hooks/use-top";

const mockSongs: Song[] = [
	{
		id: "1",
		title: "Blinding Lights",
		artist: "The Weeknd",
		album: "After Hours",
		duration: 200,
		thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
		url: "/sample-songs/blinding-lights.mp3",
	},
	{
		id: "2",
		title: "Watermelon Sugar",
		artist: "Harry Styles",
		album: "Fine Line",
		duration: 174,
		thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
		url: "/sample-songs/watermelon-sugar.mp3",
	},
	{
		id: "3",
		title: "Levitating",
		artist: "Dua Lipa",
		album: "Future Nostalgia",
		duration: 203,
		thumbnail: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop",
		url: "/sample-songs/levitating.mp3",
	},
	{
		id: "4",
		title: "Good 4 U",
		artist: "Olivia Rodrigo",
		album: "SOUR",
		duration: 178,
		thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
		url: "/sample-songs/good4u.mp3",
	},
	{
		id: "5",
		title: "Stay",
		artist: "The Kid LAROI & Justin Bieber",
		album: "Stay",
		duration: 141,
		thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
		url: "/sample-songs/stay.mp3",
	},
];

export default function HomePage() {
	const { playSong, favorites, toggleFavorite, currentSong, isPlaying } = useMusicStore();
	const [greeting, setGreeting] = useState("");

	const { data } = useTop100();

	const dataTop100 = data?.map((song) => song.items) || [];

	useEffect(() => {
		const hour = new Date().getHours();
		if (hour < 12) {
			setGreeting("Bonjour");
		} else if (hour < 18) {
			setGreeting("Bon après-midi");
		} else {
			setGreeting("Bonsoir");
		}
	}, []);

	const formatDuration = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
	};

	const handlePlaySong = (song: Song) => {
		playSong(
			song,
			mockSongs,
			mockSongs.findIndex((s) => s.id === song.id),
		);
	};

	return (
		<div className="space-y-8">
			{/* Hero Section */}
			<section>
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="mb-2 text-4xl font-bold"
				>
					{greeting} 👋
				</motion.h1>
				<p className="text-lg text-gray-400">Découvrez votre musique préférée et explorez de nouveaux sons</p>
			</section>
			{/* Quick Access - Recently Played */}
			<section>
				<h2 className="mb-6 text-2xl font-bold">Récemment écoutés</h2>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{mockSongs.slice(0, 6).map((song, index) => (
						<motion.div
							key={song.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							className="glass group flex cursor-pointer items-center gap-4 rounded-lg p-3 transition-all hover:bg-white/10"
							onClick={() => handlePlaySong(song)}
						>
							<div className="relative h-12 w-12 overflow-hidden rounded-md">
								<Image src={song.thumbnail} alt={song.title} fill className="object-cover" />
								<div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
									<PlayIcon className="h-5 w-5 text-white" />
								</div>
							</div>
							<div className="min-w-0 flex-1">
								<p className="truncate font-medium">{song.title}</p>
								<p className="truncate text-sm text-gray-400">{song.artist}</p>
							</div>
						</motion.div>
					))}
				</div>
			</section>
			{/* Playlists Top 100*/}
			<MusicSection title="Top 100" link="" data={dataTop100[0]} />

			{/* Playlists Top chill*/}
			<MusicSection title="Chill" link="" data={dataTop100[1]} />

			{/* <section>
				<h2 className="mb-6 text-2xl font-bold">Playlists en vedette</h2>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{featuredPlaylists.map((playlist, index) => (
						<motion.div
							key={playlist.id}
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: index * 0.1 }}
							className="music-card group"
						>
							<div className="relative mb-4 aspect-square overflow-hidden rounded-lg">
								<Image
									src={playlist.thumbnail}
									alt={playlist.name}
									fill
									className="object-cover transition-transform duration-300 group-hover:scale-110"
								/>
								<div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
									<button
										onClick={() => handlePlaySong(playlist.songs[0])}
										className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/30"
									>
										<PlayIcon className="ml-1 h-6 w-6 text-white" />
									</button>
								</div>
							</div>
							<h3 className="mb-2 font-semibold">{playlist.name}</h3>
							<p className="line-clamp-2 text-sm text-gray-400">{playlist.description}</p>
						</motion.div>
					))}
				</div>
			</section> */}
			{/* Top Songs */}
			<section>
				<h2 className="mb-6 text-2xl font-bold">Top des titres</h2>
				<div className="space-y-2">
					{mockSongs.map((song, index) => {
						const isFavorite = favorites.some((fav) => fav.id === song.id);
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
								onClick={() => handlePlaySong(song)}
							>
								<div className="flex w-8 items-center justify-center font-medium text-gray-400">
									{isCurrentSong && isPlaying ? (
										<div className="flex gap-1">
											<div className="h-4 w-1 animate-pulse rounded-full bg-purple-500" />
											<div className="h-4 w-1 animate-pulse rounded-full bg-purple-500 delay-100" />
											<div className="h-4 w-1 animate-pulse rounded-full bg-purple-500 delay-200" />
										</div>
									) : (
										<span className="group-hover:hidden">{index + 1}</span>
									)}
									<PlayIcon className="hidden h-4 w-4 text-white group-hover:block" />
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
			</section>
		</div>
	);
}
