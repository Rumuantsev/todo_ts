import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, editTask } from "../redux/tasksSlice";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import ShareModal from "./ShareModal";

// Описание пропсов компонента Task
interface TaskProps {
  id: string;
  title: string;
  about: string;
}

const Task: React.FC<TaskProps> = ({ id, title, about }) => {
  const dispatch = useDispatch();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [isShareModalVisible, setIsShareModalVisible] =
    useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<{
    title: string;
    about: string;
  }>({
    title,
    about,
  });

  const handleInfo = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDelete = () => {
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    dispatch(deleteTask(id));
    setIsDeleteModalVisible(false);
  };

  const cancelDelete = () => {
    setIsDeleteModalVisible(false);
  };

  const handleEdit = () => {
    setCurrentTask({ title, about });
    setIsEditModalVisible(true);
  };

  const saveEdit = (newTitle: string, newAbout: string) => {
    if (!newTitle || !newAbout) {
      alert("Поля не должны быть пустыми.");
      return;
    }
    dispatch(
      editTask({ id, updatedTask: { title: newTitle, about: newAbout } })
    );
    setCurrentTask({ title: newTitle, about: newAbout });
    setIsEditModalVisible(false);
  };

  const cancelEdit = () => {
    setIsEditModalVisible(false);
  };

  const handleShare = () => {
    setIsShareModalVisible(true);
  };

  const closeShareModal = () => {
    setIsShareModalVisible(false);
  };

  const displayedTitle = isExpanded
    ? currentTask.title
    : `${currentTask.title.slice(0, 12)}${
        currentTask.title.length > 12 ? "..." : ""
      }`;

  const displayedAbout = isExpanded
    ? currentTask.about
    : `${currentTask.about.slice(0, 19)}${
        currentTask.about.length > 19 ? "..." : ""
      }`;

  return (
    <div className="task_container" id={id}>
      <div className="task_content">
        <div className="task_text">
          <h3>{displayedTitle}</h3>
          <p>{displayedAbout}</p>
        </div>
        <div className="task_button">
          <button onClick={handleDelete}>
            <img
              className="delete_img"
              src="/src/presentation/images/ic_delete.svg"
              alt="delete"
            />
          </button>
        </div>
      </div>
      <div className="task_options">
        <div className="task_options_buttons">
          <button onClick={handleShare}>
            <img
              className="share_img"
              src="/src/presentation/images/ic_share.svg"
              alt="share"
            />
          </button>
          <button onClick={handleInfo}>
            <img
              className="info_img"
              src="/src/presentation/images/ic_info.svg"
              alt="info"
            />
          </button>
          <button onClick={handleEdit}>
            <img
              className="edit_img"
              src="/src/presentation/images/ic_edit.svg"
              alt="edit"
            />
          </button>
        </div>
      </div>

      <DeleteModal
        isVisible={isDeleteModalVisible}
        onDelete={confirmDelete}
        onCancel={cancelDelete}
      />

      <EditModal
        isVisible={isEditModalVisible}
        task={currentTask}
        onSave={saveEdit}
        onCancel={cancelEdit}
      />

      <ShareModal
        isVisible={isShareModalVisible}
        onClose={closeShareModal}
        shareText={`${currentTask.title}\n\n${currentTask.about}`}
      />
    </div>
  );
};

export default Task;
