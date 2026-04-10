import { logger } from "@/utils/logger";

export const handleApiError = (error) => {
  const errors = error.response?.data?.data;
  logger.debug("API error data:", errors);

  if (Array.isArray(errors)) {
    return errors.join(", ");
  }
  return error.response?.data?.msg || "Unexpected Error, Please Try Again";
};