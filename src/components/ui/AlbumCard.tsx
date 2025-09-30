"use client";

import Image from "next/image";

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

interface AlbumCardProps {
  album: SpotifyAlbum;
}

const AlbumCard = ({ album }: AlbumCardProps) => {
  return (
    <div className="relative w-full h-80 overflow-hidden rounded-xl">
      <Image
        src={album.images?.[2]?.url} // large as fallback
        alt={album.name}
        fill
        sizes="(max-width: 768px) 64px, (max-width: 1200px) 300px, 640px"
        priority
      />
      <div className="absolute bottom-0 left-0 h-full right-0 bg-gradient-to-t from-black to-transparent p-4">
        <h1 className="text-xs top-0 font-bold text text-secondary">
          Latest album
        </h1>
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-white text-lg font-semibold">{album.name}</h2>
          <p className="text-sm text-gray-300 truncate">
            {album.artists.map((artist) => artist.name).join(", ")}
            <span className="mx-1 text-lg text-gray-500">•</span>
            {album.total_tracks} tracks
            <span className="mx-1 text-lg text-gray-500">•</span>
            {new Date(album.release_date).getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
