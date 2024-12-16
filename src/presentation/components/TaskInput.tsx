import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/tasksSlice";

const TaskInput = () => {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (title.trim() === "" || about.trim() === "") {
      alert("Поля не должны быть пустыми.");
      return;
    }
    const newTask = {
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
