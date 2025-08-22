import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "./providers";
const inter = Inter({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learning Management System",
  description: "this is Learning Management system platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased `}
        cz-shortcut-listen="true"
      >
        <Toaster />
      <Providers>{children}</Providers> 
      </body>
    </html>
  );
}
