import type { Task } from "./task"

export abstract class TaskRepository {
  abstract getAll(): Promise<Task[]>;
  abstract create(task: Task): Promise<boolean>;
  abstract delete(task: Task): Promise<boolean>;
}
