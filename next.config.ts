import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "standalone",
	images: {
		domains: ["photo-resize-zmp3.zmdcdn.me"],
	},
};

export default nextConfig;
