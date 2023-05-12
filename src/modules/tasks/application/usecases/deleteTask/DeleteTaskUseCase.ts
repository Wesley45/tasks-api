import { NotFoundError } from "../../../../../shared/errors/NotFoundError";
import { IDatabase } from "../../../../../shared/infra/database/database.interface";
import { Task } from "../../../domain/entities/task";

import {
  DeleteTaskOutputDto,
  DeleteTaskInputDto,
} from "../../dtos/DeleteTask.dto";

export class DeleteTaskUseCase {
  constructor(private database: IDatabase<Task>) {}

  public execute(input: DeleteTaskInputDto): DeleteTaskOutputDto {
    let task = this.database.find("tasks", input.id);

    if (!task) {
      throw new NotFoundError("Task not found");
    }

    this.database.delete("tasks", input.id);
  }
}
