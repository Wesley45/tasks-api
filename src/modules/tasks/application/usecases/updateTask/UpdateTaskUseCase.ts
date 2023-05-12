import { NotFoundError } from "../../../../../shared/errors/NotFoundError";
import { IDatabase } from "../../../../../shared/infra/database/database.interface";
import { Task } from "../../../domain/entities/task";

import {
  UpdateTaskInputDto,
  UpdateTaskOutputDto,
} from "../../dtos/UpdateTask.dto";

export class UpdateTaskUseCase {
  constructor(private database: IDatabase<Task>) {}

  public execute(input: UpdateTaskInputDto): UpdateTaskOutputDto {
    let task = this.database.find("tasks", input.id);

    if (!task) {
      throw new NotFoundError("Task not found");
    }

    task = new Task({
      id: task.id,
      title: input.title,
      description: input.description,
      // @ts-ignore
      completed_at: task["completed_at"],
      // @ts-ignore
      created_at: task["created_at"],
      updated_at: new Date(),
    });

    this.database.update("tasks", task, input.id);
  }
}
