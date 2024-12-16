import { LocalTaskStorage, storage } from "../data/LocalTaskStorage";

interface Task {
  id: number;
  title: string;
  about: string;
  isPinned: boolean;
}

class TaskManager {
  public repository: LocalTaskStorage;

  constructor() {
    this.repository = storage;
  }

  addTask(task: Omit<Task, "id">): Task {
    return this.repository.addTask(task);
  }

  getTask(taskId: number): Task | undefined {
    return this.repository.getTask(taskId);
  }

  getTasks(): Task[] {
    return this.repository.getTasks();
  }

  deleteTask(taskId: number): void {
    this.repository.deleteTask(taskId);
  }

  editTask(taskId: number, updatedTask: Omit<Task, "id">): Task | undefined {
    return this.repository.editTask(taskId, updatedTask);
  }

  pinTask(taskId: number): Task | undefined {
    const task = this.getTask(taskId);
    if (task) {
      const updatedTask = { ...task, isPinned: true };
      return this.editTask(taskId, updatedTask);
    }
    return undefined;
  }

  unpinTask(taskId: number): Task | undefined {
    const task = this.getTask(taskId);
    if (task) {
      const updatedTask = { ...task, isPinned: false };
      return this.editTask(taskId, updatedTask);
    }
    return undefined;
  }
}

const taskManager = new TaskManager();
export default taskManager;
