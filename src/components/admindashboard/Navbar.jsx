import React from "react";
import { BellIcon, UserCircleIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

export default function Navbar({ onMenuClick, isMobileMenuOpen }) {
  return (
    <nav className="bg-white shadow-md h-16 flex items-center justify-between px-4 md:px-6 border-b border-gray-200">

      {/* LEFT: MENU BUTTON + PAGE TITLE */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="w-6 h-6 text-gray-700" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-gray-700" />
          )}
        </button>
        
        <h1 className="text-lg md:text-xl font-bold text-gray-800 tracking-tight">
          Admin Console
        </h1>
      </div>

      {/* RIGHT: ICONS */}
      <div className="flex items-center gap-4 md:gap-6">

        {/* Notification Icon */}
        <button className="relative hover:text-indigo-600 transition">
          <BellIcon className="w-5 md:w-6 h-5 md:h-6 text-gray-500" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full"></span>
        </button>

        {/* Profile Icon - Hidden on mobile */}
        <button className="hidden md:flex items-center gap-2 hover:text-indigo-600 transition">
          <UserCircleIcon className="w-8 h-8 text-gray-600" />
          <span className="text-sm font-semibold text-gray-700">Admin</span>
        </button>

        {/* Profile Icon - Mobile */}
        <button className="md:hidden hover:text-indigo-600 transition">
          <UserCircleIcon className="w-6 h-6 text-gray-600" />
        </button>

      </div>

    </nav>
  );
}
