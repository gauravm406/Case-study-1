import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../../API/post.js";
import { toast } from "react-toastify";
import axios from "axios";
import "./home.css";
import Posts from "../../components/Posts/Posts.jsx";
import { removeUser } from "../../store/slices/user.js";
import { logoutUser } from "../../API/user.js";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [postText, setPostText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewPostCreated, setHasNewPostCreated] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Select user information from the Redux state
  const userInfo = useSelector((state) => state.user.userInfo);

  // Handle form submission for creating a post
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if the post text meets the minimum length requirement
      if (postText.length <= 3) {
        throw new Error("Post should contain more than 3 characters");
      }
      // Start loading to indicate that the post creation is in progress
      setIsLoading(true);
      // Make an API call to create a new post
      const response = await axios.post(
        createPost,
        {
          text: postText,
          userId: userInfo?._id,
        },
        { withCredentials: true }
      );
      // Check if the post creation was successful based on the response status
      if (response?.data?.status === "success") {
        // Display a success toast message if the post is created successfully
        toast.success("Post created successfully");
        // Clear the post text input after successful creation
        setPostText("");

        setHasNewPostCreated(!hasNewPostCreated);
      }
    } catch (error) {
      toast.error(
        `Post failed: ${error?.response?.data?.message || error.message}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(logoutUser, { withCredentials: true });

      if (response.data.status == "success") {
        dispatch(removeUser());

        navigate("/register");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home-main">
      <nav className="home-nav">
        <h3>Welcome {userInfo?.username}</h3>
        <button className="nav-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <section className="home-form-container">
        <form onSubmit={handlePostSubmit}>
          <input
            type="text"
            placeholder="What's happening today...."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          <div className="post-btn-container">
            <button className="post-btn" type="submit">
              {isLoading ? <span className="post-loader"></span> : "POST"}
            </button>
          </div>
        </form>
      </section>

      <section className="home-posts">
        <Posts hasNewPostCreated={hasNewPostCreated} />
      </section>
    </div>
  );
};

export default Home;
