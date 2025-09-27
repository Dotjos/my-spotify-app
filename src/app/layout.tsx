import "./globals.css";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
});

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
    <html lang="en" className={quicksand.className}>
      <body className="bg-dark px-3 py-5">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
