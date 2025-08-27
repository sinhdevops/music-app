// src/app/radio/page.tsx
"use client";

import { RadioIcon, PlayIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";

const radioStations = [
	{
		id: "hits",
		name: "Hits du Moment",
		description: "Les plus gros hits actuels",
		thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
		listeners: "125k",
	},
	{
		id: "chill",
		name: "Chill Radio",
		description: "Musique relaxante 24/7",
		thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
		listeners: "89k",
	},
	{
		id: "rock",
		name: "Rock Classics",
		description: "Les plus grands classiques rock",
		thumbnail: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop",
		listeners: "156k",
	},
	{
		id: "electronic",
		name: "Electronic Beats",
		description: "EDM et musique électronique",
		thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
		listeners: "92k",
	},
];

export default function RadioPage() {
	return (
		<div className="space-y-8">
			<div className="text-center">
				<div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-500">
					<RadioIcon className="h-12 w-12 text-white" />
				</div>
				<h1 className="mb-4 text-4xl font-bold">Radio</h1>
				<p className="mx-auto max-w-2xl text-lg text-gray-400">
					Écoutez vos stations de radio préférées avec une programmation musicale continue
				</p>
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				{radioStations.map((station, index) => (
					<motion.div
						key={station.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.1 }}
						className="music-card group cursor-pointer"
					>
						<div className="flex items-center gap-4">
							<div className="relative h-20 w-20 overflow-hidden rounded-xl">
								<Image
									src={station.thumbnail}
									alt={station.name}
									fill
									className="object-cover transition-transform duration-300 group-hover:scale-110"
								/>
								<div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
									<PlayIcon className="h-6 w-6 text-white" />
								</div>
							</div>

							<div className="flex-1">
								<h3 className="mb-1 text-lg font-semibold">{station.name}</h3>
								<p className="mb-2 text-sm text-gray-400">{station.description}</p>
								<div className="flex items-center gap-2 text-xs text-gray-500">
									<div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
									<span>{station.listeners} auditeurs</span>
								</div>
							</div>

							<button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30">
								<PlayIcon className="h-5 w-5 text-white" />
							</button>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	);
}
