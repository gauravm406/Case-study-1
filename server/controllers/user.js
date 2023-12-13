import User from "../models/user.js";
import generateToken from "../utils/generateToken.js"; // Import or define this function

export const registerUser = async (req, res) => {
  const { username } = req.body;

  try {
    // Check if the user with the given username already exists
    const userExists = await User.findOne({ username });

    // If user exists, throw an error
    if (userExists) {
      return res.status(400).json({
        status: "exists",
        message: "User already exists choose different username",
      });
    }

    // Creating a new user
    const user = await User.create({
      username,
    });

    // If user creation is successful
    if (user) {
      // Generate a token for the new user
      generateToken(res, user._id);

      // Send user details and token as response
      res.status(201).json({
        status: "success",
        message: "User created successfully",
        data: { username: user.username, _id: user._id },
      });
    } else {
      // Unable to create user, throw an error
      res.status(400).json({ status: "error", message: "Invalid user data" });
    }
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

// auth user
export const authUser = async (req, res) => {
  const { username } = req.params;

  try {
    // find user
    const user = await User.findOne({ username: username });

    if (user) {
      // generate token
      generateToken(res, user._id);

      res.status(200).json({
        status: "success",
        message: "Logged in successfully",
        data: { username: user.username, _id: user._id },
      });
    } else {
      // User not found, return an error response
      res.status(404).json({ status: "error", message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

// logout
export const logoutUser = async (req, res) => {
  res
    .clearCookie("jwt")
    .status(200)
    .json({ status: "success", message: "Logged out successfully" });
};
