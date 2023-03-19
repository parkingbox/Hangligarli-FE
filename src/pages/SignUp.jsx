import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import Wrapper from "../components/Wrapper";
import swal from "sweetalert";
import apis from "../api/api";

function SignUp() {
  const navigate = useNavigate();
  //이름, 이메일, 비밀번호, 비밀번호 확인
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  // 유효성 검사
  const [isUsername, setIsUsername] = useState(false);
  const [isNickname, setIsNickname] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isCheckPassword, setIsCheckPassword] = useState(false);

  //오류메시지 상태저장
  const [usernameMessage, setUsernameMessage] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [checkPasswordMessage, setCheckPasswordMessage] = useState("");

  // .test()  정규식과 지정된 문자열 간의 일치 검색을 실행 일치하면 true 불일치 false
  const idCheck = (username) => {
    const regexr = /^[A-Za-z0-9]{4,10}$/;
    return regexr.test(username);
  };
  const nameCheck = (nickname) => {
    const regexr = /^[가-힣]{1,10}/g;
    return regexr.test(nickname);
  };

  const pwCheck = (username) => {
    const regexr = /^[a-zA-Z0-9`~!@#$%^&*()-_=+]+$/;
    return regexr.test(username);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!idCheck(username)) {
      swal("아이디를 확인해주세요");
    }
    if (!nameCheck(nickname)) {
      swal("닉네임을 확인해주세요");
    }
    if (!pwCheck(password)) {
      swal("비밀번호를 확인해주세요");
    }
    if (password !== checkPassword) {
      swal("비밀번호가 일치하지 않습니다.");
    }

    try {
      let user = {
        username,
        nickname,
        password,
      };
      const res = await apis.post("/api/users/signup", user);

      if (res.data.statusCode === 200) {
        swal({ title: res.data.message, icon: "success", button: "확인" });
      }
    } catch (e) {
      swal(e);
    }
  };
  // 정규식
  const idReg = /^[a-z0-9]{5,12}$/g;
  const nameReg = /^[가-힣]{1,10}/g;
  const pwreg = /^[a-zA-Z0-9`~!@#$%^&*()-_=+]+$/;

  // id
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
    if (!idReg.test(e.target.value)) {
      setUsernameMessage(
        "영 대소문자, 숫자, 입력, 4글자 이상 12글자 미만으로 입력"
      );
      setIsUsername(false);
    } else {
      setUsernameMessage("올바른 ID 형식입니다.");
      setIsUsername(true);
    }
  };

  // name 정규식
  // name
  const onChangeNickname = (e) => {
    setNickname(e.target.value);
    if (nameReg.test(e.target.value)) {
      setNicknameMessage("올바른 닉네임 형식입니다.");
      setIsNickname(true);
    } else {
      setNicknameMessage("한글만 입력가능, 1글자 이상 10글자 미만으로 입력");
      setIsNickname(false);
    }
  };

  // pw정규식
  // ^[a-zA-Z0-9`~!@#$%^&*()-_=+]{8,15}$
  // ^[a-zA-Z0-9`~!@#$%^&*()-_=+]+$
  //pw
  const onChangePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8 || e.target.value.length > 15) {
      setPasswordMessage("8글자 이상 15글자 미만으로 입력");
      setIsPassword(false);
    } else if (!pwreg.test(e.target.value)) {
      setPasswordMessage("영 대소문자, 숫자, 특수기호만 입력가능");
      setIsPassword(false);
    } else {
      setPasswordMessage("올바른 비밀번호 형식입니다.");
      setIsPassword(true);
    }
  };

  //checkpw
  const onChangeCheckPassword = (e) => {
    const currentCheckPassword = e.target.value;
    setCheckPassword(currentCheckPassword);
    if (password !== currentCheckPassword) {
      setCheckPasswordMessage("비밀번호가 일치하지 않습니다.");
      setIsCheckPassword(false);
    } else {
      setCheckPasswordMessage("비밀번호가 일치합니다.");
      setIsCheckPassword(true);
    }
  };

  return (
    <>
      <Wrapper style={{ justifyContent: "center", alignItems: "center" }}>
        <h1>회원가입</h1>
        <FormWrap onSubmit={onSubmitHandler}>
          <InputWrap>
            <div>
              <label>로그인 ID</label>
            </div>
            <Input
              type="text"
              placeholder="ID를 입력하세요."
              name="username"
              required
              value={username}
              style={{ margin: "5px 0 5px 0" }}
              onChange={onChangeUsername}
            />
            <div>
              {username.length > 0 && isUsername ? (
                <CorrectComment>{usernameMessage}</CorrectComment>
              ) : (
                <WrongComment>{usernameMessage}</WrongComment>
              )}
            </div>
          </InputWrap>
          <InputWrap>
            <div>
              <label>닉네임</label>
            </div>
            <Input
              type="text"
              placeholder="닉네임을 입력하세요."
              name="nickname"
              required
              value={nickname}
              style={{ margin: "5px 0 5px 0" }}
              onChange={onChangeNickname}
            />
            <div>
              {0 < nickname.length < 10 && isNickname ? (
                <CorrectComment>{nicknameMessage}</CorrectComment>
              ) : (
                <WrongComment>{nicknameMessage}</WrongComment>
              )}
            </div>
          </InputWrap>
          <InputWrap>
            <div>
              <label>비밀번호</label>
            </div>
            <Input
              type="password"
              name="password"
              placeholder="비밀번호를 입력하세요."
              required
              value={password}
              style={{ margin: "5px 0 5px 0" }}
              onChange={onChangePassword}
            />
            <div>
              {8 < password.length < 15 && isPassword ? (
                <CorrectComment style={{}}>{passwordMessage}</CorrectComment>
              ) : (
                <WrongComment style={{}}>{passwordMessage}</WrongComment>
              )}
            </div>
          </InputWrap>
          <InputWrap>
            <div>
              <label>비밀번호 확인</label>
            </div>
            <Input
              type="password"
              name="checkPassword"
              placeholder="비밀번호를 입력하세요."
              required
              value={checkPassword}
              style={{ margin: "5px 0 0 0" }}
              onChange={onChangeCheckPassword}
            />
            <div>
              {password === checkPassword ? (
                <CorrectComment style={{ marginTop: "5px" }}>
                  {checkPasswordMessage}
                </CorrectComment>
              ) : (
                <WrongComment style={{ marginTop: "5px" }}>
                  {checkPasswordMessage}
                </WrongComment>
              )}
            </div>
          </InputWrap>

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
              <Button
                style={{ height: "50px" }}
                disabled={
                  !(isUsername && isNickname && isPassword && isCheckPassword)
                }
              >
                회원가입
              </Button>
            </ButtonWrap>
          </Wrapper>
        </FormWrap>
      </Wrapper>
    </>
  );
}

export default SignUp;

const FormWrap = styled.form`
  position: relative;
  margin-bottom: 20px;
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
const CorrectComment = styled.p`
  top: 95px;
  margin: 0;
  font-size: 13px;
  color: #002b5b;
`;

const WrongComment = styled.p`
  top: 95px;
  margin: 0;
  font-size: 13px;
  color: #ea5455;
`;

const InputWrap = styled.div`
  height: 90px;
`;
