
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = ({ mobile = false }) => {
  const router = useRouter();

  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const value = query.trim();

    if (!value) return;

    router.push(
      `/search?q=${encodeURIComponent(value)}`
    );

    setQuery("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        flex
        items-center
        gap-2.5
        border
        border-white/10
        bg-white/[0.06]
        px-4
        py-2.5
        transition-all
        duration-300

        ${
          mobile
            ? `
              w-full
              rounded-xl
              py-3
            `
            : `
              w-52
              rounded-full
              focus-within:w-72
            `
        }

        focus-within:border-white/20
        focus-within:bg-white/[0.09]
      `}
    >
      {/* Search Icon */}

      <SearchIcon />

      {/* Input */}

      <input
        type="search"
        value={query}
        onChange={(event) =>
          setQuery(event.target.value)
        }
        placeholder="Search movies..."
        aria-label="Search movies"
        className="
          w-full
          bg-transparent
          text-sm
          text-white
          outline-none
          placeholder:text-zinc-500
        "
      />

      {/* Desktop Shortcut */}

      {!mobile && (
        <kbd
          className="
            hidden
            rounded
            border
            border-white/10
            px-1.5
            py-0.5
            text-[10px]
            text-zinc-600
            lg:block
          "
        >
          /
        </kbd>
      )}
    </form>
  );
};

/* ================================================
   SEARCH ICON
================================================ */

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-zinc-500"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />

      <path d="m20 20-4-4" />
    </svg>
  );
}

export default SearchBar;

