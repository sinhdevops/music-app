// components/Section.tsx
import Image from "next/image";
import { IPlaylistItem } from "@/@types/songs";
import { Play } from "lucide-react"; // icon từ lucide-react

interface MusicSectionProps {
	data: IPlaylistItem[];
	title: string;
	link: string;
}

export default function MusicSection({ data, title, link }: MusicSectionProps) {
	return (
		<div className="mb-8">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="text-xl font-bold">{title}</h2>
				<a href={link} className="text-primary text-sm hover:underline">
					TẤT CẢ
				</a>
			</div>

			<div className="grid grid-cols-5 gap-4">
				{data.slice(0, 5).map((item, index) => (
					<div className="">
						<div
							key={index}
							className="group relative overflow-hidden rounded-lg bg-[#1a1a1a] transition hover:bg-[#252525]"
						>
							<div className="relative aspect-square overflow-hidden rounded-lg">
								<Image
									src={item.thumbnailM || item.thumbnail}
									alt={item.artistsNames}
									fill
									className="object-cover transition group-hover:scale-110"
								/>

								{/* Nút play hiện khi hover */}
								<button className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
									<Play className="bg-primary h-10 w-10 rounded-full p-2 text-white" />
								</button>
							</div>
						</div>
						<div className="mt-2">
							<h3 className="truncate text-sm font-medium text-white">{item.title}</h3>
							<p className="truncate text-xs text-gray-400">{item.sortDescription}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
