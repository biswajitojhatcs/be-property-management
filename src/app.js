import express from "express";
import userRouter from "./modules/auth/auth.routes.js";
import globalErrorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Hello World!");
});

app.use("/auth", userRouter);

app.use(globalErrorHandler);

export default app;
