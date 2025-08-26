"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayer } from "@/lib/store/player";
import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react";
import { useEffect, useRef } from "react";

export function PlayerBar() {
	const audioRef = useRef<HTMLAudioElement>(null);
	const { current, playing, progress, volume, setProgress, next, prev } = usePlayer();
	useEffect(() => {
		if (!audioRef.current) return;
		audioRef.current.volume = volume / 100;
		if (playing) audioRef.current.play().catch(() => {});
		else audioRef.current.pause();
	}, [playing, volume, current]);
	return (
		<div className="border-border flex h-[84px] items-center gap-4 border-t px-4">
			<div className="flex min-w-0 items-center gap-3">
				{current ? (
					<Image src={current.thumbnail} alt="" width={48} height={48} className="rounded-xl" />
				) : (
					<div className="bg-secondary size-12 rounded-xl" />
				)}
				<div className="truncate">
					<div className="truncate font-medium">{current?.title ?? "Chưa phát bài nào"}</div>
					<div className="truncate text-sm text-white/50">{current?.artist ?? ""}</div>
				</div>
			</div>
			<div className="flex flex-1 flex-col items-center gap-2">
				<div className="flex items-center gap-2">
					<Button size="icon" variant="ghost" onClick={prev}>
						<SkipBack />
					</Button>
					<Button size="icon" onClick={() => usePlayer.getState().play()} aria-label="Play/Pause">
						{usePlayer.getState().playing ? <Pause /> : <Play />}
					</Button>
					<Button size="icon" variant="ghost" onClick={next}>
						<SkipForward />
					</Button>
				</div>
				<div className="flex w-full max-w-xl items-center gap-3">
					<span className="w-10 text-right text-xs">
						{Math.floor(progress / 60)
							.toString()
							.padStart(2, "0")}
						:
						{Math.floor(progress % 60)
							.toString()
							.padStart(2, "0")}
					</span>
					<Slider
						value={[current ? Math.min(100, (progress / current.duration) * 100) : 0]}
						// onChange={(v: number) => {
						// 	if (!current) return;
						// 	const p = (v / 100) * current.duration;
						// 	setProgress(p);
						// 	if (audioRef.current) audioRef.current.currentTime = p;
						// }}
					/>
					<span className="w-10 text-xs">--:--</span>
				</div>
			</div>
			<div className="flex w-56 items-center gap-2">
				<Volume2 className="size-4" />
				<Slider value={[volume]} onChange={() => {}} />
			</div>
			<audio ref={audioRef} src={current?.url} onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)} />
		</div>
	);
}
