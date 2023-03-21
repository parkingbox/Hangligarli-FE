import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import styled from "styled-components";

import { __getPostId, __deletePost } from "../redux/modules/PostSlice";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function Detail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, post } = useSelector((state) => {
    return state.posts;
  });

  const { id } = useParams();

  useEffect(() => {
    dispatch(__getPostId(id));
  }, [dispatch, id]);

  const onClickDeleteHandler = id => {
    dispatch(__deletePost(id));
    alert("삭제되었습니다!");
    navigate("/");
  };

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const onClickDeleteHandler = (id) => {
    //홈으로 이동시키는 코드 추가

    dispatch(__deletePost(id));
  };

  return (
    <div>
      <Link to={"/"}>홈</Link>
      <div>{id}: 확인용.없앨예정</div>
      <div>
        <div>
          <img
            style={{ width: "250px", height: "250px" }}
            src={post.image}
            alt="게임 이미지"
          />
        </div>
        <div>
          <div>게임 이름: {post.title}</div>
          <div>
            <div>난이도: {post.level}</div>
            <div>소요시간: {post.time}분</div>
            <div>
              인원: {post.minperson} ~ {post.maxperson}명
            </div>
            <div>
              <Link to={"/update"} key={post.id}>
                <Button>수정하기</Button>
              </Link>
              <Button onClick={() => onClickDeleteHandler(id)}>삭제하기</Button>
            </div>
          </div>
          <div>게임 진행 방법: {post.content}</div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
