import React, { useState } from "react";
import { registerUser, loginUser } from "../../API/user";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../store/slices/user.js";
import axios from "axios";
import "./register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [isRegisterPage, setIsRegisterPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // React Router hook for navigation
  const navigate = useNavigate();

  // Redux hook for dispatching actions
  const dispatch = useDispatch();

  // Registration form submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validation: Check if username is long enough
      if (username.length <= 3) {
        throw new Error("Username should contain more than 3 characters");
      }

      // Start loading
      setIsLoading(true);

      // API call for registration
      const response = await axios.post(
        registerUser,
        {
          username: username,
        },
        { withCredentials: true }
      );

      // Check if registration was successful
      if (response?.data?.status === "success") {
        // Display a success toast
        toast.success("User registered successfully");

        // Dispatch action to update Redux state
        dispatch(addUser(response.data.data));

        // Navigate to the home page
        navigate("/");
      }
    } catch (error) {
      // Display an error toast
      toast.error(
        `Registration failed: ${
          error?.response?.data?.message || error.message
        }`
      );
    } finally {
      // Stop loading
      setIsLoading(false);
    }
  };

  // Login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validation: Check if username is long enough
      if (username.length <= 3) {
        throw new Error("Username should contain more than 3 characters");
      }

      // Start loading
      setIsLoading(true);

      // API call for login
      const response = await axios.get(`${loginUser}/${username}`, {
        withCredentials: true,
      });

      // Check if login was successful
      if (response?.data?.status === "success") {
        // Display a success toast
        toast.success("Logged in successfully");

        // Dispatch action to update Redux state
        dispatch(addUser(response.data.data));

        // Navigate to the home page
        navigate("/");
      }
    } catch (error) {
      // Display an error toast
      toast.error(
        `Login failed: ${error?.response?.data?.message || error.message}`
      );
    } finally {
      // Stop loading
      setIsLoading(false);
    }
  };

  return (
    <div className="register-main">
      {/* Conditional rendering based on isRegisterPage state */}

      {isRegisterPage ? (
        <section className="form">
          {/* Registration form */}
          <form onSubmit={handleRegisterSubmit}>
            {/* Input field for username */}
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {/* Display loader or registration button based on isLoading state */}

            {isLoading ? (
              <span className="loader"></span>
            ) : (
              <button type="submit" className="form-btn">
                REGISTER
              </button>
            )}
          </form>
        </section>
      ) : (
        <section className="form">
          {/* Login form */}

          <form onSubmit={handleLoginSubmit}>
            {/* Input field for username */}
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {/* Display loader or login button based on isLoading state */}

            {isLoading ? (
              <span className="loader"></span>
            ) : (
              <button type="submit" className="form-btn">
                LOGIN
              </button>
            )}
          </form>
        </section>
      )}

      {/* Button to toggle between registration and login */}

      <button
        onClick={() => setIsRegisterPage(!isRegisterPage)}
        className="nav-btn"
      >
        {isRegisterPage ? "Already user? Login" : "New user? Register"}
      </button>
    </div>
  );
};

export default Register;
