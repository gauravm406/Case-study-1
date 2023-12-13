import mongoose from "mongoose";

// Define a schema for posts
const postSchema = mongoose.Schema({
  post: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // Reference to the User model
  },
  username: {
    type: String,
    required: true,
  },
  comments: [
    {
      username: {
        type: "String",
      },
      text: {
        type: "String",
      },
    },
  ],
});

// Create a Mongoose model for posts using the postSchema
export const Post = mongoose.model("Post", postSchema);
