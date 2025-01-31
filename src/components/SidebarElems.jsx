import {
  NavLink,
  useNavigate,
  useResolvedPath,
  useLocation,
} from "react-router-dom";
import { useMemo } from "react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import classNames from "classnames";

export const SidebarElement = ({ to, children, customCss ,isWrapped}) => {
  const navigate = useNavigate();
  const isActive = useResolvedPath(to).pathname === useLocation().pathname;
  return (
    <div
      onClick={() => navigate(to)}
      className={classNames(
        customCss || "py-1 pl-6 ",
        isActive
          ? "hover:bg-cyan-500 bg-cyan-400 text-blue-950"
          : ("hover:bg-blue-800/40 "+ (isWrapped ? "text-white/60" : "text-white")),
        "rounded-lg transition-all duration-100 cursor-pointer",
        
      )}
    >
      <NavLink end to={to}>
        {children}
      </NavLink>
    </div>
  );
};

export const SidebarExpand = ({ text, children }) => {
  const [isopen, setIsopen] = useState(false);

  return (
    <div className={"flex flex-col transition-all text-white"}>
      <button
        className="flex py-2.5 pl-10 pr-8 space-x-2 rounded-lg justify-between items-center hover:bg-blue-800/40 transition-all duration-100"
        onClick={() => setIsopen((prev) => !prev)}
      >
        <span>{text}</span>
        {isopen ? (
          <Icon icon={"ep:arrow-up-bold"} />
        ) : (
          <Icon icon={"ep:arrow-down-bold"} />
        )}
      </button>
      <div className="pl-10">{isopen && children}</div>
    </div>
  );
};
