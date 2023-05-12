export interface IDatabase<T> {
  select(table: string, search: any): T[];
  insert(table: string, data: T): T;
  find(table: string, id: string): T | null;
  delete(table: string, id: string): void;
  update(table: string, data: T, id: string): void;
}
