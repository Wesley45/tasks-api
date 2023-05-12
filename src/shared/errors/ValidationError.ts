export class EntityValidationError extends Error {
  public readonly message: string;

  constructor(message: string) {
    super("Entity Validation Error");
    this.name = "EntityValidationError";
    this.message = message;
  }
}
