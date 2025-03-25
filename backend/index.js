import express from "express";
import dotenv from "dotenv";
import { Dbconfig } from "./config/dbconfig.js";
import userRouter from "./routes/user.route.js";
import dynamicRouter from "./routes/dynamic.route.js"
import cors from "cors";
dotenv.config();
const app = express();
// CORS Configuration
const corsOptions = {
  origin: [
    'http://localhost:5173', // Frontend URL
    'http://localhost:5174', // Admin URL (if you want to allow requests to admin)
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
const PORT = process.env.PORT || "3000";
app.use(express.json());
app.use(cors(corsOptions));
app.use("/user", userRouter);
app.use("/dynamic",dynamicRouter)
app.listen(PORT, () => {
  Dbconfig();
  console.log(`server is running on port ${PORT}`);
});
