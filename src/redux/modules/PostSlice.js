import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import apis, { api } from "../../api/api";

const initialState = {
  posts: [],
  isLoading: false,
  isError: false,
  error: null,
  //detail.jsx 상세페이지를 위한 redux state값(서버 데이터와 무관함)
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
      const response = await api.get("api/posts/list");
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
      const response = await apis.post("api/posts/", {
        title: payload.title,
        level: payload.level,
        time: payload.time,
        minperson: payload.minperson,
        maxperson: payload.maxperson,
        image: payload.image,
        content: payload.content,
      });

      if (response.status === 200) {
        alert("작성되었습니다!");
        window.location = "/";
      }

      //response.data로 저장된 data를 받아와야하는데 못 함
      // 따라서 fulfillWithValue 전에 get 요청하여 덮어주기
      const getData = await api.get("api/posts/list");
      return thunkAPI.fulfillWithValue(getData.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//Detail.jsx
export const __getPostId = createAsyncThunk(
  "getPostId",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(`api/posts/detail/${payload}`);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//update post - put
export const __updatePost = createAsyncThunk(
  "updatePost",
  async (payload, thunkAPI) => {
    try {
      const response = await apis.put(
        `api/posts/update/${payload.id}`,
        payload
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//deletePost
export const __deletePost = createAsyncThunk(
  "deletePost",
  async (payload, thunkAPI) => {
    try {
      await apis.delete(`/api/posts/delete/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
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
      state.posts = action.payload;
    },
    [__addPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = alert(action.payload.message);
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
      state.posts = state.posts.data.map(item => {
        if (item.id == action.payload.id) {
          return (item = action.payload);
        } else {
          return item;
        }
      });
    },
    [__updatePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = alert(action.payload.message);
    },
    //Detail.jsx - delete
    [__deletePost.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__deletePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.posts = state.posts.data.filter(list => list.id !== action.payload);
    },
    [__deletePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = alert(action.payload.message);
    },
  },
});

export default PostSlice.reducer;
export const { addPost, getPostList, getPostId, deletePost } =
  PostSlice.actions;
