let cachedToken: string | null = null;
let tokenExpiry = 0;

export async function getSpotifyToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const now = Date.now();

  // ✅ If we already have a valid token, return it
  if (cachedToken && now < tokenExpiry) {
    return cachedToken;
  }

  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  // 🔑 Otherwise, request a new one
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${authHeader}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Spotify access token");
  }

  const data = await res.json();

  // Save token + expiry (refresh 1 min early)
  cachedToken = data.access_token;
  tokenExpiry = Date.now() + data.expires_in * 1000 - 60_000;

  return cachedToken;
}
