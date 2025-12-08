import React from "react";
import {
  HomeIcon,
  UserGroupIcon,
  UserPlusIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  BuildingOffice2Icon,
  ArrowRightCircleIcon,
  ChartBarIcon,
  DocumentArrowDownIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/solid";
import { 
  Cog6ToothIcon, 
  ArrowRightOnRectangleIcon 
} from "@heroicons/react/24/outline";

export default function Sidebar({ setActivePage, activePage = "overview", onNavigate }) {
  // No local mobile state needed - parent handles sidebar visibility

  // ⭐ ALL ITEMS (NO UI CHANGES — only "Manage Partnerships" added)
  const menuGroups = [
    {
      title: "Main",
      items: [
        { icon: HomeIcon, label: "Dashboard", page: "overview" },
      ]
    },
    {
      title: "Faculty",
      items: [
        { icon: UserGroupIcon, label: "Manage Faculty", page: "managefaculty" },
        { icon: UserPlusIcon, label: "Add Faculty", page: "addfaculty" },
      ]
    },
    {
      title: "Students",
      items: [
        { icon: AcademicCapIcon, label: "Manage Students", page: "managestudents" },
        { icon: ClipboardDocumentListIcon, label: "Force Add", page: "forceadd" },
      ]
    },
    {
      title: "Company",
      items: [
        { icon: BuildingOffice2Icon, label: "Partnerships", page: "partnerships" },
        { icon: ArrowRightCircleIcon, label: "Admin Company", page: "admincompany" },
        { icon: ChatBubbleLeftIcon, label: "Chat with Companies", page: "chats" },
      ]
    },
    {
      title: "Reports",
      items: [
        { icon: ChartBarIcon, label: "Analytics", page: "analytics" },
        { icon: DocumentArrowDownIcon, label: "Export Data", page: "exportdata" },
      ]
    },
  ];

  const handleNavigation = (page) => {
    setActivePage(page);
    if (onNavigate) onNavigate();
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-white">

      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Prashikshan</h2>
            <p className="text-xs text-gray-500">Institute Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {menuGroups.map((group, index) => (
          <div key={group.title} className={index > 0 ? "mt-6" : ""}>

            <div className="px-3 mb-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {group.title}
              </span>
            </div>

            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = activePage === item.page;

                return (
                  <button
                    key={item.page}
                    onClick={() => handleNavigation(item.page)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <item.icon
                      className={`w-5 h-5 ${
                        isActive ? "text-indigo-600" : "text-gray-400"
                      }`}
                    />
                    <span className={`text-sm font-medium ${isActive ? "font-semibold" : ""}`}>
                      {item.label}
                    </span>

                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>

          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 p-3 space-y-1 flex-shrink-0">

        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50">
          <Cog6ToothIcon className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium">Settings</span>
        </button>

        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50">
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>

        <div className="pt-3 mt-2 border-t border-gray-200">
          <div className="flex items-center gap-2 px-2 py-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-xs">AD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-900 truncate">Admin User</p>
              <p className="text-xs text-gray-500 truncate">admin@prashikshan.edu</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );

  return <SidebarContent />;
}
