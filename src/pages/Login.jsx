import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userid: "",
    password: "",
  });

  return (
    <>
      <Header></Header>
      <Wrapper style={{ justifyContent: "center", alignItems: "center" }}>
        <h1>로그인</h1>
        <FormWrap>
          <label>로그인 ID</label>
          <Input
            width="366px"
            height="30px"
            placeholder="ID를 입력하세요."
            autoFocus
            required
            value={user.userid}
            style={{ margin: "5px 0 5px 0" }}
          />

          <label>비밀번호</label>
          <Input
            width="366px"
            height="30px"
            placeholder="비밀번호를 입력하세요."
            type="password"
            required
            value={user.password}
            style={{ margin: "5px 0 0 0" }}
          />
          <ButtonWrap>
            <Button style={{ height: "50px" }}>로그인</Button>
          </ButtonWrap>
        </FormWrap>
        <RedirectSignupWrap>
          <p>저희가 처음이신가요?</p>
          <RedirectLink to="/signup">회원가입</RedirectLink>
        </RedirectSignupWrap>
      </Wrapper>
    </>
  );
}

export default Login;

const FormWrap = styled.form`
  width: fit-content;
  height: fit-content;
  border: 2px solid #ffffff;
  border-radius: 18px;
  box-shadow: 1px 1px 7px 0px black;
  margin: 30px;
  padding: 30px 90px 40px 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`;

const ButtonWrap = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: center;
`;

const RedirectSignupWrap = styled.div`
  display: flex;
  grid-column-gap: 16px;
  justify-content: center;
  align-items: center;
`;

const RedirectLink = styled(Link)`
  color: black;
  text-decoration-line: underline;
`;
