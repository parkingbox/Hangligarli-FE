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
  //   console.log(posts);

  useEffect(() => {
    dispatch(__getPostList());
  }, [dispatch]);

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <StPostListComponents>
      <h2>BOARDGAME LISTS</h2>
      <StPostListWrap>
        {posts.map(post => {
          return (
            <StPostComponent key={post.id}>
              <div>
                <img
                  style={{ width: "250px", height: "250px" }}
                  src={post.image}
                  alt="게임 이미지"
                />
              </div>
              <div>
                <div>{post.title}</div>
                <Link to={`/detail/${post.id}`} key={post.id}>
                  보러가기
                </Link>
              </div>
            </StPostComponent>
          );
        })}
      </StPostListWrap>
    </StPostListComponents>
  );
}

export default PostList;

const StPostListComponents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
