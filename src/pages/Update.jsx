import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __updatePost } from "../redux/modules/PostSlice";
import Button from "./../components/Button";
import Input from "./../components/Input";
import useInput from "../hooks/useInput";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Update() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => {
    return state.posts;
  });
  // console.log(post, "Update.jsx, state.posts");

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
  const [image, setImage] = useState();
  const onChangeImageHandler = (e) => {
    e.preventDefault();
    setImage(e.target.value);
  };

  const [title, onChangeTitleHandler] = useInput("");
  const [level, onChangeLevelHandler] = useInput("");
  const [minperson, onChangeMinPersonHandler] = useInput();
  const [maxperson, onChangeMaxPersonHandler] = useInput();
  const [content, onChangeContentHandler] = useInput("");

  //1. 컴포넌트 실행시 최초의 빈 값.
  const [updatePost, setUpdatePost] = useState({
    id: 0,
    title: "",
    level: "",
    time: "",
    minperson: 0,
    maxperson: 0,
    image: "",
    content: "",
  });
  // console.log(updatePost);

  //3. 2번에 의해 덮어씌워진 1번 updatePost값이 onChange로 변경되면 의존성배열로 감지 -> dispatch에 사용
  useEffect(() => {
    setUpdatePost({
      id: post.id,
      title,
      level,
      time,
      minperson,
      maxperson,
      image,
      content,
    });
    if (title) {
      setUpdatePost((prev) => {
        return { ...prev, title };
      });
    }
    if (level) {
      setUpdatePost((prev) => {
        return { ...prev, level };
      });
    }
    if (time) {
      setUpdatePost((prev) => {
        return { ...prev, time };
      });
    }
    if (image) {
      setUpdatePost((prev) => {
        return { ...prev, image };
      });
    }
    if (minperson) {
      setUpdatePost((prev) => {
        return { ...prev, minperson };
      });
    }
    if (maxperson) {
      setUpdatePost((prev) => {
        return { ...prev, maxperson };
      });
    }
    if (content) {
      setUpdatePost((prev) => {
        return { ...prev, content };
      });
    }
  }, [post, title, level, time, image, minperson, maxperson, content]);

  //2. 기본적으로 input값에 들어가있어야 하는 기존의 input data => 1번 updatePost값이 됨
  useEffect(() => {
    const { id, title, level, time, minperson, maxperson, image, content } =
      post;
    setUpdatePost({
      id,
      title,
      level,
      time,
      minperson,
      maxperson,
      image,
      content,
    });
  }, [post]);

  const onSubmitHandler = (event) => {
    // event.preventDefault();
    dispatch(__updatePost({ ...updatePost }));
    alert("수정되었습니다!");
    navigate(`/detail/${post.id}`);

    //input값 초기화
    setUpdatePost({
      id: 0,
      title: "",
      level: "",
      time,
      minperson: 0,
      maxperson: 0,
      image: "",
      content: "",
    });
  };

  return (
    <div>
      <Link to={"/"}>홈</Link>
      <form onSubmit={onSubmitHandler}>
        {/* game title */}
        <div>
          <label>게임 이름</label>
          <Input
            type="text"
            name="title"
            value={updatePost.title}
            onChange={onChangeTitleHandler}
          />
        </div>

        {/* game level */}
        <div>
          <label>난이도</label>
          <select
            name="level"
            form="levelForm"
            value={updatePost.level}
            onChange={onChangeLevelHandler}
          >
            <option value="easy">easy</option>
            <option value="Normal">Normal</option>
            <option value="hard">hard</option>
            <option value="veryhard">veryhard</option>
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
            value={updatePost.minperson}
            onChange={onChangeMinPersonHandler}
          />
          명<span>~</span>
          <Input
            type="Number"
            min="1"
            name="maxperson"
            value={updatePost.maxperson}
            onChange={onChangeMaxPersonHandler}
          />
          명
        </div>

        <div>
          <label>게임 이미지</label>
          <input
            type="text"
            accept="image/jpg,image/png,image/jpeg,image/gif"
            name="image"
            value={updatePost.image}
            onChange={onChangeImageHandler}
          />
        </div>

        {/* content */}
        <div>
          <label>게임 진행 방법</label>
          <Input
            type="text"
            name="content"
            value={updatePost.content}
            onChange={onChangeContentHandler}
          />
        </div>

        <Button>수정하기</Button>
      </form>
    </div>
  );
}

export default Update;
