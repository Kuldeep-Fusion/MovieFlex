
import Link from "next/link";

import {
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import { FiArrowUpRight } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.08] bg-[#050505] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= TOP FOOTER ================= */}
        <div className="grid grid-cols-1 gap-12 py-14 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8 lg:py-16">

          {/* ================= BRAND ================= */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link
              href="/"
              aria-label="MovieFlix Home"
              className="group inline-flex items-center gap-3"
            >
              {/* Logo */}
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-lg font-black text-white shadow-lg shadow-red-600/20 transition-transform duration-300 group-hover:scale-105">
                M
              </div>

              {/* Brand Name */}
              <span className="text-xl font-black tracking-tight text-white">
                MOVIE<span className="text-red-600">FLIX</span>
              </span>
            </Link>

            {/* Description */}
            <p className="mt-5 max-w-md text-sm leading-7 text-zinc-500">
              Discover popular movies, trending titles, top-rated films,
              upcoming releases, and everything you love to watch.
            </p>

            {/* Social Links */}
            <div className="mt-7 flex items-center gap-3">

              {/* Twitter */}
              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-zinc-500 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                <FaTwitter size={16} />
              </a>

              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-zinc-500 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                <FaInstagram size={16} />
              </a>

              {/* YouTube */}
              <a
                href="#"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-zinc-500 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                <FaYoutube size={17} />
              </a>

              {/* GitHub */}
              <a
                href="#"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-zinc-500 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                <FaGithub size={16} />
              </a>
            </div>
          </div>

          {/* ================= EXPLORE ================= */}
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-white">
              Explore
            </h3>

            <ul className="space-y-3.5">

              <li>
                <Link
                  href="/"
                  className="text-sm text-zinc-500 transition-colors duration-300 hover:text-white"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/movies/popular"
                  className="text-sm text-zinc-500 transition-colors duration-300 hover:text-white"
                >
                  Popular Movies
                </Link>
              </li>

              <li>
                <Link
                  href="/movies/top-rated"
                  className="text-sm text-zinc-500 transition-colors duration-300 hover:text-white"
                >
                  Top Rated
                </Link>
              </li>

              <li>
                <Link
                  href="/movies/upcoming"
                  className="text-sm text-zinc-500 transition-colors duration-300 hover:text-white"
                >
                  Upcoming
                </Link>
              </li>

            </ul>
          </div>

          {/* ================= DISCOVER ================= */}
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-white">
              Discover
            </h3>

            <ul className="space-y-3.5">

              <li>
                <Link
                  href="/movies/now-playing"
                  className="text-sm text-zinc-500 transition-colors duration-300 hover:text-white"
                >
                  Now Playing
                </Link>
              </li>

              <li>
                <Link
                  href="/search"
                  className="text-sm text-zinc-500 transition-colors duration-300 hover:text-white"
                >
                  Search Movies
                </Link>
              </li>

              <li>
                <Link
                  href="/movies/popular"
                  className="text-sm text-zinc-500 transition-colors duration-300 hover:text-white"
                >
                  Trending
                </Link>
              </li>

              <li>
                <Link
                  href="/movies/top-rated"
                  className="text-sm text-zinc-500 transition-colors duration-300 hover:text-white"
                >
                  Best Rated
                </Link>
              </li>

            </ul>
          </div>

          {/* ================= INFORMATION ================= */}
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-white">
              Information
            </h3>

            <ul className="space-y-3.5">

              <li>
                <Link
                  href="/about"
                  className="text-sm text-zinc-500 transition-colors duration-300 hover:text-white"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-zinc-500 transition-colors duration-300 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="text-sm text-zinc-500 transition-colors duration-300 hover:text-white"
                >
                  Terms of Service
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-1 text-sm text-zinc-500 transition-colors duration-300 hover:text-white"
                >
                  Contact

                  <FiArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </li>

            </ul>
          </div>
        </div>

        {/* ================= DIVIDER ================= */}
        <div className="h-px bg-white/[0.08]" />

        {/* ================= BOTTOM FOOTER ================= */}
        <div className="flex flex-col gap-4 py-7 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">

          {/* Copyright */}
          <p>
            © {currentYear} MovieFlix. All rights reserved.
          </p>

          {/* TMDB Attribution */}
          <div className="flex flex-wrap items-center gap-2">
            <span>Movie data provided by</span>

            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-400 transition-colors hover:text-white"
            >
              TMDB
            </a>

            <span className="text-zinc-700">•</span>

            <span>
              This product uses the TMDB API but is not endorsed or certified
              by TMDB.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

