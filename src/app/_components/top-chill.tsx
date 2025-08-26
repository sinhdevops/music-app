"use client";
import { useTop100 } from "@/hooks/use-top";
import MusicSection from "./music-section";

function TopChill() {
	const { data, isLoading, error } = useTop100();

	const dataTopChill = data?.map((song) => song.items) || [];

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Failed to load songs</p>;

	return <MusicSection title="Chill" link="" data={dataTopChill[1]} />;
}

export default TopChill;
