import TmdbFetch from "./client.js";

export async function getPopularMovies() {
  return TmdbFetch("/movie/popular", {
    next: {
      revalidate: 3600,
    },
  });
}

export async function getNowPlayingMovies() {
  return TmdbFetch("/movie/now_playing");
}

export async function getTopRatedMovies() {
  return TmdbFetch("/movie/top_rated");
}

export async function getUpcomingMovies() {
  return TmdbFetch("/movie/upcoming");
}

export async function getMovieById(id) {
  return TmdbFetch(`/movie/${id}`);
}

export async function searchMovies(query) {
  return TmdbFetch(
    `/search/movie?query=${encodeURIComponent(query)}`
  );
}

export async function getMovieCredits(id) {
  return TmdbFetch(`/movie/${id}/credits`);
}

export async function getSimilarMovies(id) {
  return TmdbFetch(`/movie/${id}/similar`);
}

export async function getRecommendations(id) {
  return TmdbFetch(`/movie/${id}/recommendations`);
}

export async function getMovieVideos(id) {
  return TmdbFetch(`/movie/${id}/videos`);
}