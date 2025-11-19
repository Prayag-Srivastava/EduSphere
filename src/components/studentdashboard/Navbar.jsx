// src/components/Navbar.jsx
import React, { useState } from "react";

/**
 * Navbar component (React + Tailwind)
 *
 * Props:
 * - user: { name, avatarUrl } (optional)
 * - onToggleSidebar: function() called when the three-dash menu is clicked
 * - onSearch: function(query) called when search is submitted or Enter pressed
 * - onNavigate: function(route) called for navigation actions (notifications/profile)
 *
 * Drop into your app and style via Tailwind. No external dependencies.
 */

export default function Navbar({
  user = { name: "Student Name", avatarUrl: "" },
  onToggleSidebar,
  onSearch,
  onNavigate,
}) {
  const [query, setQuery] = useState("");

  function submitSearch(e) {
    if (e) e.preventDefault();
    if (typeof onSearch === "function") onSearch(query.trim());
    else {
      // fallback: update hash for quick local testing
      window.location.hash = `#/search?q=${encodeURIComponent(query.trim())}`;
    }
  }

  return (
    <header className="w-full fixed top-0 left-0 bg-white/95 backdrop-blur border-b border-gray-100 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">

          {/* Left: Branding */}
          <div className="flex items-center gap-4">
            <button
              aria-label="Toggle sidebar"
              onClick={() => typeof onToggleSidebar === "function" && onToggleSidebar()}
              className="p-2 rounded-md hover:bg-gray-100 md:hidden"
              title="Menu"
            >
              {/* three dashes icon (visible on small devices as well) */}
              <div className="space-y-1">
                <span className="block w-5 h-0.5 bg-gray-700" />
                <span className="block w-5 h-0.5 bg-gray-700" />
                <span className="block w-5 h-0.5 bg-gray-700" />
              </div>
            </button>

            <div className="flex items-baseline gap-3 cursor-default">
              <div className="text-2xl font-extrabold text-blue-600 leading-none">EduSphere</div>
            </div>
          </div>

          {/* Center: Search (collapses on very small screens) */}
          <form
            onSubmit={submitSearch}
            className="flex-1 max-w-2xl mx-4"
            role="search"
            aria-label="Site search"
          >
            <label htmlFor="nav-search" className="sr-only">Search</label>
            <div className="relative">
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
              <input
                id="nav-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") submitSearch(e); }}
                className="w-full border border-gray-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search internships, logs, courses, mentors..."
                aria-label="Search internships, logs, courses, mentors"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => { setQuery(""); if (typeof onSearch === "function") onSearch(""); }}
                  className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </form>

          {/* Right: Icons */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button
              onClick={() => (typeof onNavigate === "function" ? onNavigate("notifications") : window.location.hash = "#/notifications")}
              className="p-2 rounded-md hover:bg-gray-100 relative"
              aria-label="Notifications"
              title="Notifications"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1" />
              </svg>
              {/* small unread dot (example) */}
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-1 ring-white" />
            </button>

            {/* Profile */}
            <button
              onClick={() => (typeof onNavigate === "function" ? onNavigate("profile") : window.location.hash = "#/profile")}
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

            {/* Three dashes (explicitly requested) - acts as secondary sidebar toggle */}
            <button
              aria-label="Open sidebar menu"
              onClick={() => typeof onToggleSidebar === "function" && onToggleSidebar()}
              className="p-2 rounded-md hover:bg-gray-100"
              title="Sidebar"
            >
              <div className="flex flex-col justify-center items-center gap-1">
                <span className="block w-4 h-[2px] bg-gray-700" />
                <span className="block w-4 h-[2px] bg-gray-700" />
                <span className="block w-4 h-[2px] bg-gray-700" />
              </div>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
