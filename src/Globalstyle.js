import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: "Helvetica", "Arial", sans-serif;
    line-height: 1.5;
  }
`;
export default GlobalStyle;
