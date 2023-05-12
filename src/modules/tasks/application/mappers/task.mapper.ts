import { Task } from "../../domain/entities/task";

export class TaskOutputMapper {
  static toJson(task: Task) {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      completed_at: task.completedAt,
      created_at: task.createdAt,
      updated_at: task.updatedAt,
    };
  }
}
