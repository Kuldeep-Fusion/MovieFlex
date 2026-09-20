import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://movie-flex-alpha.vercel.app/"),

  title: {
    default: "MovieFlex - Watch & Discover Movies",
    template: "%s | MovieFlex",
  },

  description:
    "Discover popular movies, trending films, top-rated movies and detailed movie information on MovieFlex.",

  openGraph: {
    title: "MovieFlex - Watch & Discover Movies",
    description:
      "Discover popular movies, trending films and top-rated movies on MovieFlex.",
    url: "https://movie-flex-alpha.vercel.app/",
    siteName: "MovieFlex",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MovieFlex - Discover Movies",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "MovieFlex - Watch & Discover Movies",
    description:
      "Discover popular movies, trending films and top-rated movies on MovieFlex.",
    images: ["/og-image.png"],
  },
};


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Navbar/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}
