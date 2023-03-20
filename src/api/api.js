import axios from "axios";
import { cookies } from "../shared/cookie";

export const api = axios.create({ baseURL: process.env.REACT_APP_API });

const token = cookies.get("token");

// 쿠키 내보내기
export const apis = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    authorization: `Bearer ${token}`,
  },
});

export default apis;
