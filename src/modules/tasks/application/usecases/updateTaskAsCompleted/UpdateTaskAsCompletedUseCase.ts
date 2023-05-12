import { NotFoundError } from "../../../../../shared/errors/NotFoundError";
import { IDatabase } from "../../../../../shared/infra/database/database.interface";
import { Task } from "../../../domain/entities/task";

import {
  UpdateTaskAsCompletedInputDto,
  UpdateTaskAsCompletedOutputDto,
} from "../../dtos/UpdateTaskAsCompleted.dto";

export class UpdateTaskAsCompletedUseCase {
  constructor(private database: IDatabase<Task>) {}

  public execute(
    input: UpdateTaskAsCompletedInputDto
  ): UpdateTaskAsCompletedOutputDto {
    let task = this.database.find("tasks", input.id);

    if (!task) {
      throw new NotFoundError("Task not found");
    }

    // @ts-ignore
    let completed_at = task["completed_at"];
    if (completed_at) {
      completed_at = null;
    } else {
      completed_at = new Date();
    }

    task = new Task({
      id: task.id,
      title: task.title,
      description: task.description,
      completed_at: completed_at,
      // @ts-ignore
      created_at: task["created_at"],
      updated_at: new Date(),
    });

    this.database.update("tasks", task, input.id);
  }
}
