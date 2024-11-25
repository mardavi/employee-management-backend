class HttpError extends Error {
    constructor(message, errorCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  module.exports = HttpError;