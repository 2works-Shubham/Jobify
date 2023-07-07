import express from "express";
// import cors from 'cors'
import connectDB from "./db/connect.js";
const app = express();
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

//Router
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobRoutes.js";

//Middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from './middleware/auth.js'

//comment bcoz proxy is used
// app.use(cors());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.json({ aa: "data fetch success" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
