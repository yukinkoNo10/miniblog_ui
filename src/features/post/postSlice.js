import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const fetchAsyncGetPost = createAsyncThunk("posts/get", async (id) => {
  const response = await axios.get(`${apiBaseUrl}/posts/${id}`);
  return response.data;
});

export const fetchAsyncGetPosts = createAsyncThunk("post/list", async () => {
  const response = await axios.get(`${apiBaseUrl}/posts/all`);
  return response.data;
});

export const fetchAsyncNewPost = createAsyncThunk(
  "post/post",
  async (inputPost) => {
    const response = await axios.post(`${apiBaseUrl}/posts/`, inputPost, {
      headers: { Content_Type: "application/json" },
    });
    return response.data;
  }
);

export const fetchAsyncUpdatePost = createAsyncThunk(
  "post/put",
  async (inputPost) => {
    const response = await axios.put(`${apiBaseUrl}/posts/${inputPost.id}`, inputPost, {
      headers: { Content_Type: "application/json" },
    });
    return response.data;
  }
);

export const fetchAsyncDeletePost = createAsyncThunk(
  "post/delete",
  async (id) => {
    const response = await axios.delete(`${apiBaseUrl}/posts/${id}`);
    return response.data;
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState: {
    currentPost: {
      id: null,
      title: "",
      body: "",
      author: "",
    },
    posts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetPost.fulfilled, (state, action) => {
      return {
        ...state,
        currentPost: action.payload,
      };
    });
    builder.addCase(fetchAsyncGetPosts.fulfilled, (state, action) => {
      return {
        ...state,
        posts: action.payload === null ? [] : action.payload,
      };
    });
    builder.addCase(fetchAsyncNewPost.fulfilled, (state, action) => {
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    });
    builder.addCase(fetchAsyncUpdatePost.fulfilled, (state, action) => {
      console.log(action.payload);
      let posts = state.posts.filter((post) => post.id !== action.payload.id);
      posts = [...posts, action.payload];
      return {
        ...state,
        posts: posts,
      };
    });
    builder.addCase(fetchAsyncDeletePost.fulfilled, (state, action) => {
      const posts = state.posts.filter((post) => post.id !== action.payload.id);
      return {
        ...state,
        posts: posts,
      };
    });
  },
});

export const initCurrentPost = postSlice.actions;
export const selectPost = (state) => state.post.currentPost;
export const selectPosts = (state) => state.post.posts;

export default postSlice.reducer;
