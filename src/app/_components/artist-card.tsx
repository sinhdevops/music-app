import { motion } from "framer-motion";
import Image from "next/image";

export const ArtistCard = ({ artist }: { artist: { name: string; img: string } }) => (
	<motion.div
		initial={{ opacity: 0, scale: 0.8 }}
		animate={{ opacity: 1, scale: 1 }}
		whileHover={{ scale: 1.1 }}
		transition={{ duration: 0.3 }}
		className="flex min-w-[80px] flex-col items-center"
	>
		<Image alt="artist" src={artist.img} className="mb-2 h-20 w-20 rounded-full" />
		<span>{artist.name}</span>
	</motion.div>
);
