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
      content: "항리갈리할리갈리항리",
    },
  ],
  isLoading: false,
  isError: false,
  error: null,
  post: {
    id: 0,
    title: "",
    level: "",
    time: "",
    minperson: 0,
    maxperson: 0,
    image: "",
    content: "",
  },
};

//get postList - Home
export const __getPostList = createAsyncThunk(
  "getPostList",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3001/posts");
      //나중에 서버 연결하면 posts/list로 변경할것
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
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//Detail.jsx
export const __getPostId = createAsyncThunk(
  "getPostId",
  async (payload, thunkAPI) => {
    // console.log(payload);
    try {
      const response = await axios.get(
        `http://localhost:3001/posts/${payload}`
      );
      // `http://localhost:3001/posts/detail/${payload}`로 변경할것
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//update post - put
export const __updatePost = createAsyncThunk(
  "updatePost",
  async (payload, thunkAPI) => {
    console.log(payload, "payload");
    try {
      const response = await axios.put(
        `http://localhost:3001/posts/${payload.id}`,
        // `http://localhost:3001/posts/update/${payload.id}`
        {
          id: payload.id,
          title: payload.title,
          level: payload.level,
          time: payload.time,
          minperson: payload.minperson,
          maxperson: payload.maxperson,
          image: payload.image,
          content: payload.content,
        }
      );
      // console.log(response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//deletePost
export const __deletePost = createAsyncThunk(
  "deletePost",
  async (payload, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:3001/posts/${payload}`);
      //`http://localhost:3001/posts/delete/${payload}`로 변경할것
      return thunkAPI.fulfillWithValue(payload);
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
    //get
    [__getPostList.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__getPostList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.posts = action.payload;
    },
    [__getPostList.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
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
    //Detail.jsx - get postlist id
    [__getPostId.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__getPostId.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.post = action.payload;
    },
    [__getPostId.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    //Update.jsx - update
    [__updatePost.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__updatePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      //state.posts = 서버에서 put으로 data가 수정되고,
      //detail page로 가면 get을 이미 하고 있기때문에
      //reducer에서 별도의 설정 하지 않아도 됨.
    },
    [__updatePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    //Detail.jsx - delete
    [__deletePost.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__deletePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    [__deletePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});

export default PostSlice.reducer;
export const { addPost, getPostList, getPostId, deletePost } =
  PostSlice.actions;
