import { configureStore } from "@reduxjs/toolkit";
import posts from "../modules/PostSlice";

const store = configureStore({
  reducer: {
    posts,
  },
});

export default store;
