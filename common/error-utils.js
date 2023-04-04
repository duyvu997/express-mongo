export const createError = (status = 500, message = 'Something went wrong') => {
  const error = new Error(message);
  error.status = status;

  return error;
};

export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const FORBIDDEN = 403;
export const CONFLICT = 409;
export const NOT_FOUND = 404;
export const UNPROCESSABLE = 422;
export const GENERIC_ERROR = 500;
export const NO_CONTENT = 204;
