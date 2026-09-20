import Link from "next/link";

import {
  getMovieById,
  getMovieCredits,
  getMovieVideos,
  getSimilarMovies,
} from "../../../../lib/tmdb/movies.js";

import MovieCard from "../../../../components/MovieCard.jsx";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MovieDetailsPage({ params }: Props) {
  const { id } = await params;

  const [movie, credits, videos, similar] = await Promise.all([
    getMovieById(id),
    getMovieCredits(id),
    getMovieVideos(id),
    getSimilarMovies(id),
  ]);

  if (!movie) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        <div className="text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-red-500">
            Error
          </p>

          <h1 className="text-3xl font-bold">
            Movie not found
          </h1>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-md bg-white px-6 py-3 font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-zinc-200"
          >
            Back Home
          </Link>
        </div>
      </main>
    );
  }

  const trailer = videos?.results?.find(
    (video: any) =>
      video.site === "YouTube" &&
      video.type === "Trailer"
  );

  const cast = credits?.cast?.slice(0, 8) || [];

  const similarMovies = similar?.results?.slice(0, 12) || [];

  const matchPercent = Math.round(
    (movie.vote_average || 0) * 10
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="group relative min-h-[720px] overflow-hidden md:min-h-[850px]">

        {/* Background */}
        <div className="absolute inset-0">

          {movie.backdrop_path && (
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt=""
              className="
                h-full
                w-full
                object-cover
                object-center
                scale-105
                opacity-70
                transition-transform
                duration-[2000ms]
                ease-out
                group-hover:scale-110
              "
            />
          )}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/10" />

          {/* Left cinematic gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent" />

          {/* Bottom cinematic gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />

          {/* Top gradient */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/20 to-transparent" />

        </div>


        {/* Hero Content */}
        <div className="relative z-10 container mx-auto flex min-h-[720px] items-end px-4 pb-20 md:min-h-[850px] md:px-8 md:pb-28">

          <div className="grid w-full items-end gap-10 md:grid-cols-[320px_1fr] lg:grid-cols-[380px_1fr]">

            {/* =================================================
                POSTER
            ================================================= */}

            <div className="hidden md:block">

              {movie.poster_path && (
                <div className="group/poster relative overflow-hidden rounded-xl shadow-2xl shadow-black/70">

                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="
                      aspect-[2/3]
                      w-full
                      h-full
                      object-cover
                      transition-all
                      duration-700
                      group-hover/poster:scale-105
                    "
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover/poster:opacity-100" />

                </div>
              )}

            </div>


            {/* =================================================
                DETAILS
            ================================================= */}

            <div className="max-w-4xl">

              {/* Breadcrumb */}
              <div className="mb-5 flex items-center gap-2 text-xs text-zinc-500">

                <Link
                  href="/"
                  className="transition-colors hover:text-white"
                >
                  Home
                </Link>

                <span>/</span>

                <span className="truncate text-zinc-400">
                  {movie.title}
                </span>

              </div>


              {/* Badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-red-400 backdrop-blur-md">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />

                Movie
              </div>


              {/* Title */}
              <h1 className="max-w-4xl text-2xl font-black leading-[0.95] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-6xl">

                {movie.title}

              </h1>


              {/* Tagline */}
              {movie.tagline && (
                <p className="mt-5 max-w-2xl text-lg italic text-zinc-400 md:text-xl">
                  "{movie.tagline}"
                </p>
              )}


              {/* Meta */}
              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">

                <span className="font-bold text-green-400">
                  {matchPercent}% Match
                </span>

                <span className="text-zinc-300">
                  {movie.release_date?.slice(0, 4)}
                </span>

                {movie.runtime && (
                  <span className="text-zinc-300">
                    {movie.runtime} min
                  </span>
                )}

                <span className="rounded border border-white/30 px-2 py-0.5 text-xs">
                  HD
                </span>

                <span className="text-zinc-300">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </span>

              </div>


              {/* Genres */}
              <div className="mt-5 flex flex-wrap gap-2">

                {movie.genres?.map((genre: any) => (
                  <span
                    key={genre.id}
                    className="
                      rounded-full
                      border
                      border-white/10
                      bg-white/5
                      px-3
                      py-1.5
                      text-xs
                      text-zinc-300
                      backdrop-blur-sm
                      transition-all
                      duration-300
                      hover:border-white/20
                      hover:bg-white/10
                      hover:text-white
                    "
                  >
                    {genre.name}
                  </span>
                ))}

              </div>


              {/* Overview */}
              <p className="mt-7 max-w-3xl text-sm leading-7 text-zinc-300 md:text-base md:leading-8">
                {movie.overview || "No description available."}
              </p>


              {/* Actions */}
              <div className="mt-8 flex flex-wrap gap-3">

                {trailer && (
                  <a
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      group/play
                      inline-flex
                      items-center
                      gap-3
                      rounded-md
                      bg-white
                      px-7
                      py-3.5
                      font-bold
                      text-black
                      shadow-xl
                      shadow-black/30
                      transition-all
                      duration-300
                      hover:scale-105
                      hover:bg-zinc-200
                    "
                  >
                    <span className="transition-transform duration-300 group-hover/play:scale-125">
                      ▶
                    </span>

                    Play Trailer
                  </a>
                )}

                <button
                  className="
                    inline-flex
                    items-center
                    gap-3
                    rounded-md
                    border
                    border-white/10
                    bg-white/10
                    px-7
                    py-3.5
                    font-bold
                    text-white
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:bg-white/20
                  "
                >
                  <span className="text-lg">
                    +
                  </span>

                  My List
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          QUICK INFO
      ===================================================== */}

<section className="container mx-auto px-4 md:px-8 md:py-14">
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
    
    {/* Release Date */}

    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.16] hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-black/20 sm:p-5">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.05] text-zinc-400 transition-all duration-300 group-hover:bg-white/[0.08] group-hover:text-white">
        📅
      </div>

      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 sm:text-xs">
        Release Date
      </p>

      <p className="mt-2 truncate text-base font-bold text-white sm:text-lg">
        {movie.release_date
          ? new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }).format(new Date(movie.release_date))
          : "Not available"}
      </p>
    </div>

    {/* Runtime */}

    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.16] hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-black/20 sm:p-5">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.05] text-zinc-400 transition-all duration-300 group-hover:bg-white/[0.08] group-hover:text-white">
        ◷
      </div>

      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 sm:text-xs">
        Runtime
      </p>

      <p className="mt-2 truncate text-base font-bold text-white sm:text-lg">
        {movie.runtime
          ? `${Math.floor(movie.runtime / 60)}h ${
              movie.runtime % 60
            }m`
          : "Not available"}
      </p>
    </div>

    {/* Rating */}

    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.16] hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-black/20 sm:p-5">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.05] text-yellow-400 transition-all duration-300 group-hover:bg-yellow-400/10">
        ★
      </div>

      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 sm:text-xs">
        Rating
      </p>

      <p className="mt-2 truncate text-base font-bold text-green-400 sm:text-lg">
        {movie.vote_average
          ? `${movie.vote_average.toFixed(1)} / 10`
          : "Not rated"}
      </p>
    </div>

    {/* Popularity */}

    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.16] hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-black/20 sm:p-5">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.05] text-zinc-400 transition-all duration-300 group-hover:bg-white/[0.08] group-hover:text-white">
        ↗
      </div>

      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 sm:text-xs">
        Popularity
      </p>

      <p className="mt-2 truncate text-base font-bold text-white sm:text-lg">
        {movie.popularity
          ? movie.popularity.toFixed(0)
          : "N/A"}
      </p>
    </div>

  </div>
</section>


      {/* =====================================================
          CAST
      ===================================================== */}

      {cast.length > 0 && (
        <section className="container mx-auto px-4 py-10 md:px-8">

          <SectionTitle
            title="Cast"
            subtitle="Meet the people behind the movie"
          />

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">

            {cast.map((person: any) => (
              <div
                key={person.id}
                className="group/cast cursor-pointer"
              >

                <div className="
                  relative
                  aspect-[2/3]
                  overflow-hidden
                  rounded-xl
                  bg-zinc-900
                  ring-1
                  ring-white/5
                  transition-all
                  duration-500
                  group-hover/cast:-translate-y-2
                  group-hover/cast:ring-white/20
                ">

                  {person.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                      alt={person.name}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover/cast:scale-110
                      "
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-zinc-600">
                      No Image
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/cast:opacity-100" />

                </div>

                <h3 className="mt-3 truncate text-sm font-semibold">
                  {person.name}
                </h3>

                <p className="mt-1 truncate text-xs text-zinc-500">
                  {person.character}
                </p>

              </div>
            ))}

          </div>

        </section>
      )}


      {/* =====================================================
          TRAILER
      ===================================================== */}

      {trailer && (
        <section className="container mx-auto px-4 py-12 md:px-8">

          <SectionTitle
            title="Trailer"
            subtitle="Watch the official trailer"
          />

          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl">

            <div className="aspect-video">
              
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={`${movie.title} Trailer`}
                className="h-full w-full "
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

            </div>

          </div>

        </section>
      )}


      {/* =====================================================
          SIMILAR MOVIES
      ===================================================== */}

      {similarMovies.length > 0 && (
        <section className="container mx-auto px-4 py-12 md:px-8">

          <SectionTitle
            title="You May Also Like"
            subtitle="More movies you might enjoy"
          />

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">

            {similarMovies.map((movie: any) => (
              <div
                key={movie.id}
                className="
                  transition-all
                  duration-500
                  hover:-translate-y-2
                "
              >
                <MovieCard movie={movie} />
              </div>
            ))}

          </div>

        </section>
      )}


      {/* Bottom spacing */}
      <div className="h-20" />

    </main>
  );
}


/* =====================================================
   INFO CARD
===================================================== */

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div
      className="
        group
        rounded-xl
        border
        border-white/10
        bg-white/[0.03]
        p-5
        backdrop-blur-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-white/20
        hover:bg-white/[0.06]
      "
    >

      <p className="text-xs uppercase tracking-wider text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-lg font-bold text-white transition-colors duration-300 group-hover:text-red-400">
        {value}
      </p>

    </div>
  );
}


/* =====================================================
   SECTION TITLE
===================================================== */

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-7">

      <div className="flex items-center gap-3">

        <div className="h-7 w-1 rounded-full bg-red-600" />

        <h2 className="text-2xl font-bold md:text-3xl">
          {title}
        </h2>

      </div>

      {subtitle && (
        <p className="mt-2 ml-4 text-sm text-zinc-500">
          {subtitle}
        </p>
      )}

    </div>
  );
}