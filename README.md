# Hangligarli

> 학창시절 자주 하던 보드게임을 추천하고 전체적인 설명을 작성하는 사이트입니다.

- URL : [Hangligarli 🏠](http://hangligarli-fe-test.s3-website.ap-northeast-2.amazonaws.com/)

<br/>

### 📆 프로젝트 기간

- 2023/03/16 ~ 2023/03/23 (7일)

<br/>

### 💻 프론트엔드 기술 스택

<center>
<br/>
<div style="display: inline;">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
</div>

<div style="display: inline;">
<img src="https://img.shields.io/badge/styled_components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
<img src="https://img.shields.io/badge/axios-6236FF?style=for-the-badge&logo=axios&logoColor=white">
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
</div>

<div style="display: inline;">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"></div>
</center>
<br>

### 🔧 주요 기능

## 📝 기능 구현

### 1. 회원가입

- 회원가입 기능
- 중복 ID 체크
- 중복 닉네임 체크
- ID : 영문 숫자 유효성검사
- 닉네임 : 한글 유효성검사
- PW : 패스워드 형식 유효성 검사
- 모든 조건 충족 시 회원가입 버튼 활성화

### 2. 로그인

- 로그인 & 로그아웃 기능
- 쿠키 저장 및 로그인 상태 유지

### 3. 회원탈퇴

- 회원탈퇴 : db에 저장된 정보 삭제

### 게시글 CRUD

### 1. [CREATE]

- 포스트 작성기능
- 제목,최소 최대인원 이미지 url업로드 등 기능 구현

### 2. [READ]

- 작성된 포스트 화면에 로드

### 3. [UPDATE & DELETE]

- 로그인 정보가 없을 시 조회만 가능
- 포스트 수정 및 삭제 기능 구현
- 본인이 작성한 포스트에서만 수정/삭제 가능

<hr/>

### 💖 About Front-end

#### 👪 &nbsp; 팀원

|   이름    |          깃허브 주소          |                            역할 분담                             |
| :-------: | :---------------------------: | :--------------------------------------------------------------: |
| 👧 박승우 | https://github.com/parkingbox |         로그인 페이지 <br/>회원가입 페이지<br/>메인 헤더         |
| 👦 김재란 | https://github.com/gitjaeran  | 메인페이지 <br/> 디테일 페이지<br/>글작성 페이지<br/>수정 페이지 |

<hr/>

## 트러블 슈팅

### `CORS` 에러

- 로그인 에서 console.log(response.headers)로 출력해보면 서버에서 보낸 토큰이 없었음 하지만 네트워크쪽에 응답헤더에 보면 "Authorization"으로 토큰이 잘 들어가 있는 걸 확인
  <br/>

- CORS의 경우 기본적으로 프론트쪽에서 response header 값을 읽지 못한다고 함.
  자바스크립트 코드에서 읽을 수 없고 개발자도구 네트워크 창에서만 확인할 수 있음.
  <br/>

- `해결방법`: 백엔드에서
  기존 CORS 설정을 Configuration, Bean을 등록하는 방법으로 바꾸고 거기 origin에 관련된 설정 넣을 때 프론트쪽에서 response header를 확인할 수 있게 하는 설정을 추가

### HTTP 415 `Unsupported Media Type` 에러

- 클라이언트에서 서버로 데이터를 보낼때 Request Body에 데이터를 실어 보내는데
  서버단에서 데이터가 터미널에 찍히지 않음.
  <br/>

- 서버단에서 저장하는 컨트롤러에서 타입에 따라 클라이언트에서 보내줘야 하는 데이터의 형식이 다른 것을 알게됨.
  <br/>

- 우리의 경우 서버에서 `HashMap타입`으로 설정이 되어 있어서 `Request Body에 객체형식`으로 전달을 해줬어야 했음

### 전역 axios 설정

- `axios`는 브라우저가 실행되면 바로 생성이 되는데 이때 전역으로 만든 axios에 Request header를 넣으면 브라우저가 실행됨가 동시에 header가 선언됨

- 우리의 경우 token을 headers에 넣었는데 문제는 브라우저에서는 쿠키에 token이 저장이 되어 있는 것을 확인. 그러나 새로고침을 하지 않고 토큰을 서버에 전달해줄 작업을 하게 되면 token이 undefined가 뜨는 것을 확인

- `interceptor`를 사용하거나 post, put 을 사용할때 마다 headers를 넣어서 보내 주어야 한다는 것을 알게 됨.
