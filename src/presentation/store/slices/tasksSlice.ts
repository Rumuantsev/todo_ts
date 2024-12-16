import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import taskManager from "../../../domain/TaskManager";

interface Task {
  id: number;
  title: string;
  about: string;
  isPinned: boolean;
}

type TasksState = Task[];

const tasksSlice = createSlice({
  name: "tasks",
  initialState: taskManager.getTasks() as TasksState,
  reducers: {
    setTasks: (
      state,
      action: PayloadAction<{ key: string; tasks: Task[] }>
    ) => {
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
      const taskIndex = state.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state[taskIndex] = {
          ...state[taskIndex],
          ...updatedTask,
        };
        taskManager.editTask(id, state[taskIndex]);
      }
    },

    togglePinTask: (state, action: PayloadAction<number>) => {
      const taskIndex = state.findIndex((task) => task.id === action.payload);
      if (taskIndex !== -1) {
        const pinnedTasks = state.filter((task) => task.isPinned).length;
        if (pinnedTasks < 3 || state[taskIndex].isPinned) {
          state[taskIndex].isPinned = !state[taskIndex].isPinned;
        }
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

export const {
  setTasks,
  addTask,
  deleteTask,
  editTask,
  reorderTasks,
  togglePinTask,
} = tasksSlice.actions;
export default tasksSlice.reducer;
