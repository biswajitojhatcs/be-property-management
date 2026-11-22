import { prisma } from "../../lib/prisma.js";

export const createUser = (data) => {
  return prisma.user.create({ data });
};
