import React from "react";
import { useSelector } from "react-redux";

function PostList() {
  const posts = useSelector(state => state.posts);
  console.log(posts);

  return <div>PostList</div>;
}

export default PostList;
