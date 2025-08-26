export interface IArtist {
	id: string;
	name: string;
	link: string;
	spotlight: boolean;
	alias: string;
	thumbnail: string;
	thumbnailM: string;
	isOA: boolean;
	isOABrand: boolean;
	playlistId?: string;
	totalFollow: number;
}

export interface IPlaylistItem {
	encodeId: string;
	title: string;
	thumbnail: string;
	thumbnailM: string;
	isoffical: boolean;
	link: string;
	isIndie: boolean;
	releaseDate: string;
	sortDescription: string;
	releasedAt: number;
	genreIds?: string[];
	artists: IArtist[];
	artistsNames: string;
	playItemMode: number;
	subType: number;
	uid: number;
	isShuffle: boolean;
	isPrivate: boolean;
	userName: string;
	isAlbum: boolean;
	textType: string;
	isSingle: boolean;
}

export interface ISectionMusic {
	sectionType: string;
	viewType: string;
	title: string;
	link: string;
	sectionId: string;
	items: IPlaylistItem[];
}
