import axios from "axios";
const API_KEY = "b5f2064412eb9f6aead2cb4f127f5b16";
const READ_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNWYyMDY0NDEyZWI5ZjZhZWFkMmNiNGYxMjdmNWIxNiIsIm5iZiI6MTc2NTAxNjE2Ni4wMzIsInN1YiI6IjY5MzQwMjY2MGE2NjFkNjNkNmI3MGRiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WJIvF2pI45Pr_KeVmP30y5BJsKafjJrOY1JW2jMjXGc";
const BASE = "https://api.themoviedb.org/3";
const client = axios.create({
  baseURL: BASE,
  headers: READ_TOKEN ? { Authorization: `Bearer ${READ_TOKEN}` } : undefined,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});
export async function searchMovies(query, page = 1, filters = {}) {
  const params = { query, page, include_adult: false, ...filters };
  const res = await client.get("/search/movie", { params });
  return res.data;
}
export async function discoverMovies(page = 1, filters = {}) {
  const params = { page, sort_by: "popularity.desc", ...filters };
  const res = await client.get("/discover/movie", { params });
  return res.data;
}
export async function getMovieDetails(movieId) {
  const res = await client.get(`/movie/${movieId}`, {
    params: {
      append_to_response: "credits,similar",
    },
  });
  return res.data;
}
export async function getGenres() {
  const res = await client.get("/genre/movie/list");
  return res.data.genres;
}
