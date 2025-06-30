import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
interface INavigation {
  isLogin: boolean;
}

const Navigation = ({ isLogin }: INavigation) => {

  const activeStyle = ({ isActive }: { isActive: boolean }): string =>
    isActive ? s.activeLink : s.link;

  return (
    <nav className={s.navigation}>
      <NavLink className={activeStyle} to="/">
        Home
      </NavLink>
      <NavLink className={activeStyle} to="teachers">
        Teachers
      </NavLink>
      {isLogin && (
        <NavLink className={activeStyle} to="favorites">
          Favorites
        </NavLink>
      )}
    </nav>
  );
};
export default Navigation;
