import * as propertyService from "./property.service.js";
import states from "../../../data/india_states_uts.json" with { type: "json" };
import cities from "../../../data/india_cities.json" with { type: "json" };
import { Role, Status } from "../../../generated/prisma/enums.ts";

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
    message: "Property added successfully.",
    data: property,
  });
};

export const updatePropertyStatus = async (req, res) => {
  const { status } = req.validated.body;
  const { id, role } = req.user;
  if (role === Role.ADMIN && status === Status.CANCELLED) {
    return res.status(403).json({ message: "Admin can not cancel." });
  } else if (
    role === Role.PROPERTY_OWNER &&
    [Status.APPROVED, Status.REJECTED].includes(status)
  ) {
    return res
      .status(403)
      .json({ message: "Property Owner can not Approve or Reject." });
  }
  const property = await propertyService.updatePropertyStatus({
    propertyId: req.validated.body.propertyId,
    status: req.validated.body.status,
    userRole: role,
    userId: id,
  });
  res
    .status(200)
    .json({ message: "Status updated successfully.", data: property });
};
