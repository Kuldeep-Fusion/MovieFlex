const BASE_URL = process.env.TMDB_BASE_URL;
const API_KEY = process.env.TMDB_API_KEY;

export default async function TmdbFetch(endpoint, options = {}) {
    if (!BASE_URL) {
        throw new Error("TMDB_BASE_URL is missing");
    }

    if (!API_KEY) {
        throw new Error("TMDB_API_KEY is missing");
    }

    try {
        const url = new URL(`${BASE_URL}${endpoint}`);

        url.searchParams.set("api_key", API_KEY);

        const response = await fetch(url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
        });

        if (!response.ok) {
            throw new Error(
                `TMDB API Error: ${response.status}`
            );
        }

        return response.json();

    } catch (error) {
        console.error("TMDB Error:", error);
        throw error;
    }
}