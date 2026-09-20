"use client";

import { useEffect } from "react";
import Link from "next/link";

type ErrorProps = {
  error: Error & {
    digest?: string;
  };

  reset: () => void;
};

export default function Error({
  error,
  reset,
}: ErrorProps) {
  useEffect(() => {
    // Production me yaha Sentry / LogRocket
    // / monitoring service ko error send kar sakte ho.

    console.error(error);
  }, [error]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-6 text-white">
      {/* Background */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-[150px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_55%)]" />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]" />
      </div>

      {/* Content */}

      <div className="relative z-10 mx-auto max-w-xl text-center">
        {/* Error Icon */}

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10 shadow-2xl shadow-red-950/20">
          <span className="text-3xl">!</span>
        </div>

        {/* Eyebrow */}

        <div className="mt-7 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-red-600" />

          <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-500">
            MovieFlix
          </span>

          <span className="h-px w-8 bg-red-600" />
        </div>

        {/* Title */}

        <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
          Something Went Wrong
        </h1>

        {/* Description */}

        <p className="mt-5 text-sm leading-7 text-zinc-500 sm:text-base">
          We couldn't load this page right now. Something went
          wrong while fetching the movie data.
        </p>

        {/* Actions */}

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={() => reset()}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
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
            <span>↻</span>
            Try Again
          </button>

          <Link
            href="/"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
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
            <span>←</span>
            Back Home
          </Link>
        </div>

        {/* Small technical message */}

        <p className="mt-8 text-xs text-zinc-700">
          If the problem continues, please try again later.
        </p>
      </div>
    </main>
  );
}