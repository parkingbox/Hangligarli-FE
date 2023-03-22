import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { __addPost } from "../redux/modules/PostSlice";
import Button from "./../components/Button";
import Input from "./../components/Input";
import useInput from "../hooks/useInput";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { cookies } from "../shared/cookie";

function Post() {
  const token = cookies.get("token");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //time
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const onChangeHourHandler = (e) => {
    setHour(e.target.value);
  };
  const onChangeMinuteHandler = (e) => {
    setMinute(e.target.value);
  };
  const time = hour * Number(60) + Number(minute);

  //image
  const [image, setImage] = useState("");
  const onChangeImageHandler = (e) => {
    e.preventDefault();
    setImage(e.target.value);
  };

  const [title, onChangeTitleHandler] = useInput("");
  const [level, onChangeLevelHandler] = useInput("");
  const [minperson, onChangeMinPersonHandler] = useInput();
  const [maxperson, onChangeMaxPersonHandler] = useInput();
  const [content, onChangeContentHandler] = useInput("");

  const [post, setPost] = useState({
    title: "",
    level: "",
    time: "",
    minperson: 0,
    maxperson: 0,
    image: "",
    content: "",
  });

  useEffect(() => {
    setPost({
      title,
      level,
      time,
      minperson,
      maxperson,
      image,
      content,
      token,
    });
  }, [title, level, time, image, minperson, maxperson, content, token]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(__addPost({ ...post }));
    setPost({
      title,
      level,
      time,
      minperson,
      maxperson,
      image,
      content,
      token,
    });
    navigate("/");
  };

  return (
    <>
      <HomeLinkDiv>
        <StHomeLink to={"/"}>홈으로</StHomeLink>
      </HomeLinkDiv>
      <StPostComponentLayout>
        <PostComponentHead>게시글 작성</PostComponentHead>
        <StPostComponent>
          <form onSubmit={onSubmitHandler}>
            {/* game title */}
            <PostInputStyle>
              <label>게임 이름:</label>
              <Input
                type="text"
                name="title"
                value={title}
                onChange={onChangeTitleHandler}
              />
            </PostInputStyle>

            {/* game level */}
            <PostInputStyle>
              <label>게임 난이도:</label>
              <SelectSt
                name="level"
                form="levelForm"
                value={level}
                onChange={onChangeLevelHandler}
              >
                <option value="easy">easy</option>
                <option value="Normal">Normal</option>
                <option value="hard">hard</option>
                <option value="veryhard">veryhard</option>
              </SelectSt>
            </PostInputStyle>

            {/* play time */}
            <PostInputStyle>
              <label>소요 시간:</label>
              <div>
                <Input
                  type="Number"
                  name="hour"
                  value={hour}
                  onChange={onChangeHourHandler}
                />
                <span>시간 </span>
                <Input
                  type="Number"
                  name="minute"
                  value={minute}
                  onChange={onChangeMinuteHandler}
                />
                <span>분</span>
              </div>
            </PostInputStyle>

            {/* person */}
            <PostInputStyle>
              <label>필요 인원:</label>
              <div>
                <Input
                  type="Number"
                  min="1"
                  name="minperson"
                  value={minperson}
                  onChange={onChangeMinPersonHandler}
                />
                명<span>~ </span>
                <Input
                  type="Number"
                  min="1"
                  name="maxperson"
                  value={maxperson}
                  onChange={onChangeMaxPersonHandler}
                />
                명
              </div>
            </PostInputStyle>

            <PostInputStyle>
              <label>게임 이미지:</label>
              <ImgInputSt
                type="text"
                accept="image/jpg,image/png,image/jpeg,image/gif"
                name="image"
                value={image}
                onChange={onChangeImageHandler}
              />
            </PostInputStyle>

            {/* content */}
            <PostInputStyle>
              <label>진행 방법:</label>
              <ContentInputSt
                type="text"
                name="content"
                value={content}
                onChange={onChangeContentHandler}
              />
            </PostInputStyle>
            <PostBtn>
              <Button>등록하기</Button>
            </PostBtn>
          </form>
        </StPostComponent>
      </StPostComponentLayout>
    </>
  );
}

export default Post;

const HomeLinkDiv = styled.div`
  height: 70px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StHomeLink = styled(Link)`
  font-size: 14px;
  text-decoration: none;
  color: #6e6d6dd6;
  border: 1px solid #6e6d6d8c;
  border-radius: 10px;
  padding: 5px;
`;

const StPostComponentLayout = styled.div`
  @font-face {
    font-family: "NanumSquareNeo-Variable";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  font-family: "NanumSquareNeo-Variable";
  color: #262525;

  margin-top: 20px;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
`;

const PostComponentHead = styled.div`
  font-size: 25px;
  padding-bottom: 40px;
`;

const StPostComponent = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostInputStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  padding-bottom: 30px;
`;

const PostBtn = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 40px;
`;

const SelectSt = styled.select`
  border: 1px solid #333333;
  height: 40px;
  width: 200px;
  outline: none;
  border-radius: 8px;
  padding-left: 12px;
  padding-right: 12px;
  &:focus-within {
    box-shadow: 0 0 0 1px #000;
  }
`;

const ImgInputSt = styled.input`
  border: 1px solid #333333;
  height: 40px;
  width: 500px;
  outline: none;
  border-radius: 8px;
  padding-left: 12px;
  padding-right: 12px;
  &:focus-within {
    box-shadow: 0 0 0 1px #000;
  }
`;

const ContentInputSt = styled.input`
  border: 1px solid #333333;
  height: 200px;
  width: 500px;
  outline: none;
  border-radius: 8px;
  padding-left: 12px;
  padding-right: 12px;
  &:focus-within {
    box-shadow: 0 0 0 1px #000;
  }
`;
