import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [
    {
      id: 0,
      title: "할리갈리",
      level: "하",
      time: 5,
      minperson: 2,
      maxperson: 3,
      image:
        "http://redbutton.co.kr/wp-content/uploads/2021/04/1%EC%95%84%EB%B0%9c.png",
      content:
        "항리갈리할리갈리항리갈리할리갈리항리갈리할리갈리항리갈리할리갈리",
    },
  ],
};

//get postList - Home
export const __getPostList = createAsyncThunk(
  "getPostList",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3001/posts/list");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//create post
export const __addPost = createAsyncThunk(
  "addPost",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:3001/posts", {
        id: payload.id,
        title: payload.title,
        level: payload.level,
        time: payload.time,
        minperson: payload.minperson,
        maxperson: payload.maxperson,
        image: payload.image,
        content: payload.content,
      });
      // console.log(response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const PostSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    //create
    [__addPost.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__addPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.posts = [...state.posts, action.payload];
    },
    [__addPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});

export default PostSlice.reducer;
export const { addPost } = PostSlice.actions;
