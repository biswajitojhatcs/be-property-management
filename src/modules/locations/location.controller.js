import * as locationServcie from "./location.service.js";

export const getAllStates = (req, res) => {
  return res.status(200).json(locationServcie.getAllStates());
};

export const getCitiesByStateId = (req, res) => {
  return res
    .status(200)
    .json(locationServcie.getCitiesByStateId(req.validated.params.stateId));
};
