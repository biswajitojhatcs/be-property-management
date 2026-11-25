import { Router } from "express";
import { createProperty, getProperties } from "./property.controller.js";
import upload from "../../middlewares/upload.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { createPropertySchema } from "./property.validator.js";
import { authorize } from "../../middlewares/auth.middleware.js";
import { Role } from "../../../generated/prisma/enums.ts";

const router = Router();

router.get("/getAll", getProperties);
router.post(
  "/create",
  authorize([Role.PROPERTY_OWNER]),
  upload.single("file"),
  validate(createPropertySchema),
  createProperty,
);

export default router;
