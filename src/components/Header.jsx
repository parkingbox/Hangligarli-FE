import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";

import { cookies } from "../shared/cookie";
import Button from "./Button";

function Header() {
  const navigate = useNavigate();
  
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
    cookies.remove("token");
    swal({
      title: "로그아웃하시겠습니까?",
      text: "OK 누를시 로그인 페이지로 이동합니다.",
      icon: "warning",
      buttons: true,
    }).then((willLogin) => {
      if (willLogin) {
        cookies.remove("token");
        cookies.remove("nickname");
        
      } else {
        swal("비회원은 글작성이 제한됩니다.");
      }
    });
  };
  const onWriteBtn = () => {
    navigate("/post");
  };
  return (
    <Navbar>
      <div>
        <img
          style={{ height: "50px", width: "50px", marginLeft: "10px" }}
          src="https://image.winudf.com/v2/image/b2hkdW1hay5oYWx5Z2FseV9pY29uXzBfZGQwYmVmZDc/icon.png?w=280&fakeurl=1"
        />
      </div>
      <LoginNavbar>
        {cookies.get("token") ? (
          <div>
            <span>{cookies.get("nickname")}</span>님 안녕하세요
          </div>
        ) : null}
        {cookies.get("token") ? (
          <AfterLogin>
            <Button style={{}} onClick={onWriteBtn}>
              글작성
            </Button>
            <Button style={{}} onClick={onLogoutBtn}>
              로그아웃
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

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
`;
const LoginNavbar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const AfterLogin = styled.div``;
