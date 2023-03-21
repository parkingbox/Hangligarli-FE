import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import Wrapper from "../components/Wrapper";
import swal from "sweetalert";
import jwt_decode from "jwt-decode";

import { api } from "../api/api";
import { cookies } from "../shared/cookie";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const fetchTodos = async () => {
    const { data } = await api.get("api/posts/list");
    setUser(data);
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  const changeInputHandler = (event) => {
    const { value, name } = event.target;
    setUser((old) => {
      return { ...old, [name]: value };
    });
  };

  const onSunmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/users/login", user);

      const payload = jwt_decode(res.headers.authorization.substr(7));

      cookies.set("token", res.headers.authorization.substr(7), {
        path: "/",
      });
      cookies.set("nickname", payload.auth, {
        path: "/",
      });
      navigate("/");
      if (res.data.statusCode === 200) {
        swal({ title: res.data.message, icon: "success", button: "확인" });
      }
      if (res.data.statusCode === 400) {
        swal({ title: res.data.message, icon: "fail", button: "확인" });
      }
      if (res.data.statusCode === 404) {
        swal(res.data.message);
      }
    } catch (e) {
      swal("아이디 비밀번호를 확인해주세요.");
    }
  };

  useEffect(() => {
    const token = cookies.get("token");
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <LoginWrap>
      <Wrapper style={{ justifyContent: "center", alignItems: "center" }}>
        <h1>로그인</h1>
        <FormWrap onSubmit={onSunmitHandler}>
          <label>로그인 ID</label>
          <Input
            placeholder="ID를 입력하세요."
            required
            value={user.username}
            name="username"
            style={{ margin: "5px 0 5px 0" }}
            onChange={changeInputHandler}
          />

          <label>비밀번호</label>
          <Input
            placeholder="비밀번호를 입력하세요."
            type="password"
            name="password"
            value={user.password}
            style={{ margin: "5px 0 0 0" }}
            onChange={changeInputHandler}
          />
          <ButtonWrap>
            <Button style={{ height: "50px" }}>로그인</Button>
          </ButtonWrap>
        </FormWrap>
        <SignupWrap>
          <p>저희가 처음이신가요?</p>
          <SignLink to="/signup">회원가입</SignLink>
        </SignupWrap>
      </Wrapper>
    </LoginWrap>
  );
}

export default Login;
const LoginWrap = styled.div`
  background-image: url("https://camo.githubusercontent.com/67abf5af2cf79447cdd4cebe759d9e6dc3d6a9fa653a7a1297b178067adae95f/687474703a2f2f6f70656e696d6167652e696e7465727061726b2e636f6d2f676f6f64735f696d6167655f6269672f312f362f362f302f383131333938313636305f6c2e6a7067");
  background-size: cover;
  height: 100vh;
`;
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

const SignupWrap = styled.div`
  display: flex;
  grid-column-gap: 16px;
  justify-content: center;
  align-items: center;
`;

const SignLink = styled(Link)`
  color: black;
  text-decoration-line: underline;
`;
