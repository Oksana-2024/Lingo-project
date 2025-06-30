import { type ReactNode } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");
import { noScrollDisable, noScrollEnable } from "../../helpers/noScroll";
import { MdClose } from "react-icons/md";
import clsx from "clsx";
import s from "./ModalWindow.module.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -48%)",
    padding: "20px",
    borderRadius: "30px",
    maxWidth: "599px",
  },
  overlay: {
    zIndex: "8",
  },
};

interface IModalWindow {
  children: ReactNode;
  modalIsOpen: boolean;
  className?: string;
  title: string;
  description: string;
  descrStyle?: string;
  closeModal: () => void;
}

const ModalWindow = ({
  title,
  children,
  modalIsOpen,
  className,
  description,
  descrStyle,
  closeModal,
}: IModalWindow) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
      onAfterOpen={noScrollEnable}
      onAfterClose={noScrollDisable}
    >
      <button className={s.closeBtn} onClick={closeModal}>
        <MdClose size={32} className={s.closeIcon} />
      </button>
      <div className={clsx(s.modal, className)}>
        <h2 className={s.modalTitle}>{title}</h2>
        <p className={clsx(s.descr, descrStyle)}>{description}</p>
        {children}
      </div>
    </Modal>
  );
};
export default ModalWindow;
