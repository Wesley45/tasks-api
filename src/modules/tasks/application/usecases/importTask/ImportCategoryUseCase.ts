import { parse } from "csv-parse";
import fs from "fs";

import { IDatabase } from "../../../../../shared/infra/database/database.interface";
import { Task } from "../../../domain/entities/task";

interface IImportTask {
  title: string;
  description: string;
}

export class ImportTaskUseCase {
  constructor(private database: IDatabase<Task>) {}

  public async execute(file: Express.Multer.File): Promise<void> {
    const tasks = await this.loadTasks(file);
    tasks.map(async (task) => {
      const { title, description } = task;

      this.database.insert(
        "tasks",
        new Task({
          title,
          description,
        })
      );
    });
  }

  private async loadTasks(file: Express.Multer.File): Promise<IImportTask[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const tasks: IImportTask[] = [];

      const parseFile = parse({
        from_line: 2,
      });

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line: any[]) => {
          const [title, description] = line;
          tasks.push({ title, description });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(tasks);
        })
        .on("error", (err: any) => {
          reject(err);
        });
    });
  }
}
