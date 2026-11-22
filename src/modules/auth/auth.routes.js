import { Router } from "express";
import { register } from "./auth.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import { registerUserSchema } from "./auth.validator.js";

const router = Router();

router.post("/register", validate(registerUserSchema), register);

export default router;
