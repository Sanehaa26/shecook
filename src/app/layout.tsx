import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SheCookProvider } from "@/context/SheCookContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DemoBanner } from "@/components/layout/DemoBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SheCook | Her Passion. Her Kitchen. Her Business.",
  description:
    "A home-cooked food marketplace empowering women to build thriving culinary businesses from their home kitchens.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF7F2] text-[#24201E]">
        <SheCookProvider>
          <DemoBanner />
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </SheCookProvider>
      </body>
    </html>
  );
}
