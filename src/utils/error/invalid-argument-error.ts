export class InvalidArgumentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Invalid Argument Error';

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}
