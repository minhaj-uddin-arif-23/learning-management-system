import mongoose from "mongoose";

const mongodb_connect = process.env.MONGODB_URI;

if (!mongodb_connect) {
  throw new Error("Please connect First .env file in mongodb");
}

async function connectToDataBase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }
  const option2 = {
    bufferCommands: false,
  };

  await mongoose.connect(mongodb_connect!, option2);
  return mongoose;
}

export default connectToDataBase;
