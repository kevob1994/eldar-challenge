import { IPost, TCreatePostType } from "@interfaces";
import { RootState } from "@redux/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPostService,
  deletePostService,
  GetPostsService,
  updatePostService,
} from "@services";

interface IPostState {
  posts: IPost[];
  loading: boolean;
  error: string | null;
}

const initialState: IPostState = {
  posts: [],
  loading: false,
  error: null,
};

const getAuthToken = (getState: () => RootState) => getState().auth.token;

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { getState }) => {
    const token = getAuthToken(getState as () => RootState);
    const response = await GetPostsService(token || "");
    return response;
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (newPost: TCreatePostType, { getState }) => {
    const token = getAuthToken(getState as () => RootState);
    const response = await createPostService(newPost, token || "");
    return response;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (updatedPost: IPost, { getState }) => {
    const token = getAuthToken(getState as () => RootState);
    const response = await updatePostService(updatedPost, token || "");
    return response;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: number, { getState }) => {
    const token = getAuthToken(getState as () => RootState);
    const response = await deletePostService(id, token || "");
    return response;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al obtener los posts";
      });

    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al crear el post";
      });

    builder
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al actualizar el post";
      });

    builder
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al eliminar el post";
      });
  },
});

export default postSlice.reducer;
