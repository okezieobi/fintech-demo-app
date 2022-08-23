export default class AppError extends Error {
  constructor(message = 'Unspecified error', type = 'App', data = {}) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
    // Custom debugging information
    this.type = type;
    this.data = {
      ...data,
      timestamp: new Date(),
    };
    // Maintains proper stack trace for where our error was thrown (only available on V8)
  }
}
