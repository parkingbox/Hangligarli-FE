import React from "react";
import styled from "styled-components";

function Button({ children, ...rest }) {
  return <StButton {...rest}>{children}</StButton>;
}

const StButton = styled.button`
  background-color: white;
  border: 1px solid lightgray;
  width: 50px;
  height: 30px;
`;

export default Button;
