import Link from "next/link";

import {
  getPopularMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../../lib/tmdb/movies.js";

import Hero from "../../components/Hero.jsx";
import MovieCarousel from "../../components/MovieCarousel.jsx";
import ProjectIntroModal from "../../components/ProjectIntroModal.jsx";


export default async function Home() {
  const [
    popularMovies,
    nowPlayingMovies,
    topRatedMovies,
    upcomingMovies,
  ] = await Promise.all([
    getPopularMovies(),
    getNowPlayingMovies(),
    getTopRatedMovies(),
    getUpcomingMovies(),
  ]);

  return (
    <>
    <ProjectIntroModal/>
    <main className="min-h-screen bg-[#050505] text-white">

      {/* ================= HERO ================= */}

      <section className="relative">
        <Hero TopMovie={popularMovies.results} />
      </section>


      {/* ================= MOVIE SECTIONS ================= */}

      <div className="relative z-10 -mt-12 md:-mt-20">

        {/* Popular Movies */}
        <MovieSection
          title="Popular Movies"
          category="popular"
          movies={popularMovies.results}
        />

        {/* Now Playing */}
        <MovieSection
          title="Now Playing"
          category="now-playing"
          movies={nowPlayingMovies.results}
        />

        {/* Top Rated */}
        <MovieSection
          title="Top Rated"
          category="top-rated"
          movies={topRatedMovies.results}
        />

        {/* Upcoming */}
        <MovieSection
          title="Coming Soon"
          category="upcoming"
          movies={upcomingMovies.results}
        />

      </div>

    </main>
    </>
  );
}


/* =====================================================
   MOVIE SECTION
===================================================== */

function MovieSection({
  title,
  movies,
  category,
}: {
  title: string;
  movies: any[];
  category: string;
}) {
  if (!movies?.length) return null;

  return (
    <section className="mb-10 md:mb-14">

      {/* Section Header */}
      <div className="container mx-auto mb-5 px-4 md:px-8">

        <div className="flex items-center justify-between">

          <h2 className="text-xl font-bold tracking-tight md:text-2xl lg:text-3xl">
            {title}
          </h2>

          <Link
            href={`/movies/${category}`}
            className="group flex items-center gap-1 text-sm font-medium text-zinc-400 transition hover:text-white"
          >
            Explore All

            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>

        </div>

      </div>


      {/* Movie Carousel */}
      <div className="container mx-auto px-4 md:px-8">

        <MovieCarousel movies={movies} />

      </div>

    </section>
  );
}