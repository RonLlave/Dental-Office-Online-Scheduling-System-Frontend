import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiHome,
  HiCalendarDays,
  HiMiniUser,
  HiMiniTableCells,
} from "react-icons/hi2";
const Sidebar = () => {
  const location = useLocation();
  const noSidebarRoutes = ["/login", "/register"];
  const showSidebar = !noSidebarRoutes.includes(location.pathname);
  const active = (path) =>
    location.pathname === path ? "bg-blue-100 text-blue-600" : "text-gray-600";

  const SideBarControl = () => {
    return (
      <div className="h-screen w-64 bg-white shadow-lg border-r hidden md:flex flex-col p-4">
        <nav className="flex flex-col gap-4">
          <Link
            to="/home"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50 ${active(
              "/home"
            )}`}
          >
            <HiHome size={20} /> Home
          </Link>
          <Link
            to="/booking"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50 ${active(
              "/booking"
            )}`}
          >
            <HiCalendarDays size={20} /> Booking
          </Link>
          <Link
            to="/dashboard"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50 ${active(
              "/dashboard"
            )}`}
          >
            <HiMiniTableCells size={20} /> Dashboard
          </Link>
          <Link
            to="/profile"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50 ${active(
              "/profile"
            )}`}
          >
            <HiMiniUser size={20} /> User's Profile
          </Link>
        </nav>
      </div>
    );
  };

  return showSidebar ? <SideBarControl /> : "";
};

export default Sidebar;
