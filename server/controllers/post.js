import { Post } from "../models/posts.js";
import User from "../models/user.js";

// create post
export const createPost = async (req, res) => {
  const { text, userId } = req.body;

  try {
    // Check if the user with the given userId exists
    const userExists = await User.findOne({ _id: userId });

    if (!userExists) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    console.log(userExists);

    // Create a post associated with the user
    const post = await Post.create({
      post: text,
      user: userId,
      username: userExists.username,
    });

    if (post) {
      return res
        .status(200)
        .json({ status: "success", message: "Post created successfully" });
    } else {
      return res
        .status(400)
        .json({ status: "error", message: "Error while creating post" });
    }
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

// create comment
export const createComment = async (req, res) => {
  const { postId, text, userId } = req.body;

  try {
    // find user
    const user = await User.findOne({ _id: userId });

    // find post
    const post = await Post.findOne({ _id: postId });

    // add comment
    await post.comments.push({ text: text, username: user.username });

    // save
    await post.save();

    return res.status(200).json({
      status: "success",
      message: "Comment added",
      comments: post.comments,
    });
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

// get all posts
export const getAllPosts = async (req, res) => {
  const { searchquery } = req.params;

  try {
    let posts;

    if (searchquery !== "default") {
      /// Use a regular expression to perform a case-insensitive search
      const regex = new RegExp(searchquery, "i");

      // Find posts where the 'post' field matches the searchQuery
      // or where any comment's 'text' field matches the searchQuery
      posts = await Post.find({
        $or: [
          { post: { $regex: regex } },
          { "comments.text": { $regex: regex } },
        ],
      });
    } else {
      // find all posts
      posts = await Post.find({});
    }

    res.status(200).json({ posts });
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

// get all comments from current post
export const getPostAllComments = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.find({ _id: postId });

    const comments = post[0].comments;

    if (post) {
      return res.status(200).json({ message: "success", comments: comments });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};
