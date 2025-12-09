import React, { useRef, useEffect } from "react";
import MovieCard from "./MovieCard";
import styled from "styled-components";
import Loader from "./Loader";
import { FETCH_MORE_DETAILS } from "../utils/constant";

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 16px;
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
            <MovieCard key={m.id} movie={m} onClick={onSelect} />
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
