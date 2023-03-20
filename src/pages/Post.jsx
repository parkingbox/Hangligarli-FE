import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { __addPost } from "../redux/modules/PostSlice";
import Button from "./../components/Button";
import Input from "./../components/Input";
import useInput from "../hooks/useInput";
// import nextId from "react-id-generator";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Post() {
  // const id = nextId();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //time
  const [hour, setHour] = useState();
  const [minute, setMinute] = useState();
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

  const [post, setPost] = useState({
    // id: 0,
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
    });
  }, [title, level, time, image, minperson, maxperson, content]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(__addPost({ ...post }));
    setPost({
      title: "",
      level: "",
      time,
      minperson: 0,
      maxperson: 0,
      image: "",
      content: "",
    });
    navigate("/");
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
          <input
            type="text"
            accept="image/jpg,image/png,image/jpeg,image/gif"
            name="image"
            value={image}
            onChange={onChangeImageHandler}
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
    </div>
  );
}

export default Post;
