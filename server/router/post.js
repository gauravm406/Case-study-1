import express from "express";
const router = express.Router();

import {
  createComment,
  createPost,
  getAllPosts,
  getPostAllComments,
} from "../controllers/post.js";
import { protect } from "../middleware/auth.js";

router.post("/create", protect, createPost);

router.post("/comment", protect, createComment);

router.get("/get_all_posts/:searchquery", protect, getAllPosts);

router.get("/get_all_comments/:postId", protect, getPostAllComments);

export default router;
