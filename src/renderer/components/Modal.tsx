import React from 'react';

type ModalProps = {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onCancel: () => void;
  onSubmit: () => void;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  children,
  onCancel,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4 bg-gray-800 text-white p-6">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button className="text-white hover:text-gray-700" onClick={onCancel}>
            &times;
          </button>
        </div>

        {/* Modal Content */}
        <div className="mb-4 p-6">{children}</div>

        {/* Modal Footer */}
        <div className="flex justify-end space-x-3 p-6 pt-0">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
