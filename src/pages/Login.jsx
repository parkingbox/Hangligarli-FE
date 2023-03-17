import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import Wrapper from "../components/Wrapper";

function Login() {
  const navigator = useNavigate();
  const [user, setUser] = useState({
    userid: "",
    password: "",
  });
  return (
    <Wrapper style={{}}>
      <Link to="/">홈으로 돌아가기</Link>
      <InputForm>
        <h1>로그인</h1>
        <Input placeholder={"아이디를 입력하세요"} />
        <Input placeholder={"비밀번호를 입력하세요"} />
        <ButtonForm>
          <Button style={{ marginRight: "5px" }}>로그인</Button>
          <Button
            style={{ marginLeft: "5px" }}
            onClick={() => navigator("/signup")}
          >
            회원가입
          </Button>
        </ButtonForm>
      </InputForm>
    </Wrapper>
  );
}

export default Login;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
  gap: 10px;
`;
const ButtonForm = styled.div``;
