import React from "react";
import styled from "styled-components";

const Card = styled.div`
  padding: 10px;
  border-radius: 12px;
  background: #1f1f1f;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.03);
  }

  @media (max-width: 480px) {
    padding: 8px;
    gap: 6px;
  }
`;

const Img = styled.img`
  width: 100%;
  border-radius: 10px;
  aspect-ratio: 2/3;
  object-fit: cover;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 15px;
  margin-top: 4px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const Label = styled.div`
  font-size: 14px;
  opacity: 0.8;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const Button = styled.button`
  margin-top: auto;
  padding: 8px 10px;
  border: none;
  background: #e50914;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;

  &:hover {
    background: #b20710;
  }

  @media (max-width: 480px) {
    padding: 6px 8px;
    font-size: 13px;
  }
`;

const FallbackPoster =
  "https://dummyimage.com/300x450/111/aaa&text=Poster+Not+Available";

export default function MovieCard({ movie, onClick, showLoader }) {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : FallbackPoster;

  const year = movie.release_date?.slice(0, 4) || "N/A";
  let rating = Math.round(movie.vote_average * 10) / 10;

  if (rating == 0) {
    rating = "N/A";
  }

  return (
    <Card>
      <Img src={poster} alt={movie.title} />

      <Title>{movie.title}</Title>

      <Label>Year: {year}</Label>
      <Label>Rating: {rating}</Label>

      <Button disabled={showLoader} onClick={() => onClick(movie)}>
        {showLoader ? "Loading" : "Details"}
      </Button>
    </Card>
  );
}
