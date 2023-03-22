import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";
import apis from "../api/api";

import { cookies } from "../shared/cookie";
import Button from "./Button";

function Header({ nickname }) {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const memberSecede = cookies.get("nickname");

  const onLoginBtn = () => {
    cookies.remove("token");
    swal({
      title: "로그인이 페이지로 이동하시겠습니까?",
      text: "OK 누를시 로그인 페이지로 이동합니다.",
      icon: "warning",
      buttons: true,
    }).then((willLogin) => {
      if (willLogin) {
        navigate("/login");
      } else {
        swal("비회원은 기능이 제한 됩니다.");
      }
    });
  };
  const onLogoutBtn = () => {
    swal({
      title: "로그아웃하시겠습니까?",
      text: "OK 누를시 로그인 페이지로 이동합니다.",
      icon: "warning",
      buttons: true,
    }).then((willLogin) => {
      if (willLogin) {
        cookies.remove("token");
        cookies.remove("nickname");
        setIsLogin(true);
      } else {
        swal("비회원은 글작성이 제한됩니다.");
      }
    });
  };
  const onWriteBtn = () => {
    swal({
      title: "글작성 페이지로 이동합니다.",
      buttons: true,
    }).then((willLogin) => {
      if (willLogin) {
        navigate("/post");
      } else {
        swal("비회원은 글작성이 제한됩니다.");
      }
    });
  };
  const onSecedeBtn = async () => {
    try {
      await apis.delete("/api/users/check/nickname", memberSecede);
      swal({
        title: "확인을 누르면 계정이 탈퇴됩니다.",
        buttons: true,
      }).then((willLogin) => {
        if (willLogin) {
          swal("이용해 주셔서 감사합니다.");
          navigate("/login");
        }
      });
    } catch (e) {
    }
  };
  return (
    <Navbar>
      <div>
        <h1
          style={{
            fontFamily: "Gamja Flower",
            fontSize: "30px",
            color: "#fff",
          }}
        >
          항리갈리
        </h1>
      </div>
      <LoginNavbar>
        {cookies.get("token") ? (
          <div>
            <span style={{ color: "#fff" }}>
              {cookies.get("nickname")}님 안녕하세요
            </span>
          </div>
        ) : null}
        {cookies.get("token") ? (
          <AfterLogin>
            <Button
              style={{
                height: "40px",
                width: "60px",
                backgroundColor: "#605549",
                border: "none",
                color: "#fff",
              }}
              onClick={onWriteBtn}
            >
              글작성
            </Button>
            <Button
              style={{
                height: "40px",
                width: "60px",
                backgroundColor: "#605549",
                border: "none",
                color: "#fff",
              }}
              onClick={onLogoutBtn}
            >
              로그아웃
            </Button>
            <Button
              style={{
                height: "40px",
                width: "60px",
                backgroundColor: "#605549",
                border: "none",
                color: "#fff",
                nickname: { nickname },
              }}
              onClick={onSecedeBtn}
            >
              회원탈퇴
            </Button>
          </AfterLogin>
        ) : (
          <Button onClick={onLoginBtn}>로그인</Button>
        )}
      </LoginNavbar>
    </Navbar>
  );
}

export default Header;

const Navbar = styled.div`
  display: flex;
  justify-content: space-around;
  height: 100px;
  background-color: #272522;
`;
const LoginNavbar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const AfterLogin = styled.div`
  display: flex;
  gap: 5px;
`;
