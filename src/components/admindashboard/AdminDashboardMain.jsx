import React, { useState } from "react";

// Layout Components
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import OverviewUI from "./OverviewUI.jsx";
import Footer from "./Footer.jsx";

// Admin Pages
import ManageFaculty from "./pages/ManageFaculty.jsx";
import AddFaculty from "./pages/AddFaculty.jsx";
import ManageStudents from "./pages/ManageStudents.jsx";
import ForceAddStudent from "./pages/ForceAddStudent.jsx";
import Partnerships from "./pages/Partnerships.jsx";
import AdminCompany from "./pages/AdminCompany.jsx";
import Analytics from "./pages/Analytics.jsx";
import ExportData from "./pages/ExportData.jsx";
import Chats from "./pages/Chats.jsx";   // ⭐ NEW IMPORT

export default function AdminDashboardMain() {
  const [activePage, setActivePage] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ⭐ GLOBAL FACULTY DATA
  const [facultyList, setFacultyList] = useState([
    {
      id: 1,
      name: "Dr. Aditi Sharma",
      email: "aditi@college.edu",
      dept: "Computer Science",
    }
  ]);

  // ⭐ ADD FACULTY
  const addFaculty = (newFaculty) => {
    setFacultyList((prev) => [...prev, newFaculty]);
  };

  // ⭐ REMOVE FACULTY
  const removeFaculty = (id) => {
    setFacultyList((prev) => prev.filter((f) => f.id !== id));
  };

  // ⭐ PAGE SWITCH HANDLER
  const renderContent = () => {
    switch (activePage) {
      case "managefaculty":
        return (
          <ManageFaculty
            facultyList={facultyList}
            removeFaculty={removeFaculty}
          />
        );

      case "addfaculty":
        return <AddFaculty addFaculty={addFaculty} />;

      case "managestudents":
        return <ManageStudents />;

      case "forceadd":
        return <ForceAddStudent />;

      case "partnerships":
        return <Partnerships />;

      case "admincompany":
        return <AdminCompany />;

      case "analytics":
        return <Analytics />;

      case "exportdata":                     // ⭐ NEW PAGE HANDLER
        return <ExportData />;

      case "chats":                          // ⭐ NEW PAGE HANDLER
        return <Chats />;

      default:
        return <OverviewUI />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* SIDEBAR - Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div className={`fixed md:relative w-64 h-full bg-white shadow-xl z-40 md:z-10 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <Sidebar 
          setActivePage={setActivePage} 
          activePage={activePage}
          onNavigate={() => setIsSidebarOpen(false)}
        />
      </div>

      {/* MAIN AREA */}
      <div className="flex flex-col flex-1 w-full">
        <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} isMobileMenuOpen={isSidebarOpen} />

        <main className="p-4 md:p-6 overflow-y-auto flex-1">
          {renderContent()}
        </main>

        <Footer />
      </div>

    </div>
  );
}
