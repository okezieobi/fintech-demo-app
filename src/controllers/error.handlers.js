import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { ValidationError } from 'class-validator';

const errorMarkers = {
  status: 'error',
  isClient: true,
  timestamp: new Date(),
};

const handleJwtError = (err, { headers }, res, next) => {
  if (err instanceof JsonWebTokenError || err instanceof TokenExpiredError) {
    res.status(401);
    next({
      isClient: errorMarkers.isClient,
      response: {
        status: errorMarkers.status,
        message: err.message,
        data: {
          name: err.name,
          param: 'token',
          location: 'headers',
          value: headers.token,
          msg: 'Verification of jwt failed',
          timestamp: errorMarkers.timestamp,
        },
      },
    });
  } else next(err);
};

const handleValidationError = (err, req, res, next) => {
  if (err[0] instanceof ValidationError) {
    res.status(400);
    next({
      isClient: errorMarkers.isClient,
      response: {
        status: errorMarkers.status,
        message: err.message ?? 'Validation failed',
        data: { type: 'ValidationError', ...err, timestamp: errorMarkers.timestamp },
      },
    });
  } else next(err);
};

const handleCustomError = (err, req, res, next) => {
  const error = { status: errorMarkers.status, message: err.message, data: err.data };
  switch (err.type) {
    case 'Argument':
      res.status(400);
      next({ isClient: errorMarkers.isClient, response: error });
      break;
    case 'Query':
      res.status(404);
      next({ isClient: errorMarkers.isClient, response: error });
      break;
    case 'Authorization':
      res.status(401);
      next({ isClient: errorMarkers.isClient, response: error });
      break;
    default:
      next(err);
  }
};

const dispatchClientError = ((err, req, res, next) => {
  if (err.isClient) res.send(err.response);
  else next(err);
});

export default [
  handleJwtError,
  handleValidationError,
  handleCustomError,
  dispatchClientError];
