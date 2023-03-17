import React from "react";
import styled from "styled-components";

function Button({ children, ...rest }) {
  return <StButton {...rest}>{children}</StButton>;
}

const StButton = styled.button`
  background-color: white;
  border: 1px solid lightgray;
  width: 100px;
  height: 30px;
  cursor: pointer;
  border-radius: 5px;
`;

export default Button;
