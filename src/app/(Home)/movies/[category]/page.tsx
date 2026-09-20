import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../../../../lib/tmdb/movies.js";

import MovieCard from "../../../../components/MovieCard.jsx";

type Category = "popular" | "top-rated" | "upcoming" | "now-playing";

type CategoryConfig = {
  title: string;
  description: string;
  eyebrow: string;
  fetchMovies: () => Promise<any>;
};

const categoryConfig: Record<Category, CategoryConfig> = {
  popular: {
    title: "Popular Movies",
    eyebrow: "Trending Now",
    description:
      "Discover the movies everyone is watching right now. Explore popular titles, trending stories, and audience favorites.",
    fetchMovies: getPopularMovies,
  },

  "top-rated": {
    title: "Top Rated Movies",
    eyebrow: "Highest Rated",
    description:
      "Explore highly rated movies loved by audiences around the world.",
    fetchMovies: getTopRatedMovies,
  },

  upcoming: {
    title: "Upcoming Movies",
    eyebrow: "Coming Soon",
    description:
      "Stay ahead of the curve and discover movies that are coming to theaters soon.",
    fetchMovies: getUpcomingMovies,
  },

  "now-playing": {
    title: "Now Playing",
    eyebrow: "In Theaters",
    description:
      "Explore movies currently playing in theaters and discover what to watch next.",
    fetchMovies: getNowPlayingMovies,
  },
};

type PageProps = {
  params: Promise<{
    category: string;
  }>;
};

/* -------------------------------------------------
   Metadata
------------------------------------------------- */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await params;

  const config =
    categoryConfig[category as Category];

  if (!config) {
    return {
      title: "Category Not Found | MovieFlix",
      description: "The requested movie category could not be found.",
    };
  }

  return {
    title: `${config.title} | MovieFlix`,
    description: config.description,

    openGraph: {
      title: `${config.title} | MovieFlix`,
      description: config.description,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: `${config.title} | MovieFlix`,
      description: config.description,
    },
  };
}

/* -------------------------------------------------
   Page
------------------------------------------------- */

export default async function CategoryPage({
  params,
}: PageProps) {
  const { category } = await params;

  const config =
    categoryConfig[category as Category];

  // Invalid category → Next.js 404 page
  if (!config) {
    notFound();
  }

  const data = await config.fetchMovies();

  const movies = data?.results ?? [];

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      
      {/* ============================================
          HERO / PAGE HEADER
      ============================================ */}

      <section className="relative overflow-hidden border-b border-white/10">
        {/* Background decoration */}

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-red-600/10 blur-[120px]" />

          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-purple-600/5 blur-[140px]" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_45%)]" />

          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/70 via-[#050505]/80 to-[#050505]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          {/* Breadcrumb */}

          <div className="mb-8 flex items-center gap-2 text-sm text-zinc-500">
            <span className="transition-colors hover:text-zinc-300">
              Movies
            </span>

            <span>/</span>

            <span className="text-zinc-300">
              {config.title}
            </span>
          </div>

          {/* Eyebrow */}

          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-red-600" />

            <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">
              {config.eyebrow}
            </span>
          </div>

          {/* Title */}

          <h1 className="max-w-4xl text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {config.title}
          </h1>

          {/* Description */}

          <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
            {config.description}
          </p>

          {/* Stats */}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-300 backdrop-blur-md">
              <span className="font-semibold text-white">
                {movies.length}
              </span>{" "}
              Movies
            </div>

            <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-400 backdrop-blur-md">
              Updated regularly
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          MOVIE GRID
      ============================================ */}

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        {/* Section heading */}

        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-6 w-1 rounded-full bg-red-600" />

              <h2 className="text-xl font-bold sm:text-2xl">
                Browse Movies
              </h2>
            </div>

            <p className="mt-2 text-sm text-zinc-500">
              Find something you would like to watch.
            </p>
          </div>

          <span className="hidden text-sm text-zinc-500 sm:block">
            {movies.length} results
          </span>
        </div>

        {/* Empty state */}

        {movies.length === 0 ? (
          <EmptyState />
        ) : (
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
                  group
                  transition-all
                  duration-500
                  ease-out
                  hover:-translate-y-1
                "
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

/* -------------------------------------------------
   Empty State
------------------------------------------------- */

function EmptyState() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] px-6 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
        <span className="text-2xl">🎬</span>
      </div>

      <h3 className="text-xl font-bold">
        No Movies Found
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">
        We couldn't find any movies in this category right now.
        Please check again later.
      </p>
    </div>
  );
}