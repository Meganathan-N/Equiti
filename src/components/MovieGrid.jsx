import React, { useRef, useEffect } from "react";
import MovieCard from "./MovieCard";
import styled from "styled-components";
import Loader from "./Loader";
import { FETCH_MORE_DETAILS } from "../utils/constant";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
  padding: 16px;

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 12px;
    padding: 10px;
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function MovieGrid({
  pages,
  hasMore,
  loadMore,
  onSelect,
  isFetchingNextPage,
  loadingId,
}) {
  const items = pages.flatMap((p) => p.results);

  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  return (
    <>
      {/* No Data Found */}
      {items.length === 0 && !isFetchingNextPage ? (
        <EmptyState>No data found</EmptyState>
      ) : (
        <Grid>
          {items.map((m) => (
            <MovieCard
              key={m.id}
              movie={m}
              onClick={onSelect}
              showLoader={loadingId == m.id}
            />
          ))}
        </Grid>
      )}

      {/* Infinite scroll loader */}
      {isFetchingNextPage ? (
        <Loader text={FETCH_MORE_DETAILS} />
      ) : (
        <div ref={loadMoreRef} style={{ height: "60px" }}></div>
      )}
    </>
  );
}
