import React, { useState, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import Filters from "./components/Filters";
import MovieGrid from "./components/MovieGrid";
import MovieDetails from "./components/MovieDetails";
import useDebounce from "./hooks/useDebounce";
import { useInfiniteMovies } from "./hooks/useInfiniteMovies";
import { useMovieDetails } from "./hooks/useMovieDetails";
import { LOADING_INITIAL_DATA } from "./utils/constant";
import Loader from "./components/Loader";
const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainApp />
    </QueryClientProvider>
  );
}

function MainApp() {
  const [q, setQ] = useState("");
  const [filters, setFilters] = useState({});
  // const [selected, setSelected] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const { data: movieDetails, isLoading: isLoadingDetails } =
    useMovieDetails(selectedId);

  const debouncedQ = useDebounce(q, 400);
  const filterParams = useMemo(() => {
    const p = {};
    if (filters.genre) p.with_genres = filters.genre;
    if (filters.year) p.primary_release_year = filters.year;
    if (filters.minVote) p["vote_average.gte"] = filters.minVote;
    return p;
  }, [filters]);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    isFetchingNextPage,
  } = useInfiniteMovies({ query: debouncedQ, filters: filterParams });

  function loadMore() {
    if (hasNextPage) fetchNextPage();
  }
  return (
    <div>
      <Header value={q} onChange={setQ} />
      <Filters onChange={setFilters} />
      {isLoading && <Loader text={LOADING_INITIAL_DATA} />}
      {isError && <div>Error while loading movies.</div>}
      {selectedId == null && !isLoading ? (
        <MovieGrid
          pages={data?.pages || []}
          hasMore={!!hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          loadMore={loadMore}
          onSelect={(m) => {
            setSelectedId(m.id);
          }}
        />
      ) : (
        <>
          <MovieDetails
            movie={movieDetails}
            isLoadingDetails={isLoadingDetails}
            onClose={() => setSelectedId(null)}
          />
        </>
      )}
    </div>
  );
}
