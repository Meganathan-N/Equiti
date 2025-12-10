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
  width: 950px;
  max-height: 85vh;
  overflow-y: auto;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
  position: relative;

  animation: fadeIn 0.25s ease-in-out;

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

const CloseBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;

  background: #e50914;
  color: white;
  border: none;
  padding: 8px 14px;
  font-size: 14px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #b20710;
  }
`;

const Wrap = styled.div`
  display: flex;
  gap: 28px;
`;

const Poster = styled.img`
  width: 300px;
  height: 450px;
  border-radius: 14px;
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
  background: #333;
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.h2`
  font-size: 32px;
  margin: 0 0 12px 0;
  line-height: 1.2;
`;

const Section = styled.div`
  margin: 22px 0;
`;

const SubTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
  color: #e5e5e5;
`;

const Tag = styled.span`
  background: #333;
  padding: 6px 14px;
  border-radius: 20px;
  margin: 0 8px 8px 0;
  font-size: 13px;
  display: inline-block;
`;

const InfoText = styled.p`
  margin: 4px 0;
  color: #ccc;
`;

const FallbackPoster =
  "https://dummyimage.com/300x450/111/aaa&text=Poster+Not+Available";

const MovieDetails = ({ movie, onClose }) => {
  React.useEffect(() => {
    // Disable scroll
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scroll when popup closes
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!movie) return null;

  const {
    title,
    overview,
    runtime,
    release_date,
    genres,
    spoken_languages,
    poster_path,
    credits,
  } = movie;

  const fullPoster = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : FallbackPoster;

  const director = credits?.crew?.find((c) => c.job === "Director");
  const writer = credits?.crew?.find((c) => c.job === "Writer");

  return (
    <Backdrop onClick={onClose}>
      <Card onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>Close</CloseBtn>

        <Wrap>
          <Poster src={fullPoster} alt={title} />

          <Content>
            <Title>{title}</Title>

            <Section>
              <SubTitle>Overview</SubTitle>
              <InfoText>{overview || "No description available."}</InfoText>
            </Section>

            <Section>
              <SubTitle>Details</SubTitle>
              <InfoText>
                <strong>Release Date:</strong> {release_date || "N/A"}
              </InfoText>
              <InfoText>
                <strong>Runtime:</strong> {runtime} mins
              </InfoText>
              <InfoText>
                <strong>Languages:</strong>{" "}
                {spoken_languages?.length > 0
                  ? spoken_languages?.map((l) => l.english_name).join(", ")
                  : "N/A"}
              </InfoText>
            </Section>

            {genres?.length > 0 && (
              <Section>
                <SubTitle>Genres</SubTitle>
                {genres.map((g) => (
                  <Tag key={g.id}>{g.name}</Tag>
                ))}
              </Section>
            )}

            <Section>
              {director && (
                <InfoText>
                  <strong>Director:</strong> {director.name}
                </InfoText>
              )}
              {writer && (
                <InfoText>
                  <strong>Writer:</strong> {writer.name}
                </InfoText>
              )}
            </Section>
          </Content>
        </Wrap>
      </Card>
    </Backdrop>
  );
};

export default MovieDetails;
