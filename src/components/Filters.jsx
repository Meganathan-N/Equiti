import React, { useEffect, useState } from "react";
import { getGenres } from "../api/tmdb";
import styled from "styled-components";

const Box = styled.div`
  padding: 12px;
  border-bottom: 1px solid #eee;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export default function Filters({ onChange }) {
  const [genres, setGenres] = useState([]);
  const [selected, setSelected] = useState({
    genre: "",
    year: "",
    minVote: "",
  });
  useEffect(() => {
    getGenres()
      .then(setGenres)
      .catch(() => setGenres([]));
  }, []);
  function update(k, v) {
    const next = { ...selected, [k]: v };
    setSelected(next);
    onChange(next);
  }
  return (
    <Box>
      <select
        value={selected.genre}
        onChange={(e) => update("genre", e.target.value)}
      >
        <option value="">All genres</option>
        {genres.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>
      <input
        placeholder="Year"
        value={selected.year}
        onChange={(e) => update("year", e.target.value)}
      />
      <input
        placeholder="Min rating (0-10)"
        value={selected.minVote}
        onChange={(e) => update("minVote", e.target.value)}
      />
    </Box>
  );
}
