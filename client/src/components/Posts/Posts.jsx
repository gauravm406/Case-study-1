import React, { useEffect, useState } from "react";
import { getPosts } from "../../API/post";
import Comments from "../Comments/Comments.jsx";
import axios from "axios";
import "./posts.css";

const Posts = ({ hasNewPostCreated }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [postsData, setPostsData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        // Make an API call to get posts data
        const response = await axios.get(`${getPosts}/${"default"}`, {
          withCredentials: true,
        });

        if (response?.status == 200) {
          setPostsData(response.data.posts);
        }
      } catch (error) {
        // Handle any errors that occur during the API call
        console.error("Error fetching posts data:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [hasNewPostCreated]);

  // fetch posts according to search query
  useEffect(() => {
    const debounce = setTimeout(() => {
      (async () => {
        setIsLoading(true);
        try {
          const query = searchQuery || "default";

          // Make an API call to get posts data
          const response = await axios.get(`${getPosts}/${query}`, {
            withCredentials: true,
          });

          if (response?.status == 200) {
            setPostsData(response.data.posts);
          }
        } catch (error) {
          // Handle any errors that occur during the API call
          console.error("Error fetching posts data:", error);
        } finally {
          setIsLoading(false);
        }
      })();
    }, 1000);

    return () => clearTimeout(debounce);
  }, [searchQuery]);

  return (
    <div className="post-main">
      <section className="search-bar-container">
        <input
          type="text"
          placeholder="Search posts and comments here..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </section>

      {!isLoading ? (
        <>
          {postsData !== null && postsData.length > 0 ? (
            [...postsData].reverse().map((item, index) => (
              <div key={index} className="post-container">
                <section className="post-and-make-comment-section">
                  <p>
                    <span className="username-head">{item.username}:</span>{" "}
                    <span className="posts-post-description">{item.post}</span>
                  </p>
                </section>

                <section className="comments-container">
                  <Comments postId={item._id} />
                </section>
              </div>
            ))
          ) : (
            <p>No posts found!</p>
          )}
        </>
      ) : (
        <span className="loader"></span>
      )}
    </div>
  );
};

export default Posts;
