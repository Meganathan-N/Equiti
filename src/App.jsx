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
  const [loadingId, setLoadingId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

	// Movie Details (fetched when selectedId changes)
	const { data: movieDetails, isLoading: isLoadingDetails } = useMovieDetails(selectedId);

  // Stop showing loader on card once details finish loading
  React.useEffect(() => {
    if (!isLoadingDetails && loadingId !== null) {
      setLoadingId(null);
    }
  }, [isLoadingDetails, loadingId]);

  // Debounce search
  const debouncedQ = useDebounce(q, 400);

  // Build filter params
  const filterParams = useMemo(() => {
    const p = {};
    if (filters.genre) p.with_genres = filters.genre;
    if (filters.year) p.primary_release_year = filters.year;
    if (filters.minVote) p["vote_average.gte"] = filters.minVote;
    return p;
  }, [filters]);

	// Infinite Movies API
	const { data, fetchNextPage, hasNextPage, isLoading, isError, isFetchingNextPage } = useInfiniteMovies({ query: debouncedQ, filters: filterParams });

  // Infinite scroll loader
  function loadMore() {
    if (hasNextPage) fetchNextPage();
  }

  const pages = data?.pages || [];

  return (
    <div>
      <Header value={q} onChange={setQ} />
      <Filters onChange={setFilters} />

			{/* Initial loader */}
			{isLoading && <Loader text={LOADING_INITIAL_DATA} />}

			{/* Show Movie Grid only when details popup is not open */}
			{!isLoading && (
				<MovieGrid
					pages={pages}
					hasMore={!!hasNextPage}
					isFetchingNextPage={isFetchingNextPage}
					loadMore={loadMore}
					loadingId={isLoadingDetails ? loadingId : 0}
					isError={isError}
					onSelect={(movie) => {
						setLoadingId(movie.id); // show loader on this card
						setSelectedId(movie.id); // trigger details fetch
					}}
				/>
			)}

      {/* Movie Details section */}
      {selectedId !== null && (
        <MovieDetails
          movie={movieDetails}
          isLoadingDetails={isLoadingDetails}
          onClose={() => {
            setSelectedId(null);
            setLoadingId(null);
          }}
        />
      )}
    </div>
  );
}
