import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/slices/tasksSlice";

interface Task {
  id: number;
  title: string;
  about: string;
  isPinned: boolean;
}

const TaskInput: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const dispatch = useDispatch();

  const handleAddTask = (): void => {
    if (title.trim() === "" || about.trim() === "") {
      alert("Поля не должны быть пустыми.");
      return;
    }
    const newTask: Task = {
      id: Date.now(),
      title,
      about,
      isPinned: false,
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
