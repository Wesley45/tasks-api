import { TaskOutputDto } from "./task.output.dto";

export type CreateTaskInputDto = {
  title: string;
  description: string;
};

export type CreateTaskOutputDto = TaskOutputDto;
