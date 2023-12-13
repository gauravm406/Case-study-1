import mongoose from "mongoose";

// Define a schema for users
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true, // Username is required
  },
});

// Create a Mongoose model for users using the userSchema
const User = mongoose.model("User", userSchema);

// Export the User model
export default User;
