import express from "express";
import authRouter from "./modules/auth/auth.routes.js";
import propertiesRouter from "./modules/properties/property.routes.js";
import globalErrorHandler from "./middlewares/error.middleware.js";
import { authenticate } from "./middlewares/auth.middleware.js";
import locationsRouter from "./modules/locations/location.routes.js";
import uploadDir from "./config/storage.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Hello World!");
});

app.use("/auth", authRouter);

app.use("/files", express.static(uploadDir));

app.use(authenticate);

app.use("/properties", propertiesRouter);

app.use("/locations", locationsRouter);

app.use(globalErrorHandler);

export default app;
