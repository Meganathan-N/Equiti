import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../api/tmdb";

export function useMovieDetails(id) {
  return useQuery({
    queryKey: ["movie-details", id],
    queryFn: () => getMovieDetails(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 min cache
    retry: 1,
  });
}
