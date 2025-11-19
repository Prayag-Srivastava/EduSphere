// src/pages/StudentDashboard.jsx
import React, { useState } from "react";
import Navbar from "../components/studentdashboard/Navbar.jsx";
import Sidebar from "../components/studentdashboard/sidebar.jsx";
import StudentDashboardMain from "../components/studentdashboard/StudentDashboardMain.jsx";
import Footer from "../components/studentdashboard/Footer.jsx";

export default function StudentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleNavigate(route) {
    // wire to your router here. Example: react-router -> navigate(`/${route}`)
    // For now we use hash-nav fallback:
    window.location.hash = `#/${route}`;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        user={{ name: "Asha Verma" }}
        onToggleSidebar={() => setSidebarOpen(true)}
        onSearch={(q) => alert("Search: " + q)}
        onNavigate={(r) => handleNavigate(r)}
      />

      {/* IMPORTANT: add top padding so fixed navbar doesn't cover content */}
      <div className="pt-20">
        <main className="max-w-6xl mx-auto p-6">
          <h1 className="text-2xl font-semibold mb-4">Student Dashboard (page content)</h1>
          <p className="text-sm text-gray-600">Your dashboard content goes here.</p>
        </main>
      </div>

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={(route) => handleNavigate(route)}
      />

      <StudentDashboardMain />
      <Footer />
    </div>
  );
}
