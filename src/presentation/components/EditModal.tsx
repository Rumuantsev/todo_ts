import React, { useState } from "react";

interface EditModalProps {
  isVisible: boolean;
  onSave: (title: string, description: string) => void;
  onCancel: () => void;
  task: { title: string; about: string };
}

const EditModal: React.FC<EditModalProps> = ({
  isVisible,
  onSave,
  onCancel,
  task,
}) => {
  const [title, setTitle] = useState<string>(task ? task.title : "");
  const [description, setDescription] = useState<string>(
    task ? task.about : ""
  );

  if (!isVisible) return null;

  const handleSave = () => {
    onSave(title, description);
  };

  return (
    <div className="modal edit_modal">
      <div className="edit_modal_content">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <div className="edit_modal_buttons">
          <button className="confirm_button" onClick={onCancel}>
            Cancel
          </button>
          <button className="cancel_button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
