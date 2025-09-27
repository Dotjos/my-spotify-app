import { NextResponse } from "next/server";
import { getSpotifyToken } from "@/lib/spotifyToken";

export async function GET() {
  try {
    const token = await getSpotifyToken();
    return NextResponse.json({ access_token: token });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
