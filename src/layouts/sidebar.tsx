"use client";

import React, { useState, useEffect, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
// import { toast } from "react-toastify";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useParams } from "next/navigation";
// import { SIDEBAR_MENU } from "@/redux/constant";
// import { combinedStatusSelector } from "@/redux/selector";

import { User, Compass, Radio, Music, Star } from "lucide-react";

export const SIDEBAR_MENU = [
	{
		title: "Cá nhân",
		icon: User,
		to: "/my-player",
	},
	{
		title: "Khám Phá",
		icon: Compass,
		to: "/",
	},
	{
		title: "Radio",
		icon: Radio,
		to: "/radio",
	},
	{
		title: "Nhạc Mới",
		icon: Music,
		spederate: true,
		to: "/new-songs",
	},
	{
		title: "Top 100",
		icon: Star,
		to: "/top-100-song",
	},
];

const isSidebarMobile = false;

export default function Sidebar() {
	const [isOpenSideBar, setIsOpenSideBar] = useState<boolean>(true);
	// const dispatch = useDispatch();
	const params = useParams();
	const slug = params.slug; // slug lấy từ URL
	const router = useRouter();
	// const { idActive, dataUser, isSidebarMobile } = useSelector(combinedStatusSelector);
	const [windowWidth, setWindowWidth] = useState<number>(0);

	const imgError = "https://digimedia.web.ua.pt/wp-content/uploads/2017/05/default-user-image.png";

	const numActive = SIDEBAR_MENU.findIndex((item) => item.to === `/${slug}`) + 1;

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// const handleSign = () => {
	// 	if (dataUser.accessToken) {
	// 		router.push("..");
	// 		dispatch(loginSlice.actions.setAccessToken(""));
	// 		dispatch(loginSlice.actions.setListSongFavorite([]));
	// 		toast.info("Đăng xuất thành công");
	// 		dispatch(statusSlice.actions.isSidebarMobile(false));
	// 	} else {
	// 		dispatch(loginSlice.actions.setIsLogin(true));
	// 	}
	// };

	// const handleClickMenu = (index: number) => {
	// 	if (idActive === index) {
	// 		dispatch(sidebarSlice.actions.setIdSidebarActive(null));
	// 	} else {
	// 		dispatch(sidebarSlice.actions.setIdSidebarActive(index));
	// 	}
	// 	dispatch(statusSlice.actions.isSidebarMobile(false));
	// 	localStorage.setItem("idActiveSidebar", JSON.stringify(index));
	// };

	const RenderMenuMain = React.memo(() => (
		<>
			{SIDEBAR_MENU.map((item, idx) => {
				const Icon = item.icon;
				return (
					<li
						key={idx}
						onClick={() => {}}
						className={`flex w-full cursor-pointer items-center px-3 py-1 text-sm font-bold ${
							idx === numActive ? "text-purple-500" : "text-white"
						} ${isOpenSideBar ? "text-[var(--text-primary)]" : ""}`}
					>
						<Button
							variant={idx === numActive ? "primary" : "ghost"}
							className="flex w-full items-center justify-start gap-2"
						>
							<Icon className="h-5 w-5" />
							{isOpenSideBar && item.title}
						</Button>
					</li>
				);
			})}
		</>
	));

	// --- Render UI theo màn hình ---
	const isMobile = windowWidth <= 599;
	const isDesktop = windowWidth >= 1200;

	return (
		<div>
			{isMobile && (
				<motion.div
					initial={{ x: "-100%" }}
					animate={{ x: isSidebarMobile ? 0 : "-100%" }}
					transition={{ duration: 0.3 }}
					className="fixed top-0 right-0 bottom-[90px] left-0 z-[9999] h-[var(--height-mobile-section)] w-full bg-[#231b2e]"
				>
					<div className="relative h-full w-[80%] bg-[#231b2e]">
						<button
							// onClick={() => dispatch(statusSlice.actions.isSidebarMobile(false))}
							className="absolute top-0 right-0 p-3 text-2xl text-black"
						>
							<X />
						</button>
						<div className="flex h-[20vh] items-center bg-[#f7f7f7] px-3">
							<Image
								src={"https://static-zmp3.zmdcdn.me/skins/zmp3-mobile-v5.2/images/logo-mp-3.svg"}
								// src={dataUser.accessToken ? dataUser.data.image : imgError}
								alt="user"
								width={60}
								height={60}
								className="mr-4 rounded-full object-cover"
							/>
							<div>
								{/* {dataUser.accessToken && (
									<h3 className="mb-2 text-sm font-semibold">{dataUser?.data.user_name}</h3>
								)} */}
								<Button
									//  onClick={handleSign}
									className="bg-purple-600 px-3 text-white"
								>
									{/* {dataUser.accessToken ? "Đăng Xuất" : "Đăng Nhập"}  */}
									{false ? "Đăng Xuất" : "Đăng Nhập"}
								</Button>
							</div>
						</div>
						<ul className="flex flex-col">
							<RenderMenuMain />
						</ul>
					</div>
				</motion.div>
			)}

			{isDesktop && (
				<div className="fixed top-0 bottom-[90px] z-[10000] w-[240px] bg-[#231b2e] transition-all">
					<div className="flex h-[70px] items-center justify-center">
						<Link
							href="/"
							className="h-[40px] w-[120px] bg-contain bg-no-repeat"
							style={{
								backgroundImage: `url('https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg')`,
							}}
						/>
					</div>
					<ul className="flex flex-col">
						<RenderMenuMain />
					</ul>
				</div>
			)}
		</div>
	);
}
