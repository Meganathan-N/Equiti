import React from "react";
import styled, { keyframes } from "styled-components";

// Simple spinner animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #555;
  min-height: 60px;
  gap: 10px;
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #555;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 1s linear infinite;
`;

export default function Loader({ text = "Loading..." }) {
  return (
    <LoaderWrapper>
      <Spinner />
      {text}
    </LoaderWrapper>
  );
}
