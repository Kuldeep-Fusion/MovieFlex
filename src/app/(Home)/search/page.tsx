import type { Metadata } from "next";
import Link from "next/link";

import { searchMovies } from "../../../lib/tmdb/movies.js";
import MovieCard from "../../../components/MovieCard.jsx";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

/* ==================================================
   METADATA
================================================== */

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;

  const query = q?.trim();

  if (!query) {
    return {
      title: "Search Movies | MovieFlix",
      description:
        "Search and discover movies on MovieFlix.",
    };
  }

  return {
    title: `"${query}" Search Results | MovieFlix`,
    description: `Discover movies matching "${query}" on MovieFlix.`,
  };
}

/* ==================================================
   SEARCH PAGE
================================================== */

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const { q } = await searchParams;

  const query = q?.trim() || "";

  /* -----------------------------------------------
     No Query
  ------------------------------------------------ */

  if (!query) {
    return <EmptySearch />;
  }

  /* -----------------------------------------------
     Fetch Movies
  ------------------------------------------------ */

  const data = await searchMovies(query);

  const movies = data?.results ?? [];

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* ==========================================
          SEARCH HEADER
      ========================================== */}

      <section className="relative overflow-hidden border-b border-white/10">
        {/* Background */}

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-[350px] w-[350px] rounded-full bg-red-600/10 blur-[140px]" />

          <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-purple-600/5 blur-[130px]" />

          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/60 via-[#050505]/80 to-[#050505]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
          {/* Breadcrumb */}

          <div className="mb-8 flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-zinc-500 transition-colors hover:text-white"
            >
              Home
            </Link>

            <span className="text-zinc-700">
              /
            </span>

            <span className="text-zinc-300">
              Search
            </span>
          </div>

          {/* Eyebrow */}

          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-red-600" />

            <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-500">
              Movie Search
            </span>
          </div>

          {/* Title */}

          <h1 className="max-w-4xl text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
            Search Results
          </h1>

          {/* Query */}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-sm text-zinc-500">
              Results for
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
              "{query}"
            </span>

            <span className="text-sm text-zinc-600">
              •
            </span>

            <span className="text-sm text-zinc-500">
              {movies.length} movies
            </span>
          </div>
        </div>
      </section>

      {/* ==========================================
          SEARCH RESULTS
      ========================================== */}

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        {movies.length > 0 ? (
          <>
            {/* Section Header */}

            <div className="mb-8 flex items-end justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-6 w-1 rounded-full bg-red-600" />

                  <h2 className="text-xl font-bold sm:text-2xl">
                    Movies
                  </h2>
                </div>

                <p className="mt-2 text-sm text-zinc-500">
                  Browse movies matching your search.
                </p>
              </div>

              <span className="hidden text-sm text-zinc-600 sm:block">
                {movies.length} results
              </span>
            </div>

            {/* Movie Grid */}

            <div
              className="
                grid
                grid-cols-2
                gap-x-3
                gap-y-8

                sm:grid-cols-3
                sm:gap-x-4

                md:grid-cols-4

                lg:grid-cols-5

                xl:grid-cols-6
              "
            >
              {movies.map((movie: any) => (
                <div
                  key={movie.id}
                  className="
                    transition-all
                    duration-500
                    hover:-translate-y-1
                  "
                >
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <NoResults query={query} />
        )}
      </section>
    </main>
  );
}

/* ==================================================
   EMPTY SEARCH
================================================== */

function EmptySearch() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-white">
      <div className="max-w-lg text-center">
        {/* Icon */}

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
          <SearchIcon />
        </div>

        {/* Title */}

        <h1 className="mt-7 text-3xl font-black tracking-tight sm:text-4xl">
          Search for a Movie
        </h1>

        {/* Description */}

        <p className="mt-4 text-sm leading-7 text-zinc-500 sm:text-base">
          Search for your favorite movies, discover new
          releases, and find something worth watching.
        </p>

        {/* Action */}

        <Link
          href="/movies/popular"
          className="
            mt-8
            inline-flex
            items-center
            gap-2
            rounded-md
            bg-white
            px-7
            py-3.5
            text-sm
            font-bold
            text-black
            shadow-xl
            shadow-black/20
            transition-all
            duration-300
            hover:scale-105
            hover:bg-zinc-200
          "
        >
          Explore Popular Movies
          <span>→</span>
        </Link>
      </div>
    </main>
  );
}

/* ==================================================
   NO RESULTS
================================================== */

function NoResults({
  query,
}: {
  query: string;
}) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] px-6 text-center">
      {/* Icon */}

      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
        <span className="text-2xl">
          🎬
        </span>
      </div>

      {/* Title */}

      <h2 className="mt-6 text-xl font-bold">
        No Movies Found
      </h2>

      {/* Message */}

      <p className="mt-3 max-w-md text-sm leading-7 text-zinc-500">
        We couldn't find any movies matching{" "}
        <span className="font-medium text-zinc-300">
          "{query}"
        </span>
        .
      </p>

      {/* Suggestions */}

      <div className="mt-5 text-xs text-zinc-600">
        Try using a different keyword.
      </div>

      {/* Action */}

      <Link
        href="/movies/popular"
        className="
          mt-7
          rounded-md
          border
          border-white/10
          bg-white/[0.05]
          px-6
          py-3
          text-sm
          font-semibold
          text-white
          transition-all
          duration-300
          hover:bg-white/10
        "
      >
        Browse Popular Movies
      </Link>
    </div>
  );
}

/* ==================================================
   SEARCH ICON
================================================== */

function SearchIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-zinc-500"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}