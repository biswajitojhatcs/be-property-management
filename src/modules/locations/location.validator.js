import z from "zod";

export const cityParamsSchema = z.object({
  params: z.object({
    stateId: z.coerce.number({ error: "State id must be a valid number." }),
  }),
});
