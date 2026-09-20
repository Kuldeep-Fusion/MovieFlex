"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import SearchBar from "./SearchBar.jsx";

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Popular",
    href: "/movies/popular",
  },
  {
    label: "Top Rated",
    href: "/movies/top-rated",
  },
  {
    label: "Upcoming",
    href: "/movies/upcoming",
  },
  {
    label: "Now Playing",
    href: "/movies/now-playing",
  },
];

const Navbar = () => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const lastScrollY = useRef(0);

  /* ==========================================
     SCROLL HANDLER
  ========================================== */

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const previousScrollY = lastScrollY.current;

      setIsScrolled(currentScrollY > 20);

      // Always show navbar near top
      if (currentScrollY < 80) {
        setShowNavbar(true);
      }

      // Scrolling down
      else if (currentScrollY > previousScrollY) {
        setShowNavbar(false);
        setIsOpen(false);
      }

      // Scrolling up
      else {
        setShowNavbar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /* ==========================================
     CLOSE MOBILE MENU ON ROUTE CHANGE
  ========================================== */

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  /* ==========================================
     PREVENT BODY SCROLL
  ========================================== */

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* ==========================================
     ACTIVE ROUTE
  ========================================== */

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <header
      className={`
        fixed
        inset-x-0
        top-0
        z-50

        transition-all
        duration-500
        ease-out

        ${
          showNavbar
            ? "translate-y-0"
            : "-translate-y-full"
        }

        ${
          isScrolled
            ? "border-b border-white/[0.08] bg-[#050505]/90 shadow-2xl shadow-black/20 backdrop-blur-xl"
            : "bg-gradient-to-b from-black/90 via-black/40 to-transparent"
        }
      `}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* ======================================
            MAIN NAVBAR
        ====================================== */}

        <div className="flex h-16 items-center justify-between md:h-[72px]">
          {/* ====================================
              LOGO
          ==================================== */}

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

          {/* ====================================
              DESKTOP NAVIGATION
          ==================================== */}

          <div className="hidden items-center gap-6 md:flex lg:gap-8">
            {navLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    group
                    relative
                    py-2
                    text-sm
                    font-medium
                    transition-colors
                    duration-300

                    ${
                      active
                        ? "text-white"
                        : "text-zinc-400 hover:text-white"
                    }
                  `}
                >
                  {link.label}

                  {/* Active underline */}

                  <span
                    className={`
                      absolute
                      -bottom-0.5
                      left-0
                      h-0.5
                      rounded-full
                      bg-red-600
                      transition-all
                      duration-300

                      ${
                        active
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }
                    `}
                  />
                </Link>
              );
            })}
          </div>

          {/* ====================================
              DESKTOP SEARCH
          ==================================== */}

          <div className="hidden md:block">
            <SearchBar />
          </div>

          {/* ====================================
              MOBILE MENU BUTTON
          ==================================== */}

          <button
            type="button"
            onClick={() =>
              setIsOpen((value) => !value)
            }
            aria-label={
              isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isOpen}
            className="
              relative
              z-50
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/[0.05]
              transition-all
              duration-300
              hover:bg-white/10
              md:hidden
            "
          >
            <span className="relative h-5 w-5">
              {/* Top line */}

              <span
                className={`
                  absolute
                  left-0
                  top-0
                  h-0.5
                  w-5
                  rounded-full
                  bg-white
                  transition-all
                  duration-300

                  ${
                    isOpen
                      ? "top-2 rotate-45"
                      : ""
                  }
                `}
              />

              {/* Middle line */}

              <span
                className={`
                  absolute
                  left-0
                  top-2
                  h-0.5
                  w-5
                  rounded-full
                  bg-white
                  transition-all
                  duration-300

                  ${
                    isOpen
                      ? "opacity-0"
                      : "opacity-100"
                  }
                `}
              />

              {/* Bottom line */}

              <span
                className={`
                  absolute
                  left-0
                  top-4
                  h-0.5
                  w-5
                  rounded-full
                  bg-white
                  transition-all
                  duration-300

                  ${
                    isOpen
                      ? "top-2 -rotate-45"
                      : ""
                  }
                `}
              />
            </span>
          </button>
        </div>

        {/* ======================================
            MOBILE MENU
        ====================================== */}

        <div
          className={`
            overflow-hidden
            transition-all
            duration-500
            md:hidden

            ${
              isOpen
                ? "max-h-[700px] opacity-100"
                : "max-h-0 opacity-0"
            }
          `}
        >
          <div className="border-t border-white/[0.08] pb-6 pt-5">
            {/* Mobile Search */}

            <div className="mb-5">
              <SearchBar mobile />
            </div>

            {/* Mobile Navigation */}

            <div className="space-y-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      flex
                      items-center
                      justify-between
                      rounded-lg
                      px-4
                      py-3.5
                      text-sm
                      font-medium
                      transition-all
                      duration-300

                      ${
                        active
                          ? "bg-white/[0.08] text-white"
                          : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                      }
                    `}
                  >
                    <span>{link.label}</span>

                    {active && (
                      <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Footer Text */}

            <div className="mt-6 border-t border-white/[0.06] pt-5">
              <p className="text-center text-xs text-zinc-600">
                Discover movies. Find your next favorite.
              </p>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;