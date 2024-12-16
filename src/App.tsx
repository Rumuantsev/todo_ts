import React from "react";
import TodoList from "./presentation/components/TodoList";
import "./style.css";

// Указываем тип компонента
const App: React.FC = () => {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
};

export default App;
