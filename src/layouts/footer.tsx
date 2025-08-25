import { secondsToMMSS } from "@/lib/utils";
import { SkipBack, Pause, Play, SkipForward, VolumeX, Volume2 } from "lucide-react";
import { useRef, useState } from "react";

const playlists = [
	{
		id: "p1",
		title: "Lo-Fi Focus",
		desc: "Beats to study and relax",
		cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
		color: "from-emerald-500/30 to-teal-500/30",
	},
	{
		id: "p2",
		title: "V-Pop Today",
		desc: "Hot hits Việt Nam",
		cover: "https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?q=80&w=800&auto=format&fit=crop",
		color: "from-fuchsia-500/30 to-pink-500/30",
	},
	{
		id: "p3",
		title: "EDM Booster",
		desc: "Amp up the energy",
		cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800&auto=format&fit=crop",
		color: "from-indigo-500/30 to-sky-500/30",
	},
	{
		id: "p4",
		title: "Acoustic Chill",
		desc: "Guitar & warm vibes",
		cover: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=800&auto=format&fit=crop",
		color: "from-amber-500/30 to-orange-500/30",
	},
	{
		id: "p5",
		title: "Hip-Hop Workout",
		desc: "Bars & bass",
		cover: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=800&auto=format&fit=crop",
		color: "from-blue-500/30 to-cyan-500/30",
	},
	{
		id: "p6",
		title: "Jazz Lounge",
		desc: "Late night sessions",
		cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
		color: "from-rose-500/30 to-purple-500/30",
	},
];

const tracks = [
	{
		id: "t1",
		title: "Midnight Drive",
		artist: "Neon City",
		cover: "https://images.unsplash.com/photo-1521334726092-b509a19597d2?q=80&w=800&auto=format&fit=crop",
		src: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_2c5c2e6b5d.mp3?filename=calm-ambient-110397.mp3",
		duration: 214,
	},
	{
		id: "t2",
		title: "Lo-Fi Breeze",
		artist: "Sleepy D",
		cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800&auto=format&fit=crop",
		src: "https://cdn.pixabay.com/download/audio/2022/10/24/audio_3a62b1f2bf.mp3?filename=lofi-study-ambient-124008.mp3",
		duration: 189,
	},
	{
		id: "t3",
		title: "Sunset Walk",
		artist: "Verve",
		cover: "https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?q=80&w=800&auto=format&fit=crop",
		src: "https://cdn.pixabay.com/download/audio/2022/03/10/audio_8732d0b6c2.mp3?filename=chill-ambient-110125.mp3",
		duration: 203,
	},
];
function Footer() {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [progress, setProgress] = useState(0);
	const [volume, setVolume] = useState(0.9);
	const [muted, setMuted] = useState(false);
	const current = tracks[currentIndex];
	const onTogglePlay = () => {
		const el = audioRef.current;
		if (!el) return;
		if (isPlaying) {
			el.pause();
			setIsPlaying(false);
		} else {
			el.play();
			setIsPlaying(true);
		}
	};

	const onTimeUpdate = () => {
		const el = audioRef.current;
		if (!el || !el.duration) return;
		setProgress((el.currentTime / el.duration) * 100);
	};

	const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
		const el = audioRef.current;
		if (!el || !el.duration) return;
		const p = Number(e.target.value);
		el.currentTime = (p / 100) * el.duration;
		setProgress(p);
	};

	const onPrev = () => {
		setCurrentIndex((i) => (i === 0 ? tracks.length - 1 : i - 1));
		setIsPlaying(true);
	};

	const onNext = () => {
		setCurrentIndex((i) => (i + 1) % tracks.length);
		setIsPlaying(true);
	};

	const onLoaded = () => {
		const el = audioRef.current;
		if (!el) return;
		el.volume = muted ? 0 : volume;
		if (isPlaying) el.play();
	};

	const onChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
		const v = Number(e.target.value);
		setVolume(v);
		const el = audioRef.current;
		if (el) el.volume = v;
	};
	return (
		<footer className="sticky bottom-0 w-full border-t border-white/10 bg-gradient-to-t from-black/90 to-black/60 px-2 py-2 backdrop-blur sm:px-4 sm:py-3">
			<div className="mx-auto grid max-w-[1400px] grid-cols-12 items-center gap-2 sm:gap-4">
				{/* Now Playing */}
				<div className="col-span-6 flex min-w-0 items-center gap-2 sm:col-span-4 sm:gap-3">
					<img src={current.cover} className="h-10 w-10 rounded-md object-cover sm:h-12 sm:w-12" />
					<div className="min-w-0">
						<div className="truncate text-sm font-medium sm:text-base">{current.title}</div>
						<div className="truncate text-xs text-white/60">{current.artist}</div>
					</div>
				</div>

				{/* Controls */}
				<div className="col-span-6 flex flex-col items-center sm:col-span-4">
					<div className="flex items-center gap-3 sm:gap-4">
						<button onClick={onPrev} className="rounded-lg p-2 hover:bg-white/10">
							<SkipBack className="h-5 w-5" />
						</button>
						<button
							onClick={onTogglePlay}
							className="rounded-full bg-white p-3 text-black transition hover:scale-105"
						>
							{isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
						</button>
						<button onClick={onNext} className="rounded-lg p-2 hover:bg-white/10">
							<SkipForward className="h-5 w-5" />
						</button>
					</div>

					{/* Seek bar (ẩn mobile) */}
					<div className="mt-2 hidden w-full items-center gap-3 sm:flex">
						<span className="w-10 text-right text-[11px] text-white/60">
							00:
							{Math.round((progress / 100) * (current.duration || 0))
								.toString()
								.padStart(2, "0")}
						</span>
						<input
							type="range"
							min={0}
							max={100}
							value={progress}
							onChange={onSeek}
							className="w-full accent-white"
						/>
						<span className="w-10 text-[11px] text-white/60">{secondsToMMSS(current.duration || 0)}</span>
					</div>
				</div>

				{/* Volume (ẩn mobile) */}
				<div className="col-span-4 hidden items-center justify-end gap-2 sm:flex">
					<button
						className="rounded-lg p-2 hover:bg-white/10"
						onClick={() => {
							const next = !muted;
							setMuted(next);
							const el = audioRef.current;
							if (el) el.muted = next;
						}}
					>
						{muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
					</button>
					<input
						type="range"
						min={0}
						max={1}
						step={0.01}
						value={volume}
						onChange={onChangeVolume}
						className="w-32 accent-white"
					/>
				</div>
			</div>

			{/* Hidden audio */}
			<audio
				ref={audioRef}
				src={current.src}
				onLoadedMetadata={onLoaded}
				onTimeUpdate={onTimeUpdate}
				onEnded={onNext}
				autoPlay={isPlaying}
			/>
		</footer>
	);
}

export default Footer;
