import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 h-auto md:h-14 flex items-center justify-center px-4 py-3 md:py-0 text-gray-500 text-xs md:text-sm text-center">
      © {new Date().getFullYear()} Prashikshan • Institute Admin Panel
    </footer>
  );
}
