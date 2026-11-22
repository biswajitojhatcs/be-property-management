import { Router } from "express";
import { login, register } from "./auth.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import { loginUserSchema, registerUserSchema } from "./auth.validator.js";

const router = Router();

router.post("/register", validate(registerUserSchema), register);
router.post("/login", validate(loginUserSchema), login);

export default router;
