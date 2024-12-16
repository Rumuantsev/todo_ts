import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import taskManager from "../../../domain/TaskManager";

// Интерфейс задачи
interface Task {
  id: number;
  title: string;
  about: string;
}

// Интерфейс состояния задач
type TasksState = Task[];

const tasksSlice = createSlice({
  name: "tasks",
  initialState: taskManager.getTasks() as TasksState,
  reducers: {
    setTasks: (
      state,
      action: PayloadAction<{ key: string; tasks: Task[] }>
    ) => {
      // Убираем использование `repository.storageKey`, так как он может быть постоянным
      return action.payload.tasks;
    },

    addTask: (state, action: PayloadAction<Omit<Task, "id">>) => {
      const newTask = taskManager.addTask(action.payload);
      state.push(newTask);
    },

    deleteTask: (state, action: PayloadAction<number>) => {
      taskManager.deleteTask(action.payload);
      return state.filter((task) => task.id !== action.payload);
    },

    editTask: (
      state,
      action: PayloadAction<{
        id: number;
        updatedTask: Partial<Omit<Task, "id">>;
      }>
    ) => {
      const { id, updatedTask } = action.payload;
      taskManager.editTask(id, updatedTask as Omit<Task, "id">);
      const taskIndex = state.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state[taskIndex] = { ...state[taskIndex], ...updatedTask };
      }
    },

    reorderTasks: (
      state,
      action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>
    ) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [movedTask] = state.splice(sourceIndex, 1);
      state.splice(destinationIndex, 0, movedTask);
    },
  },
});

export const { setTasks, addTask, deleteTask, editTask, reorderTasks } =
  tasksSlice.actions;
export default tasksSlice.reducer;
