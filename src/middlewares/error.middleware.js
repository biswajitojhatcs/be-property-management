import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { UNIQUE_CONSTRAINT_MESSAGES } from "../utils/messages.utils.js";

const globalErrorHandler = (err, _req, res, _next) => {
  if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
    const model = err.meta?.modelName;
    const target = err.meta?.driverAdapterError?.cause?.constraint?.index;
    return res
      .status(400)
      .json({ message: UNIQUE_CONSTRAINT_MESSAGES[`${model}_${target}`] });
  }
  res.status(500).json({ message: err.message });
};

export default globalErrorHandler;
