import React, { useEffect, useState } from "react";
import { getAllComments, createComment } from "../../API/post.js";
import { useSelector } from "react-redux";
import axios from "axios";
import "./comments.css";

const Comments = ({ postId }) => {
  const [commentsData, setCommentsData] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [hasNewCommentMade, setHasNewCommentMade] = useState(false);
  const [hasShowComments, setHasShowComments] = useState(false);

  // Get user information from Redux store
  const userInfo = useSelector((state) => state.user.userInfo);

  // useEffect to fetch comments when postId or hasNewCommentMade changes
  useEffect(() => {
    // Fetch comments function
    const fetchComments = async () => {
      try {
        // Make GET request to fetch comments for a specific postId
        const response = await axios.get(`${getAllComments}/${postId}`, {
          withCredentials: true,
        });

        // Update state with fetched comments
        setCommentsData(response.data.comments);
      } catch (error) {
        // Log any errors that occur during the fetch
        console.log(error);
      }
    };

    // If postId is available, trigger the fetchComments function
    if (postId) {
      fetchComments();
    }
  }, [postId, hasNewCommentMade]);

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();
    try {
      // Make POST request to create a new comment
      const response = await axios.post(
        createComment,
        { text: commentText, userId: userInfo._id, postId: postId },
        { withCredentials: true }
      );
      // If the comment creation is successful, trigger a state update
      if (response.data.status === "success") {
        setHasNewCommentMade((prev) => !prev);
        setCommentText("");
      }
    } catch (error) {
      // Log any errors that occur during the comment creation
      console.log(error);
    }
  };

  return (
    <div className="comments-main">
      <button
        onClick={() => setHasShowComments(!hasShowComments)}
        className="show-comments-btn"
      >
        Show Comments
      </button>

      {hasShowComments && (
        <>
          <section>
            {commentsData?.map((item, index) => (
              <p key={index}>
                <span className="comment-username">{item.username}:</span>{" "}
                <span className="comment-text">{item.text}</span>
              </p>
            ))}
          </section>

          <section className="make-comment-form">
            <form onSubmit={handleCommentSubmit}>
              <input
                type="text"
                placeholder="Comment here"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button type="submit">Comment</button>
            </form>
          </section>
        </>
      )}
    </div>
  );
};

export default Comments;
