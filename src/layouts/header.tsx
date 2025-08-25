"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Search, Menu, ArrowLeft, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button"; // shadcn/ui
import Link from "next/link";

export default function Header() {
	const [isScroll, setIsScroll] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScroll(window.scrollY > 0);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<motion.header
			className={`z-[9998] h-[70px] w-[calc(100%-240px)] px-4 transition-all duration-400 sm:w-full md:w-[calc(100%-70px)] ${isScroll ? "bg-[var(--layout-header-bg)] shadow-md backdrop-blur-lg" : "bg-transparent"} `}
			animate={{ backgroundPosition: isScroll ? "-100% -100%" : "0 0" }}
		>
			<div className="relative flex h-full items-center justify-between px-2 sm:px-4">
				{/* Nút trái */}
				<div className="flex flex-grow items-center gap-2 text-[var(--button-hide)] sm:absolute sm:right-0 sm:left-0 sm:z-[-1]">
					<Button variant="ghost" size="icon" className="p-2">
						<ArrowLeft className="h-5 w-5" />
					</Button>
					<Button variant="ghost" size="icon" className="p-2">
						<ArrowRight className="h-5 w-5" />
					</Button>
				</div>

				{/* Ô tìm kiếm */}
				<div className="w-full max-w-[440px] min-w-[280px]">
					<div className="flex items-center rounded-full bg-gray-100 px-3 py-1">
						<Search className="h-5 w-5 text-gray-500" />
						<input
							type="text"
							placeholder="Search..."
							className="flex-1 bg-transparent px-2 text-sm outline-none"
						/>
					</div>
				</div>

				{/* Nút phải */}
				<div className="ml-2 flex items-center gap-3">
					{/* Download button: ẩn ở <900px */}
					<Button variant="primary" size="sm" className="hidden gap-2 md:flex">
						<Download className="h-5 w-5" /> Download
					</Button>

					{/* Avatar */}
					<Image
						src="/default-avatar.png"
						alt="avatar"
						width={40}
						height={40}
						className="rounded-full object-cover hover:brightness-90"
					/>

					{/* Menu mobile: hiển thị ở <600px */}
					<Button variant="ghost" size="icon" className="hidden sm:block">
						<Menu className="h-6 w-6" />
					</Button>
				</div>
			</div>
		</motion.header>
	);
}
