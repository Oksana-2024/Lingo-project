import clsx from "clsx";
import s from "./BaseButton.module.css";
interface IBaseButton {
  name: string;
  className: string;
  type: "submit" | "button" | "reset";
  onClick?: () => void;
}

const BaseButton = ({ name, type, className, onClick }: IBaseButton) => {
  return (
    <button
      className={clsx(s.baseButton, className)}
      onClick={onClick}
      type={type}
    >
      {name}
    </button>
  );
};

export default BaseButton;
