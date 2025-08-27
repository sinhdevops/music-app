// src/store/musicStore.ts
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export interface Song {
	id: string;
	title: string;
	artist: string;
	album: string;
	duration: number;
	thumbnail: string;
	url: string;
	isFavorite?: boolean;
}

export interface Playlist {
	id: string;
	name: string;
	thumbnail: string;
	songs: Song[];
	description?: string;
}

interface PlayerState {
	currentSong: Song | null;
	currentPlaylist: Song[];
	currentIndex: number;
	isPlaying: boolean;
	volume: number;
	isShuffled: boolean;
	repeatMode: "none" | "one" | "all";
	currentTime: number;
	duration: number;
}

interface MusicState extends PlayerState {
	playlists: Playlist[];
	favorites: Song[];
	searchResults: Song[];
	searchQuery: string;
	theme: "light" | "dark" | "purple";

	// Actions
	playSong: (song: Song, playlist?: Song[], index?: number) => void;
	pauseSong: () => void;
	togglePlayPause: () => void;
	nextSong: () => void;
	previousSong: () => void;
	setVolume: (volume: number) => void;
	toggleShuffle: () => void;
	toggleRepeat: () => void;
	seekTo: (time: number) => void;
	updateCurrentTime: (time: number) => void;
	setDuration: (duration: number) => void;

	// Playlist actions
	addToPlaylist: (playlistId: string, song: Song) => void;
	removeFromPlaylist: (playlistId: string, songId: string) => void;
	createPlaylist: (name: string) => void;
	deletePlaylist: (playlistId: string) => void;

	// Favorites
	toggleFavorite: (song: Song) => void;

	// Search
	setSearchQuery: (query: string) => void;
	setSearchResults: (results: Song[]) => void;

	// Theme
	setTheme: (theme: "light" | "dark" | "purple") => void;
}

export const useMusicStore = create<MusicState>()(
	subscribeWithSelector((set, get) => ({
		// Initial state
		currentSong: null,
		currentPlaylist: [],
		currentIndex: 0,
		isPlaying: false,
		volume: 0.7,
		isShuffled: false,
		repeatMode: "none",
		currentTime: 0,
		duration: 0,
		playlists: [],
		favorites: [],
		searchResults: [],
		searchQuery: "",
		theme: "dark",

		// Player actions
		playSong: (song, playlist = [], index = 0) => {
			set({
				currentSong: song,
				currentPlaylist: playlist.length > 0 ? playlist : [song],
				currentIndex: index,
				isPlaying: true,
			});
		},

		pauseSong: () => set({ isPlaying: false }),

		togglePlayPause: () => {
			const { isPlaying } = get();
			set({ isPlaying: !isPlaying });
		},

		nextSong: () => {
			const { currentPlaylist, currentIndex, repeatMode, isShuffled } = get();

			if (currentPlaylist.length === 0) return;

			let nextIndex = currentIndex;

			if (isShuffled) {
				nextIndex = Math.floor(Math.random() * currentPlaylist.length);
			} else {
				nextIndex = currentIndex + 1;

				if (nextIndex >= currentPlaylist.length) {
					if (repeatMode === "all") {
						nextIndex = 0;
					} else {
						return;
					}
				}
			}

			set({
				currentSong: currentPlaylist[nextIndex],
				currentIndex: nextIndex,
				isPlaying: true,
			});
		},

		previousSong: () => {
			const { currentPlaylist, currentIndex } = get();

			if (currentPlaylist.length === 0) return;

			let prevIndex = currentIndex - 1;

			if (prevIndex < 0) {
				prevIndex = currentPlaylist.length - 1;
			}

			set({
				currentSong: currentPlaylist[prevIndex],
				currentIndex: prevIndex,
				isPlaying: true,
			});
		},

		setVolume: (volume) => set({ volume }),

		toggleShuffle: () => {
			const { isShuffled } = get();
			set({ isShuffled: !isShuffled });
		},

		toggleRepeat: () => {
			const { repeatMode } = get();
			const modes: ("none" | "one" | "all")[] = ["none", "one", "all"];
			const currentIndex = modes.indexOf(repeatMode);
			const nextMode = modes[(currentIndex + 1) % modes.length];
			set({ repeatMode: nextMode });
		},

		seekTo: (time) => set({ currentTime: time }),

		updateCurrentTime: (time) => set({ currentTime: time }),

		setDuration: (duration) => set({ duration }),

		// Playlist actions
		addToPlaylist: (playlistId, song) => {
			const { playlists } = get();
			const updatedPlaylists = playlists.map((playlist) => {
				if (playlist.id === playlistId) {
					return {
						...playlist,
						songs: [...playlist.songs, song],
					};
				}
				return playlist;
			});
			set({ playlists: updatedPlaylists });
		},

		removeFromPlaylist: (playlistId, songId) => {
			const { playlists } = get();
			const updatedPlaylists = playlists.map((playlist) => {
				if (playlist.id === playlistId) {
					return {
						...playlist,
						songs: playlist.songs.filter((song) => song.id !== songId),
					};
				}
				return playlist;
			});
			set({ playlists: updatedPlaylists });
		},

		createPlaylist: (name) => {
			const { playlists } = get();
			const newPlaylist: Playlist = {
				id: Date.now().toString(),
				name,
				thumbnail: "/default-playlist.jpg",
				songs: [],
				description: `Created playlist: ${name}`,
			};
			set({ playlists: [...playlists, newPlaylist] });
		},

		deletePlaylist: (playlistId) => {
			const { playlists } = get();
			set({ playlists: playlists.filter((p) => p.id !== playlistId) });
		},

		// Favorites
		toggleFavorite: (song) => {
			const { favorites } = get();
			const isFavorite = favorites.some((fav) => fav.id === song.id);

			if (isFavorite) {
				set({ favorites: favorites.filter((fav) => fav.id !== song.id) });
			} else {
				set({ favorites: [...favorites, { ...song, isFavorite: true }] });
			}
		},

		// Search
		setSearchQuery: (query) => set({ searchQuery: query }),

		setSearchResults: (results) => set({ searchResults: results }),

		// Theme
		setTheme: (theme) => set({ theme }),
	})),
);
