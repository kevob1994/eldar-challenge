import { IPost, TCreatePostType } from "@interfaces";
import apiInstance from "./config-api";

export const GetPostsService = async (token: string): Promise<IPost[]> => {
  const response = await apiInstance.get<IPost[]>('/posts', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createPostService = async (newPost: TCreatePostType, token: string) => {
  const response = await apiInstance.post('/posts', newPost, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updatePostService = async (updatedPost: IPost, token: string) => {
  const response = await apiInstance.put(`/posts/${updatedPost.id}`, updatedPost, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deletePostService = async (id: number, token: string) => {
  await apiInstance.delete(`/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return id;
};