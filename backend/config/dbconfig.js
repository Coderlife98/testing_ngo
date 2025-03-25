import mongoose from "mongoose";

export const Dbconfig = async () => {
  const mongoUrl = process.env.MONGO_URL;
  try {
    const dbconnect = await mongoose.connect(mongoUrl);
    console.log(`Db connected successfully`);
  } catch (error) {
    console.log(`Error Occur while connecting to database ${error}`);
  }
};
