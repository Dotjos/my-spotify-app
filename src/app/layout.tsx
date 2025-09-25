import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Music-Spotify-App",
  description:
    "A Next.js + TypeScript app styled with TailwindCSS that fetches and displays music data from the Spotify Web API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">{children}</body>
    </html>
  );
}
