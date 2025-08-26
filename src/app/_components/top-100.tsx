"use client";
import { useTop100 } from "@/hooks/use-top";
import MusicSection from "./music-section";

function Top100() {
	const { data, isLoading, error } = useTop100();

	const dataTop100 = data?.map((song) => song.items) || [];

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Failed to load songs</p>;

	return <MusicSection title="Top 100" link="" data={dataTop100[0]} />;
}

export default Top100;
