import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Virtual Office | Nick's AI Agent Organization",
  description: "A visual dashboard showing AI agents working together as a team",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="pb-16 min-h-screen">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
