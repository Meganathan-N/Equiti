import React from "react";
import styled from "styled-components";

const H = styled.header`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: #0b0f1a;
  color: white;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  margin: 0;

  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const Input = styled.input`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #333;
  min-width: 260px;
  flex: 1;
  margin-right: 12px;
  @media (max-width: 600px) {
    width: 90%;
    min-width: 0;
  }
`;

export default function Header({
  value,
  onChange,
  placeholder = "Search movies...",
}) {
  return (
    <H>
      <Title>Movie Explorer</Title>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </H>
  );
}
