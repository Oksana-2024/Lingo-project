import clsx from "clsx";
import s from "./Badges.module.css";

interface IBadges {
  level: string;
  className?: string;
}

const Badges = ({ level, className }: IBadges) => {
  return <div className={clsx(s.badges, className)}>{level}</div>;
};

export default Badges;
