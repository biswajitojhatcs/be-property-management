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
