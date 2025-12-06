import React, { useState } from "react";

/**
 * Navbar component (Facebook-inspired Style)
 *
 * Design updates:
 * - Uses specific "Social Blue" (#0866FF)
 * - "Pill-shaped" gray search bar (#F0F2F5)
 * - Circular hover backgrounds for icons
 * - Sticky positioning with subtle shadow
 */

export default function Navbar({
  user = { name: "Student Name", avatarUrl: "" },
  onToggleSidebar,
  onSearch,
  onNavigate,
}) {
  const [query, setQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  function submitSearch(e) {
    if (e) e.preventDefault();
    if (typeof onSearch === "function") onSearch(query.trim());
    else {
      // fallback: update hash for quick local testing
      window.location.hash = `#/search?q=${encodeURIComponent(query.trim())}`;
    }
  }

  return (
    <header className="w-full sticky top-0 left-0 bg-white shadow-sm z-50 h-[60px] flex items-center">
      <div className="w-full px-4 flex items-center justify-between gap-2">
        
        {/* --- LEFT SECTION: Logo & Mobile Toggle --- */}
        <div className="flex items-center gap-3">
          {/* Mobile Sidebar Toggle (Hamburger) */}
          <button
            aria-label="Toggle sidebar"
            onClick={() => typeof onToggleSidebar === "function" && onToggleSidebar()}
            className="p-2 md:hidden rounded-full hover:bg-[#F0F2F5] transition-colors text-gray-600"
          >
            <div className="space-y-[5px]">
              <span className="block w-5 h-0.5 bg-gray-600 rounded-full" />
              <span className="block w-5 h-0.5 bg-gray-600 rounded-full" />
              <span className="block w-5 h-0.5 bg-gray-600 rounded-full" />
            </div>
          </button>

          {/* Logo */}
          <div 
            className="cursor-pointer flex items-center gap-2"
            onClick={() => window.location.hash = "#/"}
          >
            {/* Optional: Add a logo icon here if you have one */}
            {/* <div className="w-10 h-10 bg-[#0866FF] rounded-full text-white flex items-center justify-center font-bold text-2xl">P</div> */}
            <span className="text-[28px] font-black text-[#0866FF] tracking-tighter leading-none select-none">
              Prashikshan
            </span>
          </div>
        </div>

        {/* --- CENTER SECTION: Search Bar --- */}
        <div className="hidden md:flex flex-1 max-w-[600px] px-4">
          <form
            onSubmit={submitSearch}
            className={`
              group w-full flex items-center gap-2 px-3 py-2.5 rounded-full transition-all duration-200
              ${isSearchFocused ? "bg-white ring-2 ring-[#0866FF] shadow-md" : "bg-[#F0F2F5] hover:bg-[#E4E6E9]"}
            `}
          >
            {/* Search Icon (Blue when focused, Gray otherwise) */}
            <svg 
              className={`w-5 h-5 transition-colors ${isSearchFocused ? "text-[#0866FF]" : "text-gray-500"}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="flex-1 bg-transparent border-none outline-none text-[15px] text-[#050505] placeholder-gray-500"
              placeholder="Search Prashikshan"
              aria-label="Search"
            />
          </form>
        </div>

        {/* --- RIGHT SECTION: Actions & Profile --- */}
        <div className="flex items-center gap-1 sm:gap-2">
          
          {/* Mobile Search Icon (only shows on small screens where main search is hidden) */}
          <button 
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-[#F0F2F5] text-gray-700 hover:bg-[#E4E6E9] transition-colors"
            onClick={() => document.getElementById('mobile-search-modal')?.showModal()}
          >
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Notifications */}
          <button
            onClick={() => (typeof onNavigate === "function" ? onNavigate("notifications") : window.location.hash = "#/notifications")}
            className="relative w-10 h-10 flex items-center justify-center rounded-full bg-[#F0F2F5] text-black hover:bg-[#E4E6E9] transition-colors"
            aria-label="Notifications"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.02 2.909c-.375-1.455-2.613-1.455-2.988 0A9.016 9.016 0 005.67 8.525c-.24.962-.806 1.8-1.583 2.375-1.127.834-1.396 2.502-.423 3.655C5.952 17.27 8.924 18 10.533 18h2.934c1.61 0 4.581-.73 6.87-3.445.972-1.153.703-2.82-.424-3.655-.776-.575-1.343-1.413-1.583-2.375a9.016 9.016 0 00-3.362-5.616zM9 19.5a3 3 0 006 0H9z" />
            </svg>
            <span className="absolute top-[2px] right-[2px] flex h-4 w-4 items-center justify-center rounded-full bg-[#E41E3F] text-[10px] font-bold text-white ring-2 ring-white">
              3
            </span>
          </button>

          {/* Menu / Apps Grid */}
          <button
            onClick={() => typeof onToggleSidebar === "function" && onToggleSidebar()}
            className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full bg-[#F0F2F5] text-black hover:bg-[#E4E6E9] transition-colors"
            title="Menu"
          >
             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 6a2 2 0 114 0 2 2 0 01-4 0zM10 6a2 2 0 114 0 2 2 0 01-4 0zM16 6a2 2 0 114 0 2 2 0 01-4 0zM4 12a2 2 0 114 0 2 2 0 01-4 0zM10 12a2 2 0 114 0 2 2 0 01-4 0zM16 12a2 2 0 114 0 2 2 0 01-4 0zM4 18a2 2 0 114 0 2 2 0 01-4 0zM10 18a2 2 0 114 0 2 2 0 01-4 0zM16 18a2 2 0 114 0 2 2 0 01-4 0z" />
            </svg>
          </button>

          {/* Profile Dropdown Trigger */}
          <button
            onClick={() => (typeof onNavigate === "function" ? onNavigate("profile") : window.location.hash = "#/profile")}
            className="ml-1 relative rounded-full overflow-hidden w-10 h-10 border border-gray-200 hover:opacity-90 transition-opacity"
            title="Profile"
          >
            <img
              src={user.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.name)}&backgroundColor=b6e3f4`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>

        </div>
      </div>
    </header>
  );
}