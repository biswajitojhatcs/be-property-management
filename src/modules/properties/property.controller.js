import * as propertyService from "./property.service.js";
import states from "../../../data/india_states_uts.json" with { type: "json" };
import cities from "../../../data/india_cities.json" with { type: "json" };

export const getProperties = async (req, res) => {
  const property = await propertyService.getAllProperties({
    userId: req.user.id,
    userType: req.user.role,
  });
  res.status(200).json(property);
};

export const createProperty = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Please upload property picture." });
  }

  const state = states.find((item) => item.id === req.validated.body.stateId);
  const city = cities.find((item) => item.id === req.validated.body.cityId);
  if (!(state && city && city.stateId === state.id)) {
    return res
      .status(400)
      .json({ message: "Please provide valid State and City." });
  }
  const property = await propertyService.saveProperty({
    ...req.validated.body,
    imageUrl: req.file?.filename,
    createdById: req.user.id,
  });
  res.status(201).json({
    message: "file uploaded successfully.",
    data: property,
  });
};
