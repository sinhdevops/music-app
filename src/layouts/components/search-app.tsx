"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useDebounce } from "use-debounce";
import { motion, AnimatePresence } from "framer-motion";
import PlayListSong from "@/features/PlayListSong";
import { AccountPropose } from "@/components/Propose";
import { SearchApi } from "@/services";
import { Loading } from "@/components/Icons";
import { Input } from "@/components/ui/input";

interface SearchAppProps {
	visibleHeaderMobile?: boolean;
	handleSearchForm?: () => void;
}

export default function SearchApp({ visibleHeaderMobile, handleSearchForm }: SearchAppProps) {
	const [value, setValue] = useState("");
	const [searchResult, setSearchResult] = useState<any[]>([]);
	const [visible, setVisible] = useState(false);
	const [loadingSearch, setLoadingSearch] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const [value] = useDebounce(text, 1000);

	// debounce search
	useEffect(() => {
		const timer = setTimeout(async () => {
			if (value.trim()) {
				setLoadingSearch(true);
				try {
					const result = await SearchApi(value);
					setSearchResult(result);
				} finally {
					setLoadingSearch(false);
				}
			} else {
				setSearchResult([]);
			}
		}, 500);
		return () => clearTimeout(timer);
	}, [value]);

	// click outside
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				setVisible(false);
			}
		};
		window.addEventListener("click", handleClickOutside);
		return () => window.removeEventListener("click", handleClickOutside);
	}, []);

	return (
		<div ref={containerRef} className="relative w-full max-w-[440px] min-w-[280px]">
			<div
				className={`flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md transition-all ${visible || visibleHeaderMobile ? "ring-2 ring-blue-500" : ""}`}
			>
				<Search className="h-5 w-5 text-gray-400" />
				<Input
					value={value}
					onFocus={() => setVisible(true)}
					onChange={(e) => setValue(e.target.value)}
					placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
					className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
				/>
				{loadingSearch && <Loading />}
				{value && !loadingSearch && (
					<X
						onClick={() => {
							setValue("");
							setSearchResult([]);
						}}
						className="h-5 w-5 cursor-pointer text-gray-400"
					/>
				)}
			</div>

			<AnimatePresence>
				{(visible || visibleHeaderMobile) && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2 }}
						className="absolute top-full left-0 z-50 mt-2 w-full rounded-xl bg-white p-4 shadow-lg"
					>
						<h4 className="mb-2 text-sm font-semibold text-gray-700">
							{searchResult.length > 0 ? "Gợi ý kết quả" : "Nhập thông tin tìm kiếm"}
						</h4>
						{searchResult.length > 0 && (
							<AccountPropose
								onHandle={visibleHeaderMobile ? handleSearchForm : () => setVisible(false)}
								data={searchResult}
							/>
						)}
						{searchResult.map((item, index) => (
							<PlayListSong song={item} index={index} key={index} data={searchResult} />
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
