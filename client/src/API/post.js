import { host } from "./host";

export const createPost = `${host}/api/post/create`;

export const createComment = `${host}/api/post/comment`;

export const getPosts = `${host}/api/post/get_all_posts`;

export const getAllComments = `${host}/api/post/get_all_comments`;
