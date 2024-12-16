import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/tasksSlice";

// Интерфейс для задачи
interface Task {
  id: number;
  title: string;
  about: string;
}

const TaskInput: React.FC = () => {
  const [title, setTitle] = useState<string>(""); // Указываем тип для useState
  const [about, setAbout] = useState<string>(""); // Указываем тип для useState
  const dispatch = useDispatch();

  const handleAddTask = (): void => {
    // Указываем тип для функции
    if (title.trim() === "" || about.trim() === "") {
      alert("Поля не должны быть пустыми.");
      return;
    }
    const newTask: Task = {
      id: Date.now(), // Генерация уникального ID
      title,
      about,
    };
    dispatch(addTask(newTask));
    setTitle("");
    setAbout("");
  };

  return (
    <div className="input_form">
      <div className="text_forms">
        <input
          type="text"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="About..."
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
      </div>
      <div className="create_button">
        <button onClick={handleAddTask}>
          <img
            className="delete_img"
            src="/src/presentation/images/ic_create.svg"
            alt="create"
          />
        </button>
      </div>
    </div>
  );
};

export default TaskInput;
