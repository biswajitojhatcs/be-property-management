import { email, z } from "zod";
import { Role } from "../../../generated/prisma/enums.ts";

export const registerUserSchema = z.object({
  body: z.object({
    firstName: z
      .string({ error: "First name is required." })
      .trim()
      .min(2, "First name must be at least 2 characters"),
    lastName: z.string().trim().min(1, "Last name can not be empty").nullish(),
    email: z.email({ error: "Please provide a valid email." }),
    password: z
      .string({ error: "Password is required." })
      .min(5, "Password must be at least 5 characters."),
    role: z
      .enum([Role.PROPERTY_OWNER, Role.CUSTOMER], {
        error: `Role can either be ${Role.PROPERTY_OWNER} or ${Role.CUSTOMER}`,
      })
      .default(Role.CUSTOMER),
  }),
});

export const loginUserSchema = z.object({
  body: z.object({
    email: z.email({ error: "Please provide a valid email." }),
    password: z
      .string({ error: "Password is required." })
      .min(5, "Password must be at least  5 character."),
  }),
});
