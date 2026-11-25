import { Status } from "../../../generated/prisma/enums.ts";
import * as propertyRepository from "./property.repository.js";

export const getAllProperties = async () => {
  const properties = await propertyRepository.getAll();
  return properties;
};

export const saveProperty = async (data) => {
  const property = await propertyRepository.create({
    ...data,
    status: Status.PENDING,
  });
  return property;
};
