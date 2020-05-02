export default class EnvSanitizeError extends Error {
  constructor(m: string) {
    super(m);
    Object.setPrototypeOf(this, EnvSanitizeError.prototype);
  }
}
