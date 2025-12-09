import React from "react";
import styled from "styled-components";

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 60px;
  z-index: 9999;
`;

const Card = styled.div`
  background: #1b1b1b;
  color: #fff;
  width: 900px;
  max-height: 85vh;
  overflow-y: auto;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
  animation: fadeIn 0.2s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Wrap = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
`;

const Poster = styled.img`
  width: 280px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
`;

const CloseBtn = styled.button`
  background: #e50914;
  color: white;
  border: none;
  padding: 8px 14px;
  font-size: 14px;
  border-radius: 8px;
  cursor: pointer;
  float: right;

  &:hover {
    background: #b20710;
  }
`;

const Title = styled.h2`
  font-size: 28px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;

  small {
    opacity: 0.7;
    font-size: 18px;
  }
`;

const Section = styled.div`
  margin: 16px 0;
  line-height: 1.6;
  font-size: 16px;
`;

const SimilarRow = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 10px;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 4px;
  }
`;

const SimilarCard = styled.div`
  min-width: 140px;
  text-align: center;

  img {
    width: 120px;
    border-radius: 8px;
    margin-bottom: 6px;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.3);
  }

  div {
    font-size: 14px;
    opacity: 0.85;
  }
`;

export default function MovieDetails({ movie, onClose }) {
  if (!movie) return null;

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.png";

  return (
    <Backdrop>
      <Card>
        <CloseBtn onClick={onClose}>Close</CloseBtn>

        <Wrap>
          <Poster src={poster} alt={movie.title} />

          <div style={{ flex: 1 }}>
            <Title>
              {movie.title}
              <small>({movie.release_date?.slice(0, 4)})</small>
            </Title>

            <Section>{movie.overview}</Section>

            <Section>
              <strong>Genres:</strong>{" "}
              {movie.genres?.map((g) => g.name).join(", ")}
            </Section>

            <Section>
              <strong>Rating:</strong> ⭐ {movie.vote_average}
            </Section>

            <h3 style={{ marginTop: 24 }}>Similar Movies</h3>
            <SimilarRow>
              {movie.similar?.results?.map((s) => (
                <SimilarCard key={s.id}>
                  <img
                    src={
                      s.poster_path
                        ? `https://image.tmdb.org/t/p/w154${s.poster_path}`
                        : "/placeholder.png"
                    }
                    alt={s.title}
                  />
                  <div>{s.title}</div>
                </SimilarCard>
              ))}
            </SimilarRow>
          </div>
        </Wrap>
      </Card>
    </Backdrop>
  );
}
