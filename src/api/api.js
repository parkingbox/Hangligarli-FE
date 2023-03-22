import axios from "axios";
import { cookies } from "../shared/cookie";

export const api = axios.create({ baseURL: process.env.REACT_APP_API });

//1. 로그인 하기 전, 메인페이지 띄웠을 때 = undefined
//2. 로그인 후 "쿠키에는" 토큰이 저장되어있음.
//3. 로그인 후 쿠키에 저장시킨 토큰을 get해오는 로직이 없음.

export const apis = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    Authorization: `Bearer ${cookies.get("token")}`,
  },
});

apis.interceptors.request.use(config => {
  if (config.headers.Authorization === "Bearer undefined") {
    //로그인 후에 저장되어있는 쿠키를 가져오는 로직
    const token = cookies.get("token");
    config.headers.Authorization = token;
  }
  return config;
});

export default apis;
