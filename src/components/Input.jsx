import styled from "styled-components";

const Input = ({ type, placeholder, value, onChange, name }) => {
  return (
    <StyledInput
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

const StyledInput = styled.input`
  border: 1px solid #333333;
  height: 40px;
  width: 200px;
  outline: none;
  border-radius: 8px;
  padding-left: 12px;
  padding-right: 12px;
  &:focus-within {
    box-shadow: 0 0 0 1px #000;
  }
`;

export default Input;
