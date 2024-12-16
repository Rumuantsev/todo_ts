import storage from "../data/LocalTaskStorage.js";

class TaskManager {
  constructor() {
    this.repository = storage;
  }

  addTask(task) {
    return this.repository.addTask(task);
  }

  getTask(taskId) {
    return this.repository.getTask(taskId);
  }

  getTasks() {
    return this.repository.getTasks();
  }

  deleteTask(taskId) {
    this.repository.deleteTask(taskId);
  }

  editTask(taskId, updatedTask) {
    this.repository.editTask(taskId, updatedTask);
  }
}

const taskManager = new TaskManager();
export default taskManager;
