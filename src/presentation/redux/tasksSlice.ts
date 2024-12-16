import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import taskManager from "../../domain/TaskManager";

// Определяем тип задачи
export interface Task {
  id: number;
  title: string;
  about: string;
}

// Тип начального состояния
const initialState: Task[] = taskManager.getTasks();

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (
      state,
      action: PayloadAction<{ key: string; tasks: Task[] }>
    ) => {
      taskManager.repository.storageKey = action.payload.key;
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
      action: PayloadAction<{ id: number; updatedTask: Partial<Task> }>
    ) => {
      const { id, updatedTask } = action.payload;
      taskManager.editTask(id, updatedTask);
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
      taskManager.repository.setTasks(state);
    },
  },
});

export const { setTasks, addTask, deleteTask, editTask, reorderTasks } =
  tasksSlice.actions;

export default tasksSlice.reducer;
