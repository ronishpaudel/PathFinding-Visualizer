import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Path Visualizer | Interactive Pathfinding Algorithm Demonstration",
  description:
    "Explore and visualize various pathfinding algorithms with our interactive tool. Set start and end points, create obstacles, and watch algorithms find the shortest path in real-time.",
  keywords: [
    "pathfinding",
    "algorithms",
    "visualization",
    "interactive",
    "education",
    "computer science",
  ],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Path Visualizer",
    description: "Interactive pathfinding algorithm visualization tool",
    url: "https://your-domain.com",
    siteName: "Path Visualizer",
    images: [
      {
        url: "https://your-domain.com/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Path Visualizer",
    description: "Interactive pathfinding algorithm visualization tool",
    images: ["https://your-domain.com/twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
