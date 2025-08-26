import { NextResponse } from "next/server";
import { ZingMp3 } from "zingmp3-api-full";

export async function GET() {
	const data = await ZingMp3.getTop100();
	return NextResponse.json(data);
}
