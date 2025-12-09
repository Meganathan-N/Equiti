import React from "react";
import styled from "styled-components";
const H = styled.header`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: #0b0f1a;
  color: white;
`;
const Input = styled.input`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #333;
  min-width: 260px;
`;
export default function Header({
  value,
  onChange,
  placeholder = "Search movies...",
}) {
  return (
    <H>
      <h2>Movie Explorer</h2>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </H>
  );
}
