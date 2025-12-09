import { useInfiniteQuery } from "@tanstack/react-query";
import { discoverMovies, searchMovies } from "../api/tmdb";

export function useInfiniteMovies({ query, filters }) {
  const key = ["movies", query || "discover", filters];

  return useInfiniteQuery({
    queryKey: key,
    queryFn: async ({ pageParam = 1 }) => {
      if (query?.trim()) {
        return await searchMovies(query, pageParam, filters);
      }
      return await discoverMovies(pageParam, filters);
    },
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,

    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
  });
}
