import { randomUUID } from "node:crypto";
import { TaskOutputMapper } from "../../application/mappers/task.mapper";
import { EntityValidationError } from "../../../../shared/errors/ValidationError";

export type TaskProps = {
  id?: string;
  title: string;
  description: string;
  completed_at?: Date | null;
  created_at?: Date;
  updated_at?: Date | null;
};

export class Task {
  private _id: string;
  private _title: string;
  private _description: string;
  private _completed_at: Date | null;
  private _created_at: Date;
  private _updated_at: Date | null;

  constructor(props: TaskProps) {
    Task.validate({
      title: props.title,
      description: props.description,
    });
    this._id = props.id ?? randomUUID();
    this._title = props.title;
    this._description = props.description;
    this._completed_at = props.completed_at ?? null;
    this._created_at = props.created_at ?? new Date();
    this._updated_at = props.updated_at ?? null;
  }

  public get id(): string {
    return this._id;
  }

  public get title(): string {
    return this._title;
  }

  public get description(): string {
    return this._description;
  }

  public get completedAt(): Date | null {
    return this._completed_at;
  }

  public get createdAt(): Date {
    return this._created_at;
  }

  public get updatedAt(): Date | null {
    return this._updated_at;
  }

  public toJson() {
    return TaskOutputMapper.toJson(this);
  }

  static validate(props: { title: string; description: string }): void {
    if (!props.title) {
      throw new EntityValidationError("Title is required");
    }

    if (!props.description) {
      throw new EntityValidationError("Description is required");
    }

    if (props.title.length === 0) {
      throw new EntityValidationError("Title is not empty");
    }

    if (props.description.length === 0) {
      throw new EntityValidationError("Description is not empty");
    }
  }
}
