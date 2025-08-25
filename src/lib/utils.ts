import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { withFluid } from "@fluid-tailwind/tailwind-merge";

export const twMerge = extendTailwindMerge(withFluid);

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function secondsToMMSS(sec: number) {
	const m = Math.floor(sec / 60)
		.toString()
		.padStart(2, "0");
	const s = Math.floor(sec % 60)
		.toString()
		.padStart(2, "0");
	return `${m}:${s}`;
}