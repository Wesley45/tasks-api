import { IDatabase } from "../../../../../shared/infra/database/database.interface";
import { Task } from "../../../domain/entities/task";

import {
  ListTasksInputDto,
  ListTasksOutputDto,
} from "../../dtos/ListTasks.dto";
import { TaskOutputMapper } from "../../mappers/task.mapper";

export class ListTasksUseCase {
  constructor(private database: IDatabase<Task>) {}

  public execute(input: ListTasksInputDto): ListTasksOutputDto {
    const tasks = this.database.select("tasks", input);

    return {
      tasks: tasks.map((task) =>
        TaskOutputMapper.toJson(
          new Task({
            id: task.id,
            title: task.title,
            description: task.description,
            // @ts-ignore
            completed_at: task["completed_at"],
            // @ts-ignore
            created_at: task["created_at"],
            // @ts-ignore
            updated_at: task["updated_at"],
          })
        )
      ),
    };
  }
}
