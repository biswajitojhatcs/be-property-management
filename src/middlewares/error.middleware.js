import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import {
  NOT_FOUND_MESSAGES,
  UNIQUE_CONSTRAINT_MESSAGES,
} from "../constants/messages.js";

const globalErrorHandler = (err, _req, res, _next) => {
  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      const model = err.meta?.modelName;
      const target = err.meta?.driverAdapterError?.cause?.constraint?.index;
      return res.status(400).json({
        message:
          UNIQUE_CONSTRAINT_MESSAGES[`${model}_${target}`] ||
          "Value already exists.",
      });
    }
    if (err.code === "P2025") {
      const model = err.meta?.modelName;
      return res
        .status(404)
        .json({ message: NOT_FOUND_MESSAGES[model] || "Not Found" });
    }
  }
  res.status(500).json({ message: err.message });
};

export default globalErrorHandler;
