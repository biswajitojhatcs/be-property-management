import { z } from "zod";
import {
  PropertyType,
  RentType,
  Status,
} from "../../../generated/prisma/enums.ts";

export const createPropertySchema = z.object({
  body: z.object({
    title: z
      .string({ error: "Title is required." })
      .trim()
      .min(3, "Title must be at least 3 characters."),
    description: z
      .string({ error: "Description is required." })
      .trim()
      .min(5, "Description must be at least 5 characters."),
    stateId: z.coerce.number({ error: "State id must be a valid number." }),
    cityId: z.coerce.number({ error: "City id must be a valid number." }),
    address: z.string().trim().min(5, "Address must be at least 5 characters."),
    price: z.coerce.number({ error: "Price must be a valid number." }),
    noOfBedrooms: z.coerce.number({
      error: "Number of bedrooms must be a valid number.",
    }),
    noOfBathrooms: z.coerce.number({
      error: "Number of bathrooms must be a valid number.",
    }),
    plotSize: z.coerce.number({
      error: "Plot size must be a valid number.",
    }),
    rentType: z.enum([RentType.DAILY, RentType.WEEKLY, RentType.MONTHLY], {
      error: `Rent type must be ${RentType.DAILY}, ${RentType.WEEKLY} or ${RentType.MONTHLY}.`,
    }),
    propertyType: z.enum(
      [
        PropertyType.RESIDENTIAL_APARTMENT,
        PropertyType.ONE_RK_OR_STUDIO_APARTMENT,
        PropertyType.INDEPENDENT_HOUSE_VILLA,
        PropertyType.BUILDER_FLOOR,
        PropertyType.SERVICED_APARTMENT,
      ],
      {
        error: `Property type must be ${PropertyType.RESIDENTIAL_APARTMENT}, ${PropertyType.ONE_RK_OR_STUDIO_APARTMENT}, ${PropertyType.INDEPENDENT_HOUSE_VILLA}, ${PropertyType.BUILDER_FLOOR} or ${PropertyType.SERVICED_APARTMENT}.`,
      },
    ),
  }),
});

export const updatePropertyStatusSchema = z.object({
  body: z.object({
    propertyId: z.number({ error: "Property id must be a number" }),
    status: z.enum([Status.APPROVED, Status.REJECTED, Status.CANCELLED], {
      error: "Please provide a valid status.",
    }),
  }),
});
