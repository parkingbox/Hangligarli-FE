import styled from "styled-components";

const Input = ({ type, placeholder, value, onChange, name, style }) => {
  return (
    <StyledInput
      type={type}
      name={name}
      placeholder={placeholder}
      value={value || ""}
      onChange={onChange}
      style={style}
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
    border: none;
  }
`;

export default Input;
