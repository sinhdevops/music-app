"use client";
import { motion } from "framer-motion";

export default function PlaylistCard({ title, img }: { title: string; img: string }) {
	return (
		<motion.div
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.98 }}
			className="bg-card cursor-pointer rounded-xl p-4 shadow hover:shadow-lg"
		>
			<img src={img} alt={title} className="mb-2 rounded-lg" />
			<h3 className="text-sm font-semibold">{title}</h3>
		</motion.div>
	);
}
