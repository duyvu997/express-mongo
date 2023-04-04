import {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  CONFLICT,
  NOT_FOUND,
  UNPROCESSABLE,
  GENERIC_ERROR,
} from '../common/error-utils';

const unauthorized = (err, req, res, next) => {
  if (err.status !== UNAUTHORIZED) return next(err);

  res.status(UNAUTHORIZED).send({
    ok: false,
    message: err.message || 'Unauthorized',
    errors: [err],
  });
};

const forbidden = (err, req, res, next) => {
  if (err.status !== FORBIDDEN) return next(err);

  res.status(FORBIDDEN).send({
    ok: false,
    message: 'Forbidden',
    errors: [err.message],
  });
};

const conflict = (err, req, res, next) => {
  if (err.status !== CONFLICT) return next(err);

  res.status(CONFLICT).send({
    ok: false,
    message: err.message || 'Conflict',
  });
};

const badRequest = (err, req, res, next) => {
  if (err.status !== BAD_REQUEST) return next(err);

  res.status(BAD_REQUEST).send({
    ok: false,
    message: err.message || 'Bad request',
  });
};

const unprocessable = (err, req, res, next) => {
  if (err.status !== UNPROCESSABLE) return next(err);

  res.status(UNPROCESSABLE).send({
    ok: false,
    message: err.message || 'Unprocessable entity',
  });
};

// If there's nothing left to do after all this (and there's no error),
// return a 404 error.
const notFound = (err, req, res, next) => {
  if (err.status !== NOT_FOUND) return next(err);

  res.status(NOT_FOUND).send({
    ok: false,
    message: err.message || 'The requested resource could not be found',
  });
};

// If there's still an error at this point, return a generic 500 error.
const genericError = (err, req, res, next) => {
  console.log(err);
  res.status(GENERIC_ERROR).send({
    ok: false,
    message: err.message || 'Internal server error',
  });
};

// If there's nothing left to do after all this (and there's no error),
// return a 404 error.
const catchall = (req, res, next) => {
  res.status(NOT_FOUND).send({
    ok: false,
    message: 'The requested resource could not be found',
  });
};

const exportableHandlers = {
  unauthorized,
  forbidden,
  conflict,
  badRequest,
  unprocessable,
  notFound,
  genericError,
  catchall,
};

// All exportable stored as an array (e.g., for including in Express app.use())
export const errorHandler = Object.keys(exportableHandlers).map(
  (key) => exportableHandlers[key]
);
