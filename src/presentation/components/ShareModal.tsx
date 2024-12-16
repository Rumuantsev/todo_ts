import React from "react";

interface ShareModalProps {
  isVisible: boolean;
  onClose: () => void;
  shareText: string;
}

const ShareModal: React.FC<ShareModalProps> = ({
  isVisible,
  onClose,
  shareText,
}) => {
  if (!isVisible) return null;

  const links: Array<{ img: string; alt: string }> = [
    { img: "/src/presentation/images/ic_copy.svg", alt: "Copy" },
    { img: "/src/presentation/images/ic_vk.svg", alt: "VK" },
    { img: "/src/presentation/images/ic_telegram.svg", alt: "Telegram" },
    { img: "/src/presentation/images/ic_whatsapp.svg", alt: "WhatsApp" },
    { img: "/src/presentation/images/ic_facebook.svg", alt: "Facebook" },
  ];

  const handleShare = () => {
    navigator.clipboard.writeText(shareText);
    onClose();
  };

  return (
    <div className="modal share_modal">
      <div className="share_modal_content">
        <div className="share_modal_buttons">
          {links.map((link) => (
            <button key={link.alt} onClick={() => handleShare()}>
              <img src={link.img} alt={link.alt} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
