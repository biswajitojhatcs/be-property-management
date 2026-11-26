import { Router } from "express";
import { getAllStates, getCitiesByStateId } from "./location.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import { cityParamsSchema } from "./location.validator.js";

const router = Router();

router.get("/stateList", getAllStates);

router.get(
  "/cityList/:stateId",
  validate(cityParamsSchema),
  getCitiesByStateId,
);

export default router;
