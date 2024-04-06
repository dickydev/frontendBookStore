import React from "react";

interface ModalProps {
  closeModal: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children, closeModal }) => {
  return (
    <div
      className="fixed inset-0 overflow-y-auto z-50 flex justify-center items-center"
      style={{ color: "black" }}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg p-6 z-50">
        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
          >
            &#10005;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
