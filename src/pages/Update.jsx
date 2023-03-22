import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __updatePost } from "../redux/modules/PostSlice";
import Button from "./../components/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { cookies } from "../shared/cookie";
import swal from "sweetalert";

function Update() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { post } = useSelector(state => {
    return state.posts;
  });
  
  const [updatePost, setUpdatePost] = useState({
    title: "",
    level: "",
    time: "",
    minperson: 0,
    maxperson: 0,
    image: "",
    content: "",
  });

  //time
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");

  const onChangeHourHandler = e => {
    setHour(e.target.value);
  };
  const onChangeMinuteHandler = e => {
    setMinute(e.target.value);
  };

  useEffect(() => {
    let time = hour * Number(60) + Number(minute);
    setUpdatePost(pre => ({ ...pre, time }));
  }, [hour, minute]);

  const changeInputHandler = e => {
    const { value, name } = e.target;
    setUpdatePost(pre => ({ ...pre, [name]: value }));
  };

  useEffect(() => {
    const { ...rest } = post;
    setUpdatePost(pre => {
      return {
        ...pre,
        ...rest,
      };
    });
  }, [post]);

  const onSubmitHandler = event => {
    dispatch(__updatePost({ ...updatePost }));
      //input값 초기화
    setUpdatePost({
      id: 0,
      title: "",
      level: "",
      time: "",
      minperson: 0,
      maxperson: 0,
      image: "",
      content: "",
    });
  };

  return (
    <>
      <HomeLinkDiv>
        <StHomeLink to={"/"}>홈으로</StHomeLink>
      </HomeLinkDiv>
      <StPostComponentLayout>
        <PostComponentHead>게시글 수정</PostComponentHead>
        <StPostComponent>
          <form onSubmit={onSubmitHandler}>
            {/* game title */}
            <PostInputStyle>
              <label>게임 이름:</label>
              <InputSt
                type="text"
                name="title"
                value={updatePost.title}
                onChange={changeInputHandler}
              />
            </PostInputStyle>

            {/* game level */}
            <PostInputStyle>
              <label>난이도:</label>
              <SelectSt
                name="level"
                form="levelForm"
                value={updatePost.level}
                onChange={changeInputHandler}
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
                <InputSt
                  type="Number"
                  name="hour"
                  value={hour}
                  onChange={onChangeHourHandler}
                />
                <span>시간 </span>
                <InputSt
                  type="Number"
                  name="minute"
                  value={minute}
                  onChange={onChangeMinuteHandler}
                />
                <span>분 </span>
              </div>
            </PostInputStyle>

            {/* person */}
            <PostInputStyle>
              <label>필요 인원:</label>
              <div>
                <InputSt
                  type="Number"
                  min="1"
                  name="minperson"
                  value={updatePost.minperson}
                  onChange={changeInputHandler}
                />
                명<span>~ </span>
                <InputSt
                  type="Number"
                  min="1"
                  name="maxperson"
                  value={updatePost.maxperson}
                  onChange={changeInputHandler}
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
                value={updatePost.image}
                onChange={changeInputHandler}
              />
            </PostInputStyle>

            {/* content */}
            <PostInputStyle>
              <label>진행 방법:</label>
              <ContentInputSt
                type="text"
                name="content"
                value={updatePost.content}
                onChange={changeInputHandler}
              />
            </PostInputStyle>
            <PostBtn>
              <Button>수정하기</Button>
            </PostBtn>
          </form>
        </StPostComponent>
      </StPostComponentLayout>
    </>
  );
}

export default Update;

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

const InputSt = styled.input`
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

const PostBtn = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 40px;
`;
