import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import api from "../api/api";

function SignUp() {
  const navigate = useNavigate();
  const [users, setUsers] = useState({
    username: "",
    nickname: "",
    password: "",
    checkPassword: "",
  });

  // .test()  정규식과 지정된 문자열 간의 일치 검색을 실행 일치하면 true 불일치 false
  const idCheck = (username) => {
    const regexr = /^[A-Za-z0-9]{4,10}$/;
    return regexr.test(username);
  };

  const changeInputHandler = (event) => {
    const { value, name } = event.target;
    setUsers((old) => {
      return { ...old, [name]: value };
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (
      users.username === "" ||
      users.nickname === "" ||
      users.password === "" ||
      users.checkPassword === ""
    ) {
      alert("아이디,비밀번호,닉네임을 모두 입력해주세요.");
      return;
    }
    if (!idCheck(users.username)) {
      alert("숫자 및 영어만 입력가능합니다.");
    }
    if (users.password !== users.checkPassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    }
    try {
      let user = {
        username: users.username,
        nickname: users.nickname,
        password: users.password,
      };
      const res = await api.post("http://3.38.152.131/api/users/signup", user);
      if (res.data.statusCode === 200) {
        alert(res.data.message);
        navigate("/login");
      }
      if (res.data.statusCode === 500) {
        alert(res.data.message);
      }
      if (res.data.statusCode === 400) {
        alert(res.data.message);
      }
      if (res.data.statusCode === 404) {
        alert(res.data.message);
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      <Header></Header>
      <Wrapper style={{ justifyContent: "center", alignItems: "center" }}>
        <h1>회원가입</h1>
        <FormWrap onSubmit={onSubmitHandler}>
          <label>로그인 ID</label>
          <Input
            type="text"
            placeholder="ID를 입력하세요."
            name="username"
            required
            value={users.id}
            style={{ margin: "5px 0 5px 0" }}
            onChange={changeInputHandler}
          />
          <label>닉네임</label>
          <Input
            type="text"
            placeholder="닉네임을 입력하세요."
            name="nickname"
            required
            value={users.nickname}
            style={{ margin: "5px 0 5px 0" }}
            onChange={changeInputHandler}
          />
          <label>비밀번호</label>
          <Input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요."
            required
            value={users.password}
            style={{ margin: "5px 0 5px 0" }}
            onChange={changeInputHandler}
          />

          <label>비밀번호 확인</label>
          <Input
            type="password"
            name="checkPassword"
            placeholder="비밀번호를 입력하세요."
            required
            value={users.checkPassword}
            style={{ margin: "5px 0 0 0" }}
            onChange={changeInputHandler}
          />
          <Wrapper
            style={{
              display: "flex",
              gridColumnGap: "16px",
              justifyContent: "center",
              alignItems: "center",
              height: "100px",
            }}
          >
            <ButtonWrap>
              <Button
                style={{ height: "50px" }}
                type="button"
                onClick={() => navigate("/login")}
              >
                이전으로
              </Button>
              <Button style={{ height: "50px" }}>회원가입</Button>
            </ButtonWrap>
          </Wrapper>
        </FormWrap>
      </Wrapper>
    </>
  );
}

export default SignUp;

const FormWrap = styled.form`
  min-width: 250px;
  min-height: 380px;
  border: 2px solid #ffffff;
  border-radius: 18px;
  box-shadow: 1px 1px 5px 0px black;
  margin: 30px;
  padding: 30px 90px 40px 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`;

const ButtonWrap = styled.div`
  gap: 10px;
  display: flex;
  justify-content: center;
`;
