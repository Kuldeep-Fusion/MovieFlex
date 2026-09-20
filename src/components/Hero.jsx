"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from 'next/link'

function Hero({ TopMovie }) {
  if (!TopMovie?.length) return null;

  return (
    <Carousel className="w-full"
    opts={{ loop: true, }}
    plugins={[
    Autoplay({ delay: 5000, stopOnInteraction: false, }),
    ]}
    >
      <CarouselContent className="ml-0">

        {TopMovie.map((movie) => {
          const {
            id,
            title,
            original_language,
            overview,
            popularity,
            backdrop_path,
            poster_path,
            vote_average,
            vote_count,
          } = movie;

          const matchPercent = Math.round(vote_average * 10);

          return (
            <CarouselItem
              key={id}
              className="pl-0"
            >
              <section className="relative h-screen w-full overflow-hidden bg-black">

                {/* Background */}
                <div className="absolute inset-0">

                  {/* Mobile Poster */}
                  {poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w780${poster_path}`}
                      alt={title}
                      className="w-full h-full object-cover object-center md:hidden"
                    />
                  )}

                  {/* Desktop Backdrop */}
                  {backdrop_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
                      alt={title}
                      className="hidden md:block w-full h-full object-cover object-center"
                    />
                  )}

                  {/* Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent" />

                  <div className="absolute inset-0 bg-gradient-to-t from-black-/50 via-transparent to-black/10" />

                </div>

                {/* Content */}
                <div className="relative h-full container mx-auto px-4 md:px-8 flex items-center">

                  <div className="max-w-xl space-y-5 pt-20">

                    {/* Badge */}
                    <div className="flex items-center gap-2 text-xs">

                      <span className="bg-red-600 text-white font-semibold px-2 py-0.5 rounded">
                        TRENDING
                      </span>

                      <span className="text-white/70">
                        {Math.round(popularity)} popularity
                      </span>

                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight line-clamp-2">
                      {title}
                    </h1>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-3 text-sm text-white/80">

                      <span
                        className={
                          matchPercent >= 70
                            ? "text-green-400 font-semibold"
                            : "text-yellow-400 font-semibold"
                        }
                      >
                        {matchPercent}% Match
                      </span>

                      <span className="uppercase">
                        {original_language}
                      </span>

                      <span className="border border-white/30 px-1.5 text-xs rounded">
                        U/A 16+
                      </span>

                      <span className="border border-white/30 px-1.5 text-xs rounded">
                        HD
                      </span>

                      <span className="text-white/60">
                        ⭐ {vote_average?.toFixed(1)} (
                        {vote_count?.toLocaleString()}
                        )
                      </span>

                    </div>

                    {/* Description */}
                    <p className="text-white/85 text-sm md:text-base leading-relaxed line-clamp-3">
                      {overview || "No description available."}
                    </p>

                    {/* Buttons */}
                    <div className="flex items-center gap-3 pt-2">

                      <button className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-2.5 rounded-md hover:bg-white/85 transition-colors">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                          <Link
      href={`/movie/${id}`}
      aria-label={`View ${title}`}
      className="group/card relative block outline-none"
    >
                        Play
                        </Link>
                      </button>

                      <button className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white font-semibold px-6 py-2.5 rounded-md hover:bg-white/30 transition-colors">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        <Link
      href={`/movie/${id}`}
      aria-label={`View ${title}`}
      className="group/card relative block outline-none"
    >
                        More Info
</Link>
                      </button>

                    </div>

                  </div>

                </div>

                {/* Bottom Fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />

              </section>

            </CarouselItem>
          );
        })}

      </CarouselContent>

      {/* Previous */}
      <CarouselPrevious className="left-4 text-black" />

      {/* Next */}
      <CarouselNext className="right-4 text-black" />

    </Carousel>
  );
}

export default Hero;