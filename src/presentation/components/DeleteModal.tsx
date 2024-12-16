import React from "react";

interface DeleteModalProps {
  isVisible: boolean;
  onDelete: () => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isVisible,
  onDelete,
  onCancel,
}) => {
  if (!isVisible) return null;

  return (
    <div className="modal delete_modal">
      <div className="modal_content">
        <p>Delete this task?</p>
        <div className="modal_buttons">
          <button onClick={onDelete}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
