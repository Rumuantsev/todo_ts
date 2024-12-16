import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./presentation/store/store";
import App from "./App";

const root = document.getElementById("root") as HTMLElement;

if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}
