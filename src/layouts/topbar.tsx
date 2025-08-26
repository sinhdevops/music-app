"use client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

export function Topbar() {
	const { register, handleSubmit, reset } = useForm<{ q: string }>();
	function onSubmit(data: { q: string }) {
		console.log(data);
		// TODO: route to /search?q=...
		reset();
	}
	return (
		<header className="flex h-16 items-center gap-3 px-4">
			<div className="flex items-center gap-2">
				<Button size="icon" variant="ghost" aria-label="Back">
					<ArrowLeft />
				</Button>
				<Button size="icon" variant="ghost" aria-label="Forward">
					<ArrowRight />
				</Button>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="max-w-xl flex-1">
				<Input placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..." {...register("q")} />
			</form>
			<Button className="ml-auto">
				Nâng cấp tài khoản <Sparkles className="ml-2" />
			</Button>
		</header>
	);
}
