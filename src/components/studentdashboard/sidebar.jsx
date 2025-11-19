// src/components/Sidebar.jsx
import React, { useEffect } from "react";

/**
 * Sidebar (slides in from right)
 *
 * Props:
 * - open: boolean
 * - onClose: () => void
 * - onNavigate: (route: string) => void   (optional; defaults to hash navigation)
 * - user: { name: string, avatarUrl?: string } (optional)
 *
 * Links call onNavigate(route) and then onClose().
 */
export default function Sidebar({
  open,
  onClose,
  onNavigate = (route) => (window.location.hash = "#/" + route),
  user = { name: "Student Name", avatarUrl: "" },
}) {
  // close on ESC
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const navItem = (label, route, opts = {}) => (
    <button
      key={label}
      onClick={() => {
        typeof onNavigate === "function" && onNavigate(route);
        onClose && onClose();
      }}
      className="w-full text-left flex items-center gap-3 py-3 px-3 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      
      <span className="font-medium text-gray-800">{label}</span>
      {opts.badge && <span className="ml-auto text-xs text-gray-500">{opts.badge}</span>}
    </button>
  );

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-50 pointer-events-none ${open ? "" : ""}`}
    >
      {/* overlay */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden="true"
      />

      {/* panel */}
      <aside
        role="dialog"
        aria-modal="true"
        className={`absolute right-0 top-0 h-full w-[20rem] max-w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"}`}
      >
        <div className="h-full flex flex-col">
          {/* header */}
          <div className="flex items-center justify-between px-4 py-4 border-b">
            <div className="flex items-center gap-3">
              <div className="text-lg font-bold text-blue-600">EduSphere</div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  typeof onNavigate === "function" && onNavigate("profile");
                  onClose && onClose();
                }}
                className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-50"
                aria-label="Open profile"
                title="Profile"
              >
                <img
                  src={user.avatarUrl || `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(user.name)}`}
                  alt={`${user.name} avatar`}
                  className="w-8 h-8 rounded-full border"
                />
                <span className="hidden md:inline-block text-sm text-gray-700">{user.name.split(" ")[0]}</span>
              </button>

              <button
                onClick={onClose}
                aria-label="Close sidebar"
                className="p-2 rounded-md hover:bg-gray-100"
                title="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {/* content */}
          <nav className="px-3 py-4 space-y-1 overflow-auto">
            {navItem("Profile", "profile")}
            {navItem("Logbook", "logbook")}
            {navItem("Activity Feed", "Activity Feed")}
            {navItem("Academics", "academics")}
            {navItem("Certifications", "certifications")}
            {navItem("Courses", "courses")}
            {navItem("Mentors", "mentors")}
            {navItem("Internships", "internships")}
          </nav>

          {/* footer / quick actions */}
          <div className="mt-auto px-4 py-4 border-t">
            <button
              onClick={() => {
                typeof onNavigate === "function" && onNavigate("help");
                onClose && onClose();
              }}
              className="w-full text-left py-2 px-3 rounded-md hover:bg-gray-50"
            >
              Help & Support
            </button>
            <button
              onClick={() => {
                typeof onNavigate === "function" && onNavigate("signout");
                onClose && onClose();
              }}
              className="mt-2 w-full text-left py-2 px-3 rounded-md text-red-600 hover:bg-red-50"
            >
              Sign out
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
