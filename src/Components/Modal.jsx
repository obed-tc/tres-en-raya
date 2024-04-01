/* eslint-disable react/prop-types */
const Modal = ({ isOpen, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-black opacity-65"></div>
          </div>
          <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-xl max-w-lg w-full">
            <div className="p-6">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
