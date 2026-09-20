"use client";

import { useEffect, useState } from "react";

const lines = [
  {
    type: "command",
    text: "$ project-info --movieflix",
  },
  {
    type: "output",
    text: "Loading project information...",
  },
  {
    type: "blank",
    text: "",
  },
  {
    type: "title",
    text: "MOVIEFLIX",
  },
  {
    type: "output",
    text: "Modern movie discovery platform",
  },
  {
    type: "blank",
    text: "",
  },
  {
    type: "label",
    text: "TECH STACK",
  },
  {
    type: "output",
    text: "→ Next.js",
  },
  {
    type: "output",
    text: "→ React",
  },
  {
    type: "output",
    text: "→ TypeScript",
  },
  {
    type: "output",
    text: "→ Tailwind CSS",
  },
  {
    type: "output",
    text: "→ TMDB API",
  },
  {
    type: "output",
    text: "→ shadcn/ui",
  },
  {
    type: "blank",
    text: "",
  },
  {
    type: "label",
    text: "API",
  },
  {
    type: "output",
    text: "→ TMDB API integration",
  },
  {
    type: "output",
    text: "→ Movie data fetched server-side",
  },
  {
    type: "output",
    text: "→ Parallel API requests",
  },
  {
    type: "blank",
    text: "",
  },
  {
    type: "label",
    text: "ROUTES",
  },
  {
    type: "route",
    text: "→ /",
  },
  {
    type: "route",
    text: "→ /movies/popular",
  },
  {
    type: "route",
    text: "→ /movies/top-rated",
  },
  {
    type: "route",
    text: "→ /movies/upcoming",
  },
  {
    type: "route",
    text: "→ /movies/now-playing",
  },
  {
    type: "route",
    text: "→ /movie/[id]",
  },
  {
    type: "route",
    text: "→ /search?q=...",
  },
  {
    type: "blank",
    text: "",
  },
  {
    type: "label",
    text: "NEXT.JS CONCEPTS",
  },
  {
    type: "output",
    text: "✓ App Router",
  },
  {
    type: "output",
    text: "✓ Server Components",
  },
  {
    type: "output",
    text: "✓ Dynamic Routes",
  },
  {
    type: "output",
    text: "✓ Dynamic Metadata",
  },
  {
    type: "output",
    text: "✓ Server-side Data Fetching",
  },
  {
    type: "output",
    text: "✓ Loading / Error / Not Found UI",
  },
  {
    type: "output",
    text: "✓ Image Optimization",
  },
  {
    type: "blank",
    text: "",
  },
  {
    type: "label",
    text: "FEATURES",
  },
  {
    type: "output",
    text: "✓ Movie Search",
  },
  {
    type: "output",
    text: "✓ Dynamic Category Pages",
  },
  {
    type: "output",
    text: "✓ Movie Detail Pages",
  },
  {
    type: "output",
    text: "✓ Cast & Movie Information",
  },
  {
    type: "output",
    text: "✓ Movie Trailers",
  },
  {
    type: "output",
    text: "✓ Similar Movies",
  },
  {
    type: "output",
    text: "✓ Responsive UI",
  },
  {
    type: "blank",
    text: "",
  },
  {
    type: "success",
    text: "✓ Project initialized successfully.",
  },
  {
    type: "command",
    text: "$ npm run dev",
  },
];

const ProjectTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleLines, setVisibleLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);

  // Open after 12 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Typing animation
  useEffect(() => {
    if (!isOpen) return;

    if (currentLine >= lines.length) return;

    const timer = setTimeout(() => {
      setVisibleLines((prev) => [
        ...prev,
        lines[currentLine],
      ]);

      setCurrentLine((prev) => prev + 1);
    }, 90);

    return () => clearTimeout(timer);
  }, [isOpen, currentLine]);

  // Lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[999]
        flex
        items-center
        justify-center
        bg-black/80
        px-4
        py-6
        backdrop-blur-sm
      "
      onClick={() => setIsOpen(false)}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="
          w-full
          max-w-3xl
          overflow-hidden
          rounded-xl
          border
          border-white/10
          bg-[#0b0b0b]
          shadow-2xl
          shadow-black/70
        "
      >
        {/* Terminal Header */}

        <div
          className="
            flex
            h-11
            items-center
            justify-between
            border-b
            border-white/10
            bg-[#111111]
            px-4
          "
        >
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-yellow-500" />
            <span className="h-3 w-3 rounded-full bg-green-500" />
          </div>

          <span className="font-mono text-[11px] text-zinc-600">
            kuldeep@movieflix ~ terminal
          </span>

          <button
            onClick={() => setIsOpen(false)}
            className="
              font-mono
              text-xs
              text-zinc-600
              transition
              hover:text-white
            "
          >
            [x]
          </button>
        </div>

        {/* Terminal Body */}

        <div
          className="
            max-h-[75vh]
            overflow-y-auto
            px-5
            py-5
            font-mono
            text-xs
            leading-6
            sm:px-7
            sm:text-sm
          "
        >
          {visibleLines.map((line, index) => {
            if (line.type === "blank") {
              return <div key={index} className="h-2" />;
            }

            return (
              <div
                key={index}
                className={getLineClass(line.type)}
              >
                {line.text}
              </div>
            );
          })}

          {/* Cursor */}

          {currentLine < lines.length && (
            <span className="inline-block h-4 w-2 animate-pulse bg-green-400 align-middle" />
          )}

          {/* Finished */}

          {currentLine >= lines.length && (
            <div className="mt-3 flex items-center gap-2 text-green-400">
              <span>visitor@movieflix:~$</span>
              <span className="inline-block h-4 w-2 animate-pulse bg-green-400" />
            </div>
          )}
        </div>

        {/* Footer */}

        <div
          className="
            flex
            items-center
            justify-between
            border-t
            border-white/10
            bg-[#0e0e0e]
            px-5
            py-3
            font-mono
            text-[10px]
            text-zinc-600
            sm:px-7
          "
        >
          <span>
            Next.js • MovieFlix
          </span>

          <button
            onClick={() => setIsOpen(false)}
            className="
              text-zinc-500
              transition
              hover:text-white
            "
          >
            ESC / CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

const getLineClass = (type) => {
  switch (type) {
    case "command":
      return "text-green-400";

    case "title":
      return "text-lg font-bold tracking-wider text-white sm:text-xl";

    case "label":
      return "mt-1 font-bold tracking-widest text-red-400";

    case "route":
      return "text-cyan-400";

    case "success":
      return "font-semibold text-green-400";

    default:
      return "text-zinc-500";
  }
};

export default ProjectTerminal;