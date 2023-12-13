import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Retrieve the MongoDB URI from the environment variables
const MONGO_URI = process.env.MONGO_URI;

// Function to connect to the MongoDB database
export const connectToDatabase = async () => {
  try {
    //   connect to the MongoDB database
    await mongoose.connect(MONGO_URI);

    // message indicating successful database connection
    console.log("Database connected successfully");
  } catch (error) {
    // error message if the connection attempt fails
    console.error(`Error: ${error.message}`);

    // Terminate the application process with an exit code of 1
    process.exit(1);
  }
};
