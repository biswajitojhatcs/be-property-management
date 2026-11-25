import { Role, Status } from "../../../generated/prisma/enums.ts";
import * as propertyRepository from "./property.repository.js";
import states from "../../../data/india_states_uts.json" with { type: "json" };
import cities from "../../../data/india_cities.json" with { type: "json" };

export const getAllProperties = async ({ userId, userType }) => {
  let properties = [];
  if (userType === Role.ADMIN) {
    properties = await propertyRepository.getAll();
  } else if (userType === Role.PROPERTY_OWNER) {
    properties = await propertyRepository.getAllForPropertyOwner(userId);
  } else {
    properties = await propertyRepository.getAllForCustomer();
  }

  return properties.map((property) => {
    const { cityId, stateId, ...rest } = property;
    return {
      ...rest,
      state: states.find((item) => item.id === stateId),
      city: cities.find((item) => item.id === cityId),
    };
  });
};

export const saveProperty = async (data) => {
  const property = await propertyRepository.create({
    ...data,
    status: Status.PENDING,
  });
  return property;
};
