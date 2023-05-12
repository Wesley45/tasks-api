import { IDatabase } from "../../../../../shared/infra/database/database.interface";
import { Task } from "../../../domain/entities/task";
import {
  CreateTaskInputDto,
  CreateTaskOutputDto,
} from "../../dtos/CreateTask.dto";
import { TaskOutputMapper } from "../../mappers/task.mapper";

export class CreateTaskUseCase {
  constructor(private database: IDatabase<Task>) {}

  public execute(input: CreateTaskInputDto): CreateTaskOutputDto {
    const task = new Task({
      title: input.title,
      description: input.description,
    });

    const taskCreated = this.database.insert("tasks", task);

    return TaskOutputMapper.toJson(taskCreated);
  }
}
