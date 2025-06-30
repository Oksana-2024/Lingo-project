import type { ReactNode } from "react";
import clsx from "clsx";
import s from "./Container.module.css";
interface IContainer {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: IContainer) => {
  return <div className={clsx(s.container, className)}>{children}</div>;
};

export default Container;
