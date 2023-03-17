import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __addPost } from "../redux/modules/PostSlice";
import Button from "./../components/Button";
import Input from "./../components/Input";
import useInput from "../hooks/useInput";
import nextId from "react-id-generator";

function Post() {
  const id = nextId();
  const dispatch = useDispatch();
  // const posts = useSelector(state => state.posts);
  const { isLoading, error, posts } = useSelector(state => {
    return state.posts;
  });
  console.log(posts, "Post.jsx - posts");

  //time
  const [hour, setHour] = useState();
  const [minute, setMinute] = useState();
  const onChangeHourHandler = e => {
    setHour(e.target.value);
  };
  const onChangeMinuteHandler = e => {
    setMinute(e.target.value);
  };
  const time = hour * Number(60) + Number(minute);
  console.log(time);

  //image
  // const onChangeImageHandler = e => {
  //   e.preventDefault();
  //   if (e.target.files) {
  //     const uploadFile = e.target.files[0];
  //     const formData = new FormData();
  //     console.log(formData);
  //     formData.append("files", uploadFile);
  //   }
  // };

  const [title, onChangeTitleHandler] = useInput("");
  const [level, onChangeLevelHandler] = useInput("");
  const [minperson, onChangeMinPersonHandler] = useInput();
  const [maxperson, onChangeMaxPersonHandler] = useInput();
  // const [image, onChangeImageHandler] = useInput("");
  const [content, onChangeContentHandler] = useInput("");

  const [post, setPost] = useState({
    id: 0,
    title: "",
    level: "",
    time: "",
    minperson: 0,
    maxperson: 0,
    // image: "",
    content: "",
  });

  useEffect(() => {
    setPost({
      title,
      level,
      time,
      minperson,
      maxperson,
      // image,
      content,
    });
  }, [title, level, time, minperson, maxperson, content]);
  //image추가
  // console.log(image);

  const onSubmitHandler = event => {
    event.preventDefault();

    dispatch(__addPost({ ...post, id }));
    setPost({
      id: 0,
      title: "",
      level: "",
      time,
      minperson: 0,
      maxperson: 0,
      // image: "",
      content: "",
    });
  };
  console.log(post, "Post.jsx - post");

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        {/* game title */}
        <div>
          <label>게임 이름</label>
          <Input
            type="text"
            name="title"
            value={title}
            onChange={onChangeTitleHandler}
          />
        </div>

        {/* game level */}
        <div>
          <label>난이도</label>
          <select
            name="level"
            form="levelForm"
            value={level}
            onChange={onChangeLevelHandler}
          >
            <option value="easy">하</option>
            <option value="Normal">중</option>
            <option value="hard">상</option>
            <option value="veryhard">최상</option>
          </select>
        </div>

        {/* play time */}
        <div>
          <label>소요시간</label>
          <Input
            type="Number"
            name="hour"
            value={hour}
            onChange={onChangeHourHandler}
          />
          <span>시간</span>
          <Input
            type="Number"
            name="minute"
            value={minute}
            onChange={onChangeMinuteHandler}
          />
          <span>분</span>
        </div>

        {/* person */}
        <div>
          <label>인원</label>
          <Input
            type="Number"
            min="1"
            name="minperson"
            value={minperson}
            onChange={onChangeMinPersonHandler}
          />
          명<span>~</span>
          <Input
            type="Number"
            min="1"
            name="maxperson"
            value={maxperson}
            onChange={onChangeMaxPersonHandler}
          />
          명
        </div>

        <div>
          <label>게임 이미지</label>
          <Input
            type="file"
            accept="image/jpg,image/png,image/jpeg,image/gif"
            name="image"
            // value={image}
            // onChange={onChangeImageHandler}
          />
        </div>

        {/* content */}
        <div>
          <label>게임 진행 방법</label>
          <Input
            type="text"
            name="content"
            value={content}
            onChange={onChangeContentHandler}
          />
        </div>

        <Button>등록하기</Button>
      </form>

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
              <div>{post.image}</div>
              <div>{post.content}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Post;
