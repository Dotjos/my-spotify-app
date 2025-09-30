"use client";
import AlbumCard from "@/components/ui/AlbumCard";
import { useEffect, useState } from "react";

interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

interface SpotifyAlbum {
  id: string;
  name: string;
  images: SpotifyImage[];
  artists: { name: string }[];
  total_tracks: number;
  release_date: string;
}

export default function Home() {
  const [newRelease, setNewRelease] = useState<SpotifyAlbum | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewRelease = async () => {
      try {
        const res = await fetch("/api/spotify/featured");
        const data = await res.json();
        console.log(data);

        if (!res.ok) {
          console.error("API error:", data);
          setError(data.error || "Failed to fetch albums");
          return;
        }

        // ⚠️ make sure the API returns the right structure
        setNewRelease(data);
      } catch (err: any) {
        console.error("Fetch failed:", err);
        setError("Network error");
      }
    };

    fetchNewRelease();
  }, []);

  if (!newRelease) return <p>Loading...</p>;
  return (
    <div className="w-full">
      <AlbumCard album={newRelease} />
    </div>
  );
}
