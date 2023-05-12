import { TaskOutputDto } from "./task.output.dto";

export type ListTasksInputDto = {
  title?: string;
  description?: string;
};

export type ListTasksOutputDto = {
  tasks: TaskOutputDto[];
};
