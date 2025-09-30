import { NextResponse } from "next/server";
import { getSpotifyToken } from "@/lib/spotifyToken";

export async function GET() {
  try {
    const token = await getSpotifyToken();
    // console.log("🎫 Spotify token:", token);

    const res = await fetch("https://api.spotify.com/v1/browse/new-releases", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Spotify API error:", res.status, errorText);
      return NextResponse.json(
        { error: `Spotify API failed: ${res.status}`, details: errorText },
        { status: res.status }
      );
    }

    // ✅ Parse JSON
    const data = await res.json();

    //filter to only albums
    const albumsOnly = data.albums.items.filter(
      (item: any) => item.album_type === "album"
    );

    // Handle case where no albums are found
    if (albumsOnly.length === 0) {
      return NextResponse.json(
        { error: "No albums found in Spotify new releases" },
        { status: 404 }
      );
    }

    // 🔀 Pick a random album
    const randomAlbum =
      albumsOnly[Math.floor(Math.random() * albumsOnly.length)];

    // ✅ Send only what you need
    return NextResponse.json(randomAlbum);
    // const data = await res.json();

    // NextResponse.json(res);
  } catch (err: any) {
    console.error("❌ Internal error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
