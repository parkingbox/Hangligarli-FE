import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import Wrapper from "../components/Wrapper";

function SignUp() {
  const navigator = useNavigate();
  const [user, setUser] = useState({
    userid: "",
    password: "",
    nickname: "",
  });

  return (
    <Wrapper style={{}}>
      <Link to="/">홈으로 돌아가기</Link>
      <InputForm>
        <h1>회원가입</h1>
        <label htmlFor=""> ID:</label>
        <Input placeholder={"아이디를 입력하세요"} value={user.id} />
        <Input placeholder={"닉네임을 입력하세요"} value={user.id} />
        <Input placeholder={"비밀번호"} value={user.password} />
        <Input placeholder={"비밀번호 확인"} value={user.password} />
        <ButtonForm>
          <Button
            style={{ marginRight: "5px" }}
            onClick={() => navigator("/login")}
          >
            이전으로
          </Button>
          <Button style={{ marginLeft: "5px" }}>회원가입</Button>
        </ButtonForm>
      </InputForm>
    </Wrapper>
  );
}

export default SignUp;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
  gap: 10px;
`;
const ButtonForm = styled.div``;
