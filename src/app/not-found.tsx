import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-6 text-white">
      {/* Background */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-[150px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_55%)]" />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]" />
      </div>

      {/* Content */}

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* 404 */}

        <div className="relative">
          <h1 className="select-none text-[120px] font-black leading-none tracking-tighter text-white/[0.04] sm:text-[180px] md:text-[240px]">
            404
          </h1>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-3">
              <span className="h-8 w-1 rounded-full bg-red-600" />

              <span className="text-sm font-bold uppercase tracking-[0.4em] text-red-500">
                MovieFlix
              </span>
            </div>
          </div>
        </div>

        {/* Message */}

        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
          Page Not Found
        </h2>

        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-zinc-500 sm:text-base">
          Looks like this scene was deleted from the final cut.
          The page or movie category you're looking for doesn't
          exist.
        </p>

        {/* Actions */}

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="
              inline-flex
              items-center
              justify-center
              rounded-md
              bg-white
              px-7
              py-3.5
              text-sm
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
            <span className="mr-2">←</span>
            Back to Home
          </Link>

          <Link
            href="/movies/popular"
            className="
              inline-flex
              items-center
              justify-center
              rounded-md
              border
              border-white/10
              bg-white/[0.05]
              px-7
              py-3.5
              text-sm
              font-semibold
              text-white
              backdrop-blur-md
              transition-all
              duration-300
              hover:scale-105
              hover:border-white/20
              hover:bg-white/10
            "
          >
            Explore Movies
          </Link>
        </div>
      </div>
    </main>
  );
}