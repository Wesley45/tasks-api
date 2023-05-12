import { readFile, writeFile } from "node:fs/promises";

import { IDatabase } from "./database.interface";

export class Database<T extends { id: string; toJson: () => any }>
  implements IDatabase<T>
{
  #database: { [key: string]: T[] } = {};

  constructor() {
    readFile("db.json", "utf8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    writeFile("db.json", JSON.stringify(this.#database));
  }

  select(table: string, search: any) {
    let data = this.#database[table] ?? [];

    if (search && Object.entries(search).length > 0) {
      data = data.filter((row: any) => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(String(value).toLowerCase());
        });
      });
    }

    return data;
  }

  find(table: string, id: string): T | null {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);
    if (rowIndex === -1) {
      return null;
    }
    return this.#database[table][rowIndex];
  }

  insert(table: string, data: T) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data.toJson());
    } else {
      this.#database[table] = [data.toJson()];
    }
    this.#persist();
    return data;
  }

  delete(table: string, id: string) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    }
  }

  update(table: string, data: T, id: string) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = data.toJson();
      this.#persist();
    }
  }
}
