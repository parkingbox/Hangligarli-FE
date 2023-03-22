import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
@import url('https://fonts.googleapis.com/css2?family=Gamja+Flower&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Single+Day&display=swap');

  body {
    margin: 0;
    font-family: "Arial", sans-serif;
    line-height: 1.5;
  }
`;
export default GlobalStyle;
