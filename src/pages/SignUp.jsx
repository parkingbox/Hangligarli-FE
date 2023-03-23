import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import Wrapper from "../components/Wrapper";
import swal from "sweetalert";
import { api } from "../api/api";
import { cookies } from "../shared/cookie";

function SignUp() {
  const navigate = useNavigate();
  //이름, 이메일, 비밀번호, 비밀번호 확인
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [checkId, setCheckId] = useState(false);
  const [checkName, setCheckName] = useState(false);

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

  // onsubmithandler 에서 true가 아니면 회원가입 x

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
    if (checkId == false && checkName == false) {
      alert("중복확인이 필요합니다.");
    }
    try {
      let user = {
        username,
        nickname,
        password,
      };
      const res = await api.post("/api/users/signup", user);
      if (res.data.statusCode === 200) {
        swal({
          title: "회원가입을 하시겠습니까?",
          text: "OK 누를시 로그인 페이지로 이동합니다.",
          buttons: true,
        }).then((willSign) => {
          if (willSign) {
            navigate("/login");
          }
        });
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
      setUsernameMessage("영 대소문자,숫자 4글자 이상 12글자 미만으로 입력");
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

  const idDuplicationCheck = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/users/check/username", {
        username: username,
      });
      if (username === "") {
        swal("아이디를 입력해주세요");
      } else if (!idCheck(username)) {
        swal("아이디를 확인해주세요");
      } else {
        swal("사용가능한 아이디입니다.");
        setCheckId(true);
      }
    } catch (error) {
      swal("중복된 아이디입니다.");
    }
  };

  const nameDuplicationCheck = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/users/check/nickname", {
        nickname: nickname,
      });
      if (nickname === "") {
        swal("닉네임를 입력해주세요");
      } else if (!nameCheck(nickname)) {
        swal("닉네임을 확인해주세요.");
      } else {
        swal("사용가능한 닉네임입니다.");
        setCheckName(true);
      }
    } catch (error) {
      swal("중복된 닉네임입니다.");
    }
  };

  useEffect(() => {
    const token = cookies.get("token");
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <BackWrap style={{ backgroundColor: "#f6f5f7" }}>
      <h1 style={{ fontSize: "50px", fontFamily: "Single Day" }}>회원가입</h1>
      <Wrapper
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SignInWrapper>
          <p style={{ textAlign: "center" }}>
            저희 사이트에 방문해주셔서 감사합니다.
          </p>
          <p>개인정보를 입력하고 저희와 함께해요!</p>
        </SignInWrapper>
        <FormWrap onSubmit={onSubmitHandler}>
          <h1 style={{ marginBottom: "30px", fontFamily: "Gamja Flower" }}>
            회원가입
          </h1>
          <InputsWrapper>
            <InputWrap>
              <Input
                type="text"
                placeholder="ID를 입력하세요."
                name="username"
                required
                value={username}
                style={{
                  margin: "5px 0 5px 0",
                  position: "relative",
                  backgroundColor: "#EEEEEE",
                  border: "none",
                }}
                onChange={onChangeUsername}
              />
              <Button
                style={{
                  margin: "5px",
                  width: "50px",
                  height: "40px",
                  color: "#fff",
                  boxShadow:
                    "0 5px 5px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22)",
                  backgroundColor: "#E6A15B",
                  position: "absolute",
                  border: "none",
                }}
                onClick={idDuplicationCheck}
              >
                확인
              </Button>
              <div>
                {username.length > 0 && isUsername ? (
                  <CorrectComment>{usernameMessage}</CorrectComment>
                ) : (
                  <WrongComment>{usernameMessage}</WrongComment>
                )}
              </div>
            </InputWrap>
            <InputWrap>
              <Input
                type="text"
                placeholder="닉네임을 입력하세요."
                name="nickname"
                required
                value={nickname}
                style={{
                  margin: "5px 0 5px 0",
                  backgroundColor: "#EEEEEE",
                  position: "relative",
                  border: "none",
                }}
                onChange={onChangeNickname}
              />
              <Button
                style={{
                  margin: "5px",
                  width: "50px",
                  height: "40px",
                  backgroundColor: "#E6A15B",
                  border: "none",
                  color: "#fff",
                  boxShadow:
                    "0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)",
                  position: "absolute",
                }}
                onClick={nameDuplicationCheck}
              >
                확인
              </Button>
              <div>
                {0 < nickname.length < 10 && isNickname ? (
                  <CorrectComment>{nicknameMessage}</CorrectComment>
                ) : (
                  <WrongComment>{nicknameMessage}</WrongComment>
                )}
              </div>
            </InputWrap>
            <InputWrap>
              <Input
                type="password"
                name="password"
                placeholder="비밀번호를 입력하세요."
                required
                value={password}
                style={{
                  margin: "5px 0 5px 0",
                  border: "none",
                  backgroundColor: "#EEEEEE",
                }}
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
              <Input
                type="password"
                name="checkPassword"
                placeholder="비밀번호를 입력하세요."
                required
                value={checkPassword}
                style={{
                  margin: "5px 0 0 0",
                  border: "none",
                  backgroundColor: "#EEEEEE",
                }}
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
          </InputsWrapper>
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
                style={{
                  height: "50px",
                  borderRadius: "15px",
                  border: "none",
                  backgroundColor: "#E6A15B",
                  color: "#fff",
                  boxShadow:
                    "0 5px 5px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22)",
                }}
                type="button"
                onClick={() => {
                  swal({
                    text: "OK 누를시 로그인 페이지로 이동합니다.",
                    buttons: true,
                  }).then((willSign) => {
                    if (willSign) {
                      navigate("/login");
                    } else {
                      swal("비회원은 기능이 제한됩니다.");
                    }
                  });
                }}
              >
                이전으로
              </Button>
              <Button
                style={{
                  height: "50px",
                  borderRadius: "15px",
                  border: "none",
                  boxShadow:
                    "0 5px 5px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22)",
                }}
                disabled={
                  !(
                    isUsername &&
                    isNickname &&
                    isPassword &&
                    isCheckPassword &&
                    checkId == true &&
                    checkName == true
                  )
                }
                onClick={() => {
                  swal({
                    title: "회원가입을 하시겠습니까?",
                    text: "OK 누를시 로그인 페이지로 이동합니다.",
                    buttons: true,
                  });
                }}
              >
                회원가입
              </Button>
            </ButtonWrap>
          </Wrapper>
        </FormWrap>
      </Wrapper>
    </BackWrap>
  );
}

export default SignUp;

const BackWrap = styled.div`
  min-height: 760px;
  opacity: 0.8;
  height: 100vh;
  padding-top: 50px;
  overflow: hidden;
  h1 {
    margin: 0;
    display: flex;
    justify-content: center;
  }
`;

const FormWrap = styled.form`
  position: relative;
  margin-bottom: 20px;
  width: 400px;
  height: 60vh;
  min-width: 250px;
  min-height: 460px;
  border-radius: 0px 18px 18px 0px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  padding: 20px 40px 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  background-color: #fff;
  color: #979a9f;
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
  font-size: 10px;
  color: #db3333;
`;

const InputWrap = styled.div`
  height: 70px;
`;

const SignInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #222a3e;
  font-size: 25px;
  font-family: "Single Day";
  width: 400px;
  height: 60vh;
  min-width: 250px;
  min-height: 460px;
  margin-bottom: 20px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  border-radius: 18px 0px 0px 18px;
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
  border-radius: 18px 0 0 18px;
  h1 {
    color: #fff;
  }
  & p {
    color: #fff;
  }
`;
const InputsWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
