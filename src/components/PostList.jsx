import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getPostList } from "../redux/modules/PostSlice";

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
    <div>
      <div>
        {posts.map(post => {
          return (
            <div key={post.id}>
              <div>{post.id}</div>
              <div>{post.title}</div>
              <div>{post.level}</div>
              <div>{post.time}</div>
              <div>{post.minperson}</div>
              <div>{post.maxperson}</div>
              <img
                style={{ width: "200px", height: "200px" }}
                src={post.image}
                alt="게임 이미지"
              />
              <div>{post.content}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PostList;
