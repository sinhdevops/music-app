import { create } from "zustand";

export type Track = {
	id: string;
	title: string;
	artist: string;
	thumbnail: string;
	url: string;
	duration: number;
};

type PlayerState = {
	queue: Track[];
	current?: Track;
	playing: boolean;
	volume: number;
	progress: number;
	setQueue: (q: Track[]) => void;
	play: (t?: Track) => void;
	pause: () => void;
	setProgress: (p: number) => void;
	setVolume: (v: number) => void;
	next: () => void;
	prev: () => void;
};

export const usePlayer = create<PlayerState>((set, get) => ({
	queue: [],
	current: undefined,
	playing: false,
	volume: 80,
	progress: 0,
	setQueue: (queue) => set({ queue }),
	play: (t) => set({ current: t ?? get().current, playing: true }),
	pause: () => set({ playing: false }),
	setProgress: (p) => set({ progress: p }),
	setVolume: (v) => set({ volume: v }),
	next: () => {
		const { queue, current } = get();
		const idx = queue.findIndex((i) => i.id === current?.id);
		if (idx >= 0 && idx < queue.length - 1) set({ current: queue[idx + 1], playing: true, progress: 0 });
	},
	prev: () => {
		const { queue, current } = get();
		const idx = queue.findIndex((i) => i.id === current?.id);
		if (idx > 0) set({ current: queue[idx - 1], playing: true, progress: 0 });
	},
}));
