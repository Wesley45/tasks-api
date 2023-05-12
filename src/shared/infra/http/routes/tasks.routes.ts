import { Router } from "express";
import multer from "multer";

import { CreateTaskUseCase } from "../../../../modules/tasks/application/usecases/createTask/CreateTaskUseCase";
import { DeleteTaskUseCase } from "../../../../modules/tasks/application/usecases/deleteTask/DeleteTaskUseCase";
import { ImportTaskUseCase } from "../../../../modules/tasks/application/usecases/importTask/ImportCategoryUseCase";
import { ListTasksUseCase } from "../../../../modules/tasks/application/usecases/listTasks/ListTasksUseCase";
import { UpdateTaskUseCase } from "../../../../modules/tasks/application/usecases/updateTask/UpdateTaskUseCase";
import { UpdateTaskAsCompletedUseCase } from "../../../../modules/tasks/application/usecases/updateTaskAsCompleted/UpdateTaskAsCompletedUseCase";

import { Task } from "../../../../modules/tasks/domain/entities/task";

import { Database } from "../../database/database";

const tasksRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const database = new Database<Task>();

tasksRoutes.post("/", (req, res) => {
  const { title, description } = req.body;
  const createTaskUseCase = new CreateTaskUseCase(database);
  const output = createTaskUseCase.execute({ title, description });
  return res.status(201).json(output);
});

tasksRoutes.post("/import", upload.single("file"), async (req, res) => {
  const { file } = req;
  const importTaskUseCase = new ImportTaskUseCase(database);
  if (file) {
    await importTaskUseCase.execute(file);
  }
  return res.status(201).send();
});

tasksRoutes.get("/", (req, res) => {
  const listTasksUseCase = new ListTasksUseCase(database);
  const { tasks } = listTasksUseCase.execute(req.query ?? null);
  return res.json(tasks);
});

tasksRoutes.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const updateTaskUseCase = new UpdateTaskUseCase(database);
  updateTaskUseCase.execute({ id, title, description });
  return res.status(204).send();
});

tasksRoutes.delete("/:id", (req, res) => {
  const { id } = req.params;

  const deleteTaskUseCase = new DeleteTaskUseCase(database);
  deleteTaskUseCase.execute({ id });
  return res.status(204).send();
});

tasksRoutes.patch("/:id/complete", (req, res) => {
  const { id } = req.params;

  const updateTaskAsCompletedUseCase = new UpdateTaskAsCompletedUseCase(
    database
  );
  updateTaskAsCompletedUseCase.execute({ id });
  return res.status(204).send();
});

export { tasksRoutes };
