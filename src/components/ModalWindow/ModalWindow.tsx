import { type ReactNode } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");
import { MdClose } from "react-icons/md";
import { noScrollDisable, noScrollEnable } from "../../helpers/noScroll";
import clsx from "clsx";
import s from "./ModalWindow.module.css";


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
      closeTimeoutMS={300}
      className={{
        base: s.modalBase,
        afterOpen: s.modalAfterOpen,
        beforeClose: s.modalBeforeClose,
      }}
      overlayClassName={{
        base: s.overlayBase,
        afterOpen: s.overlayAfterOpen,
        beforeClose: s.overlayBeforeClose,
      }}
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
