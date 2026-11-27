import { Role, Status } from "../../../generated/prisma/enums.ts";
import { prisma } from "../../lib/prisma.js";

export const create = async (data) => {
  const { createdById, ...payload } = data;
  const property = await prisma.property.create({
    data: {
      ...payload,
      createdBy: {
        connect: {
          id: createdById,
        },
      },
    },
  });
  return property;
};

export const getAll = async () => {
  const properties = await prisma.property.findMany({
    include: {
      createdBy: {
        select: {
          email: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
  return properties;
};

export const getAllForPropertyOwner = async (userId) => {
  const properties = await prisma.property.findMany({
    where: {
      createdById: userId || -1,
    },
  });
  return properties;
};

export const getAllForCustomer = async () => {
  const properties = await prisma.property.findMany({
    where: {
      status: Status.APPROVED,
    },
    omit: {
      status: true,
      createdById: true,
    },
  });
  return properties;
};

export const updatePropertyStatus = async ({
  propertyId,
  status,
  userRole,
  userId,
}) => {
  const property = await prisma.property.update({
    where: {
      id: propertyId,
      status: Status.PENDING,
      createdById: userRole === Role.ADMIN ? undefined : userId,
    },
    data: {
      status,
    },
  });
  return property;
};
