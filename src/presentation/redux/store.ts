import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice.ts";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

// Типы для состояния и диспетчера
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
