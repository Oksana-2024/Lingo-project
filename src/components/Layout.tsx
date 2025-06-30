import type { ReactNode } from "react";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";

interface ILayout {
  children?: ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Outlet />
    </>
  );
};

export default Layout;
