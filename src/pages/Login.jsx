import React, { useEffect, useState } from "react";
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
  console.log(user.name);
  const fetchTodos = async () => {
    const { data } = await api.get("api/posts/list");
    setUser(data);
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  const changeInputHandler = event => {
    const { value, name } = event.target;
    setUser(old => {
      return { ...old, [name]: value };
    });
  };

  const onSunmitHandler = async e => {
    e.preventDefault();
    try {
      const res = await api.post("/api/users/login", user);
      console.log(res);
      cookies.set("token", res.headers.authorization.substr(7), {
        path: "/",
      });

      const payload = jwt_decode(res.headers.authorization.substr(7));
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
      <h1
        style={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          marginTop: "50px",
          fontSize: "40px",
          fontFamily: "Gamja Flower",
        }}
      >
        안녕하세요! <br />
        항리갈리에 오신걸 환영합니다.
      </h1>
      <Wrapper style={{ justifyContent: "center", alignItems: "center" }}>
        <FormWrap
          onSubmit={onSunmitHandler}
          style={{ justifyContent: "space-around", alignItems: "center" }}
        >
          <h1>Sign In</h1>
          <FormInputWrapper>
            <Input
              placeholder="ID를 입력하세요."
              required
              value={user.username || ""}
              name="username"
              style={{
                width: "250px",
                height: "50px",
                margin: "5px 0 5px 0",
                border: "none",
                backgroundColor: "#EEEEEE",
              }}
              onChange={changeInputHandler}
            />

            <Input
              placeholder="비밀번호를 입력하세요."
              type="password"
              name="password"
              value={user.password || ""}
              style={{
                width: "250px",
                height: "50px",
                margin: "5px 0 0 0",
                border: "none",
                backgroundColor: "#EEEEEE",
              }}
              onChange={changeInputHandler}
            />
          </FormInputWrapper>
          <ButtonWrap>
            <Button
              style={{
                height: "40px",
                borderRadius: "20px",
                border: "none",
                width: "95px",
                backgroundColor: "#EEEEEE",
                boxShadow:
                  "0 5px 5px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22)",
                color: "gray",
              }}
              onClick={() => {
                swal({
                  title: "메인페이지로 이동하시겠습니까?",
                  text: "OK 누를시 메인 페이지로 이동합니다.",
                  buttons: true,
                }).then(willLogin => {
                  if (willLogin) {
                    navigate("/");
                  } else {
                    swal("비회원은 기능이 제한 됩니다.");
                  }
                });
              }}
              type="button"
            >
              Home
            </Button>
            <Button
              style={{
                height: "40px",
                borderRadius: "20px",
                width: "95px",
                border: "none",
                color: "#fff",
                backgroundColor: "#E6A15B",
                boxShadow:
                  "0 5px 5px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22)",
              }}
            >
              Sign In
            </Button>
          </ButtonWrap>
        </FormWrap>
        <SignupWrap>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <h1>저희 사이트에 방문해주셔서 감사합니다.</h1>
            <p>아직 회원이 아니신가요?</p>
          </div>
          <div>
            <Button
              style={{
                marginTop: "20px",
                backgroundColor: "#222a3e",
                border: "none",
                color: "#fff",
                borderRadius: "20px",
                height: "40px",
                boxShadow:
                  "0 5px 5px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22)",
              }}
              onClick={() => {
                swal({
                  title: "아직 회원이 아니신가요?",
                  text: "OK 누를시 회원가입 페이지로 이동합니다.",
                  buttons: true,
                }).then(willSign => {
                  if (willSign) {
                    navigate("/signup");
                  } else {
                    swal("비회원은 기능이 제한됩니다.");
                  }
                });
              }}
            >
              Sign Up
            </Button>
          </div>
        </SignupWrap>
      </Wrapper>
    </LoginWrap>
  );
}

export default Login;
const LoginWrap = styled.div`
  background-color: #f6f5f7;
  background-size: cover;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const FormWrap = styled.form`
  height: 50vh;
  border: 2px solid #fff;
  border-radius: 18px 0 0 18px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  background-color: #fff;
  color: #979a9f;

  min-height: 350px;
  display: flex;
  width: 20vw;
  min-width: 250px;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const SignupWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  width: 20vw;
  min-height: 350px;

  background: -moz-linear-gradient(
    48deg,
    rgba(42, 46, 54, 1) 0%,
    rgba(97, 107, 125, 1) 100%
  );
  background: -webkit-gradient(
    linear,
    left bottom,
    right top,
    color-stop(0%, rgba(42, 46, 54, 1)),
    color-stop(100%, rgba(97, 107, 125, 1))
  );
  background: -webkit-linear-gradient(
    48deg,
    rgba(42, 46, 54, 1) 0%,
    rgba(97, 107, 125, 1) 100%
  );
  background: linear-gradient(
    42deg,
    rgba(42, 46, 54, 1) 0%,
    rgba(97, 107, 125, 1) 100%
  );
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  margin-bottom: 100px;
  border-radius: 0 18px 18px 0;
  h1 {
    color: #fff;
    font-family: "Single Day";
  }
  & p {
    color: #fff;
    font-family: "Single Day";
  }
`;

const FormInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
