import { create } from "zustand";

export type RepeatMode = "off" | "one" | "all";

export interface Song {
	id: string;
	title: string;
	artist: string;
	duration: number; // seconds
	cover: string;
}

export const newSongs: Song[] = [
	{ id: "1", title: "WUSYANAME", artist: "Tyler, The Creator", duration: 120, cover: "/covers/1.jpg" },
	{ id: "2", title: "Champion", artist: "Kanye West", duration: 167, cover: "/covers/2.jpg" },
	{ id: "3", title: "After The Storm", artist: "Kali Uchis", duration: 209, cover: "/covers/3.jpg" },
	{ id: "4", title: "Earfquake", artist: "Tyler Onkoma", duration: 190, cover: "/covers/4.jpg" },
	{ id: "5", title: "Darling,I", artist: "Tyler Onkoma", duration: 253, cover: "/covers/5.jpg" },
	{ id: "6", title: "Feel it", artist: "D4VD", duration: 158, cover: "/covers/6.jpg" },
	{ id: "7", title: "All the star", artist: "Kendrick Lamar", duration: 232, cover: "/covers/7.jpg" },
	{ id: "8", title: "Peekaboo", artist: "Kendrick Lamar", duration: 156, cover: "/covers/8.jpg" },
];

export interface PlayerState {
	current?: Song;
	queue: Song[];
	playing: boolean;
	volume: number; // 0..1
	shuffle: boolean;
	repeat: RepeatMode;
	setQueue: (songs: Song[]) => void;
	play: (song?: Song) => void;
	pause: () => void;
	next: () => void;
	prev: () => void;
	setVolume: (v: number) => void;
	toggleShuffle: () => void;
	cycleRepeat: () => void;
}

export const usePlayer = create<PlayerState>((set, get) => ({
	current: undefined,
	queue: [],
	playing: false,
	volume: 0.7,
	shuffle: false,
	repeat: "off",
	setQueue: (songs) => set({ queue: songs }),
	play: (song) => {
		if (song) set({ current: song, playing: true });
		else if (get().current) set({ playing: true });
	},
	pause: () => set({ playing: false }),
	next: () => {
		const { queue, current, shuffle, repeat } = get();
		if (!queue.length) return;
		if (shuffle) {
			const idx = Math.floor(Math.random() * queue.length);
			set({ current: queue[idx], playing: true });
			return;
		}
		const i = queue.findIndex((s) => s.id === current?.id);
		if (i === -1) set({ current: queue[0], playing: true });
		else if (i === queue.length - 1) {
			if (repeat === "all") set({ current: queue[0], playing: true });
			else set({ playing: false });
		} else set({ current: queue[i + 1], playing: true });
	},
	prev: () => {
		const { queue, current } = get();
		if (!queue.length) return;
		const i = queue.findIndex((s) => s.id === current?.id);
		if (i <= 0) set({ current: queue[0], playing: true });
		else set({ current: queue[i - 1], playing: true });
	},
	setVolume: (v) => set({ volume: Math.min(1, Math.max(0, v)) }),
	toggleShuffle: () => set((s) => ({ shuffle: !s.shuffle })),
	cycleRepeat: () =>
		set((s) => ({
			repeat: s.repeat === "off" ? "all" : s.repeat === "all" ? "one" : "off",
		})),
}));
