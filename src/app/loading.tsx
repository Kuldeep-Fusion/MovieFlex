export default function Loader() {
  return (
    <main className="min-h-screen animate-pulse bg-[#050505] text-white">
      {/* ============================================
          HERO SKELETON
      ============================================ */}

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          {/* Breadcrumb */}

          <div className="mb-8 flex items-center gap-3">
            <div className="h-3 w-16 rounded bg-white/10" />
            <div className="h-3 w-2 rounded bg-white/5" />
            <div className="h-3 w-28 rounded bg-white/10" />
          </div>

          {/* Eyebrow */}

          <div className="mb-5 h-3 w-28 rounded-full bg-red-500/20" />

          {/* Title */}

          <div className="h-12 w-3/4 rounded-lg bg-white/10 sm:h-16 md:h-20 md:w-2/3" />

          {/* Description */}

          <div className="mt-6 space-y-3">
            <div className="h-3 w-full max-w-2xl rounded bg-white/10" />
            <div className="h-3 w-5/6 max-w-xl rounded bg-white/10" />
            <div className="h-3 w-2/3 max-w-lg rounded bg-white/10" />
          </div>

          {/* Stats */}

          <div className="mt-8 flex gap-3">
            <div className="h-9 w-24 rounded-full bg-white/10" />
            <div className="h-9 w-32 rounded-full bg-white/10" />
          </div>
        </div>
      </section>

      {/* ============================================
          MOVIE GRID SKELETON
      ============================================ */}

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        {/* Heading */}

        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="h-6 w-1 rounded-full bg-red-600/40" />

            <div className="h-7 w-40 rounded bg-white/10" />
          </div>

          <div className="mt-3 h-3 w-64 rounded bg-white/5" />
        </div>

        {/* Grid */}

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
          {Array.from({ length: 18 }).map((_, index) => (
            <MovieSkeleton key={index} />
          ))}
        </div>
      </section>
    </main>
  );
}

/* -------------------------------------------------
   Movie Skeleton
------------------------------------------------- */

function MovieSkeleton() {
  return (
    <div className="overflow-hidden rounded-md">
      {/* Poster */}

      <div className="aspect-[2/3] rounded-md bg-white/[0.06]" />

      {/* Content */}

      <div className="mt-3 space-y-2">
        <div className="h-4 w-4/5 rounded bg-white/[0.08]" />

        <div className="h-3 w-2/3 rounded bg-white/[0.05]" />
      </div>
    </div>
  );
}