import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { __getPostList } from "../redux/modules/PostSlice";
import styled from "styled-components";

function PostList() {
  const dispatch = useDispatch();
  const { isLoading, error, posts } = useSelector(state => {
    return state.posts;
  });

  useEffect(() => {
    dispatch(__getPostList());
  }, [dispatch]);

  // window.location.href = "/";

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <StPostListComponents>
      <StPostListDiv>BOARDGAME LISTS</StPostListDiv>
      <StPostListDescription>
        '보러가기'를 통해 수많은 보드게이머가 작성한 게임 방법을 확인해보세요!
      </StPostListDescription>
      <StPostListWrap>
        {posts.data?.map(post => {
          return (
            <StPostComponent key={post.id}>
              <div>
                <img
                  style={{ width: "225px", height: "225px" }}
                  src={post.image}
                  alt="게임 이미지"
                />
              </div>
              <StPostListTitleDetail>
                <StPostListTitle>{post.title}</StPostListTitle>
                <StPostDetailLink to={`/detail/${post.id}`}>
                  보러가기
                </StPostDetailLink>
              </StPostListTitleDetail>
            </StPostComponent>
          );
        })}
      </StPostListWrap>
    </StPostListComponents>
  );
}

export default PostList;

const StPostListComponents = styled.div`
  @font-face {
    font-family: "TheJamsil5Bold";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/TheJamsil5Bold.woff2")
      format("woff2");
    font-weight: 700;
    font-style: normal;
  }

  margin-top: 40px;
  font-family: "TheJamsil5Bold";
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StPostListDescription = styled.div`
  font-size: 15px;
  color: gray;
  padding-bottom: 50px;
`;

const StPostListDiv = styled.div`
  font-weight: bolder;
  font-size: 35px;
  font-style: italic;
  padding-bottom: 10px;
  color: #262525;
`;
const StPostListWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 30px;
  row-gap: 30px;
  padding-bottom: 50px;
`;

const StPostComponent = styled.div`
  width: 350px;
  height: 350px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StPostListTitleDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const StPostListTitle = styled.div`
  font-size: 23px;
  font-weight: bold;
  color: #2c2b2b;
`;

const StPostDetailLink = styled(Link)`
  font-size: 14px;
  text-decoration: none;
  color: #6e6d6d9e;
  border: 1px solid #6e6d6d8c;
  border-radius: 10px;
  padding: 5px;
`;
