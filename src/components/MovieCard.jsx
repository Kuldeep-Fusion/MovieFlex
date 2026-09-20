import Image from "next/image";
import Link from "next/link";

const MovieCard = ({ movie }) => {
  if (!movie) return null;

  const {
    id,
    title,
    original_language,
    popularity,
    poster_path,
    vote_average,
    vote_count,
  } = movie;

  const rating = vote_average ? vote_average.toFixed(1) : null;
  const isTopRated = vote_average >= 7.5;
  const votes =
    vote_count > 1000 ? `${(vote_count / 1000).toFixed(1)}K` : vote_count;

  return (
    <Link
      href={`/movie/${id}`}
      aria-label={`View ${title}`}
      className="group/card relative block outline-none"
    >
      <article
        className="
          relative aspect-[2/3] w-full overflow-hidden rounded-lg
          bg-zinc-900
          shadow-[0_4px_20px_-8px_rgba(0,0,0,0.8)]
          transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]
          will-change-transform

          /* the lift */
          group-hover/card:-translate-y-2
          group-hover/card:shadow-[0_30px_60px_-20px_rgba(0,0,0,1),0_0_0_1px_rgba(255,255,255,0.08)]

          group-focus-visible/card:ring-2
          group-focus-visible/card:ring-[#E50914]
          group-focus-visible/card:ring-offset-2
          group-focus-visible/card:ring-offset-black
        "
      >
        {/* ─── Poster ─── */}
        {poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title || "Movie poster"}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
            className="
              object-cover
              transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]
              group-hover/card:scale-[1.08]
            "
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950">
            <span className="text-xs font-medium text-zinc-600">
              {title}
            </span>
          </div>
        )}

        {/* ─── Bottom scrim — subtle, always there ─── */}
        <div
          aria-hidden="true"
          className="
            absolute inset-x-0 bottom-0 h-2/5
            bg-gradient-to-t from-black/95 via-black/50 to-transparent
            transition-opacity duration-500
            group-hover/card:opacity-0
          "
        />

        {/* ─── Hover overlay — full info reveal ─── */}
        <div
          aria-hidden="true"
          className="
            absolute inset-0
            bg-gradient-to-t from-black via-black/70 to-black/20
            opacity-0
            transition-opacity duration-500
            group-hover/card:opacity-100
            group-focus-visible/card:opacity-100
          "
        />

        {/* ─── TOP: rating — only if it's good ─── */}
        {rating && isTopRated && (
          <div
            className="
              absolute left-2.5 top-2.5 z-10
              flex items-center gap-1
              rounded-md bg-[#E50914] px-1.5 py-1
              text-[10px] font-black tracking-wide text-white
              shadow-lg shadow-black/50
            "
          >
            <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.9 6.9L22 9.6l-5.4 4.9 1.6 7.1L12 17.8 5.8 21.6l1.6-7.1L2 9.6l7.1-.7L12 2z" />
            </svg>
            {rating}
          </div>
        )}

        {/* ─── CENTER: play button — the hero moment ─── */}
        <div
          className="
            absolute inset-0 z-10
            flex items-center justify-center
            opacity-0
            transition-opacity duration-300
            group-hover/card:opacity-100
            group-focus-visible/card:opacity-100
          "
        >
          <span
            className="
              flex h-12 w-12 items-center justify-center
              rounded-full bg-white
              shadow-[0_8px_30px_rgba(0,0,0,0.7)]
              transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
              scale-90
              group-hover/card:scale-100
            "
          >
            <svg
              className="ml-0.5 h-5 w-5 text-black"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M6 4v16l14-8L6 4z" />
            </svg>
          </span>
        </div>

        {/* ─── BOTTOM: title (always) + meta (reveal) ─── */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-3">
          <h3
            className="
              line-clamp-2
              text-[13.5px] font-semibold leading-tight tracking-[-0.01em]
              text-white
              drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]
            "
          >
            {title}
          </h3>

          {/* Meta — slides up on hover */}
          <div
            className="
              grid grid-rows-[0fr]
              opacity-0
              transition-all duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)]
              group-hover/card:grid-rows-[1fr]
              group-hover/card:opacity-100
              group-hover/card:pt-2
              group-focus-visible/card:grid-rows-[1fr]
              group-focus-visible/card:opacity-100
              group-focus-visible/card:pt-2
            "
          >
            <div className="overflow-hidden">
              <div className="flex items-center gap-2 text-[11px] font-medium text-zinc-400">
                <span className="rounded border border-white/20 px-1 py-px text-[9px] font-bold uppercase tracking-wider text-zinc-300">
                  {original_language}
                </span>

                {rating && (
                  <span className="flex items-center gap-1 text-zinc-300">
                    <span className="text-amber-400">★</span>
                    {rating}
                  </span>
                )}

                <span className="text-zinc-600">·</span>

                <span className="flex items-center gap-1">
                  <svg
                    className="h-3 w-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                  </svg>
                  {votes}
                </span>

                <span className="ml-auto flex items-center gap-0.5 text-zinc-500">
                  <svg
                    className="h-3 w-3 text-[#E50914]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
                  </svg>
                  {popularity?.toFixed(0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Netflix red underline — the signature ─── */}
        <span
          aria-hidden="true"
          className="
            absolute bottom-0 left-0 z-20 h-[2px] w-full
            origin-left scale-x-0
            bg-[#E50914]
            transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]
            group-hover/card:scale-x-100
            group-focus-visible/card:scale-x-100
          "
        />
      </article>
    </Link>
  );
};

export default MovieCard;