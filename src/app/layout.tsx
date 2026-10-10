import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "DIG Campus Carnival 2026 | Create Your Attendance Flyer",
  description: "Create your personalized DIG Campus Carnival attendance flyer. Join Divine Grace Campus on 23rd–24th October 2026 for fellowship, food, and fun.",
  openGraph: {
    title: "DIG Campus Carnival 2026 | Create Your Attendance Flyer",
    description: "Create your personalized DIG Campus Carnival attendance flyer. Join Divine Grace Campus on 23rd–24th October 2026 for fellowship, food, and fun.",
    siteName: "DIG Campus Carnival",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DIG Campus Carnival 2026 | Create Your Attendance Flyer",
    description: "Create your personalized DIG Campus Carnival attendance flyer. Join Divine Grace Campus on 23rd–24th October 2026 for fellowship, food, and fun.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased text-foreground bg-background`}>
        {children}
      </body>
    </html>
  );
}
