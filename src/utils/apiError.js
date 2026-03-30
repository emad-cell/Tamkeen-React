export const handleApiError = (error) => {
  const errors = error.response?.data?.data;
  console.log(errors)

  if (Array.isArray(errors)) {
    console.log(errors);
    return errors.join(", ");
  }
  return error.response?.data?.msg || "Unexpected Error, Please Try Again";
};