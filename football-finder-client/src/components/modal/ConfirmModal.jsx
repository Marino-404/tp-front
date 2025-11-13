import { useEffect } from "react";
import ReactDOM from "react-dom";
import Button from "../styles/Button";
import RedButton from "../styles/RedButton";
import { AiOutlineClose } from "react-icons/ai";
import { useAppContext } from "../../context/AppContext";

const ConfirmModal = ({
  isOpen,
  title,
  message,
  onCancel,
  onConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}) => {
  const { theme } = useAppContext();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  if (!isOpen) return null;

  const modalBg =
    theme === "dark"
      ? "bg-white/10 border border-white/20 backdrop-blur-md text-white"
      : "bg-white border border-gray-200 shadow-lg text-gray-800";

  const overlayBg =
    theme === "dark"
      ? "bg-black/40 backdrop-blur-sm"
      : "bg-gray-500/20 backdrop-blur-sm";

  const titleColor = theme === "dark" ? "text-white" : "text-gray-900";

  const messageColor = theme === "dark" ? "text-gray-300" : "text-gray-700";

  const closeBtnColor =
    theme === "dark"
      ? "text-gray-300 hover:text-white"
      : "text-gray-500 hover:text-gray-700";

  const modalContent = (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${overlayBg}`}
    >
      <div
        className={`relative flex flex-col items-center rounded-xl py-24 px-12 w-11/12 max-w-xl mx-auto transition-all duration-300 ${modalBg}`}
      >
        <button
          onClick={onCancel}
          className={`absolute top-3 right-3 transition cursor-pointer ${closeBtnColor}`}
          aria-label="Cerrar"
        >
          <AiOutlineClose size={20} />
        </button>

        <h3 className={`text-xl font-light mb-6 text-center ${titleColor}`}>
          {title}
        </h3>
        <p className={`text-sm mb-8 text-center ${messageColor}`}>{message}</p>

        <div className="flex justify-center gap-4">
          <RedButton onClick={onCancel}>{cancelText}</RedButton>
          <Button onClick={onConfirm}>{confirmText}</Button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default ConfirmModal;
