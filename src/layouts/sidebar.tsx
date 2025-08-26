"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Library, Compass, BarChart3, Radio, Disc3 } from "lucide-react";

const items = [
	{ href: "/", label: "Khám Phá", icon: Compass },
	{ href: "/chart", label: "#zingchart", icon: BarChart3 },
	{ href: "/radio", label: "Radio", icon: Radio },
	{ href: "/library", label: "Thư Viện", icon: Library },
];

export function Sidebar() {
	const pathname = usePathname();
	return (
		<aside className="w-64 shrink-0 space-y-2 p-3">
			<div className="flex items-center gap-2 px-2 py-3">
				<Disc3 className="text-primary size-6" />
				<span className="font-bold">Zing Music</span>
			</div>
			<nav className="space-y-1">
				{items.map(({ href, label, icon: Icon }) => (
					<Link
						key={href}
						href={href}
						className={cn(
							"hover:bg-secondary/70 flex items-center gap-3 rounded-xl px-3 py-2",
							pathname === href && "bg-secondary",
						)}
					>
						<Icon className="size-5" />
						<span>{label}</span>
					</Link>
				))}
			</nav>
		</aside>
	);
}
