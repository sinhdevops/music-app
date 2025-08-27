// src/components/MusicPlayer.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useMusicStore } from "@/lib/store/store";
import {
	PlayIcon,
	PauseIcon,
	ForwardIcon,
	BackwardIcon,
	SpeakerWaveIcon,
	SpeakerXMarkIcon,
	ArrowPathRoundedSquareIcon,
	ArrowsRightLeftIcon,
	HeartIcon,
} from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function MusicPlayer() {
	const {
		currentSong,
		isPlaying,
		volume,
		isShuffled,
		repeatMode,
		currentTime,
		duration,
		favorites,
		togglePlayPause,
		nextSong,
		previousSong,
		setVolume,
		toggleShuffle,
		toggleRepeat,
		seekTo,
		updateCurrentTime,
		setDuration,
		toggleFavorite,
	} = useMusicStore();

	const audioRef = useRef<HTMLAudioElement>(null);
	const [isVolumeVisible, setIsVolumeVisible] = useState(false);

	// Audio effects
	useEffect(() => {
		if (!audioRef.current || !currentSong) return;

		if (isPlaying) {
			audioRef.current.play();
		} else {
			audioRef.current.pause();
		}
	}, [isPlaying, currentSong]);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = volume;
		}
	}, [volume]);

	const handleTimeUpdate = () => {
		if (audioRef.current) {
			updateCurrentTime(audioRef.current.currentTime);
		}
	};

	const handleLoadedMetadata = () => {
		if (audioRef.current) {
			setDuration(audioRef.current.duration);
		}
	};

	const handleEnded = () => {
		if (repeatMode === "one") {
			if (audioRef.current) {
				audioRef.current.currentTime = 0;
				audioRef.current.play();
			}
		} else {
			nextSong();
		}
	};

	const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
		const time = parseFloat(e.target.value);
		seekTo(time);
		if (audioRef.current) {
			audioRef.current.currentTime = time;
		}
	};

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	};

	const isFavorite = currentSong ? favorites.some((fav) => fav.id === currentSong.id) : false;

	if (!currentSong) {
		return null;
	}

	return (
		<AnimatePresence>
			<motion.div
				initial={{ y: 100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: 100, opacity: 0 }}
				className="glass fixed right-0 bottom-0 left-0 z-50 border-t border-white/10 p-4"
			>
				<audio
					ref={audioRef}
					src={currentSong.url}
					onTimeUpdate={handleTimeUpdate}
					onLoadedMetadata={handleLoadedMetadata}
					onEnded={handleEnded}
					preload="metadata"
				/>

				<div className="mx-auto max-w-7xl">
					{/* Progress bar */}
					<div className="mb-4">
						<input
							type="range"
							min={0}
							max={duration || 0}
							value={currentTime}
							onChange={handleSeek}
							className="slider h-1 w-full cursor-pointer appearance-none rounded-lg bg-gray-600"
						/>
					</div>

					<div className="flex items-center justify-between">
						{/* Song info */}
						<div className="flex min-w-0 flex-1 items-center gap-4">
							<div className="relative h-16 w-16 overflow-hidden rounded-lg">
								<Image
									src={currentSong.thumbnail}
									alt={currentSong.title}
									fill
									className="object-cover"
								/>
							</div>

							<div className="min-w-0 flex-1">
								<h3 className="truncate font-semibold text-white">{currentSong.title}</h3>
								<p className="truncate text-sm text-gray-400">{currentSong.artist}</p>
							</div>

							<button onClick={() => toggleFavorite(currentSong)} className="player-button">
								{isFavorite ? (
									<HeartIcon className="h-5 w-5 text-red-500" />
								) : (
									<HeartOutline className="h-5 w-5 text-gray-400 hover:text-white" />
								)}
							</button>
						</div>

						{/* Controls */}
						<div className="flex flex-1 items-center justify-center gap-4">
							<button
								onClick={toggleShuffle}
								className={`player-button ${isShuffled ? "text-purple-500" : "text-gray-400"}`}
							>
								<ArrowsRightLeftIcon className="h-5 w-5" />
							</button>

							<button onClick={previousSong} className="player-button">
								<BackwardIcon className="h-6 w-6" />
							</button>

							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={togglePlayPause}
								className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-900 transition-colors hover:bg-gray-200"
							>
								{isPlaying ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="ml-1 h-6 w-6" />}
							</motion.button>

							<button onClick={nextSong} className="player-button">
								<ForwardIcon className="h-6 w-6" />
							</button>

							<button
								onClick={toggleRepeat}
								className={`player-button ${
									repeatMode !== "none" ? "text-purple-500" : "text-gray-400"
								}`}
							>
								<ArrowPathRoundedSquareIcon className="h-5 w-5" />
								{repeatMode === "one" && (
									<span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-purple-500" />
								)}
							</button>
						</div>

						{/* Volume and time */}
						<div className="flex flex-1 items-center justify-end gap-4">
							<span className="text-sm text-gray-400 tabular-nums">
								{formatTime(currentTime)} / {formatTime(duration)}
							</span>

							<div
								className="relative flex items-center"
								onMouseEnter={() => setIsVolumeVisible(true)}
								onMouseLeave={() => setIsVolumeVisible(false)}
							>
								<button className="player-button">
									{volume === 0 ? (
										<SpeakerXMarkIcon className="h-5 w-5" />
									) : (
										<SpeakerWaveIcon className="h-5 w-5" />
									)}
								</button>

								<AnimatePresence>
									{isVolumeVisible && (
										<motion.div
											initial={{ opacity: 0, width: 0 }}
											animate={{ opacity: 1, width: 100 }}
											exit={{ opacity: 0, width: 0 }}
											className="absolute -top-8 right-0"
										>
											<input
												type="range"
												min={0}
												max={1}
												step={0.1}
												value={volume}
												onChange={(e) => setVolume(parseFloat(e.target.value))}
												className="h-1 w-24 cursor-pointer appearance-none rounded-lg bg-gray-600"
											/>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	);
}
