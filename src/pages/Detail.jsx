import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

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

  const onClickDeleteHandler = (id) => {
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

  return (
    <>
      <Link to={"/"}>홈 - header로 바꾸기</Link>
      <StDetailComponentLayout>
        <StDetailComponent>
          {/* <div>{id}: 확인용.없앨예정</div> */}
          <StDetailGameInfo>
            <StDetailImg>
              <img
                style={{ width: "300px", height: "300px" }}
                src={post.image}
                alt="게임 이미지"
              />
            </StDetailImg>
            <StDetailInformation>
              <DetailTitle>{post.title}</DetailTitle>
              <DetailLevelTimePerson>
                <div>난이도: {post.level}</div>
                <div>소요시간: {post.time}분</div>
                <div>
                  인원: {post.minperson} ~ {post.maxperson}명
                </div>
              </DetailLevelTimePerson>
              <DetailBtn>
                <Link to={"/update"} key={post.id}>
                  <Button>수정하기</Button>
                </Link>
                <Button onClick={() => onClickDeleteHandler(id)}>
                  삭제하기
                </Button>
              </DetailBtn>
            </StDetailInformation>
          </StDetailGameInfo>
          <StDetailGameContent>
            <div>진행 방법</div>
            <PostContent>{post.content}</PostContent>
          </StDetailGameContent>
        </StDetailComponent>
      </StDetailComponentLayout>
    </>
  );
}

export default Detail;

const StDetailComponentLayout = styled.div`
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

const StDetailComponent = styled.div`
  display: flex;
  flex-direction: column;

  width: 1000px;
  height: 800px;
`;

const StDetailGameInfo = styled.div`
  display: flex;
  margin-bottom: 40px;
  justify-content: space-around;
`;

const StDetailInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const StDetailImg = styled.div`
  /* background-color: green; */
`;

const StDetailGameContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 0px 50px;
`;

const DetailTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

const DetailLevelTimePerson = styled.div`
  display: flex;
  gap: 80px;
`;

const DetailBtn = styled.div`
  display: flex;
  gap: 30px;
`;

const PostContent = styled.div`
  font-size: 23px;
  width: 900px;
  height: 350px;
  border: 2px solid #6e6d6d14;
  border-radius: 10px;
  padding: 10px;
  letter-spacing: 1px;
  line-height: 1.5;
`;
