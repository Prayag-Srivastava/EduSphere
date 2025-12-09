// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Landing + Role Select
import LandingPage from "./pages/LandingPage.jsx";
import RoleSelectPage from "./pages/RoleSelectPage.jsx";
import SkillGapApp from "./skillGap/SkillGapApp.jsx";

// Student Pages
import StudentSignUpPage from "./pages/StudentSignupPage.jsx";
import StudentLoginPage from "./pages/StudentLoginPage.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import LogbookPage from "./pages/LogBook.jsx";
import ActivityTrackerPage from "./pages/StudentActivityTracker.jsx";
import InternshipsPage from "./pages/InternshipsPage.jsx";
import Courses from "./pages/CoursesPage.jsx";
import Mentors from "./pages/MentorsPage.jsx";
import Certificates from "./pages/Certificates.jsx";
import ProfilePage from "./pages/StudentProfile.jsx";

// Mentor Pages
import MentorLoginPage from "./pages/MentorLoginPage.jsx";
import MentorSignupPage from "./pages/MentorSignupPage.jsx";
import MentorDashboard from "./pages/MentorDashboard.jsx";

// Faculty Pages
import FacultyLoginPage from "./pages/FacultyLoginPage.jsx";
import FacultySignupPage from "./pages/FacultySignupPage.jsx";
import FacultyDashboard from "./pages/FacultyDashboard.jsx";
import AcademicDashboard from "./pages/AcademicDashboard.jsx";

// Internship Report
import InternshipReport from "./pages/InternshipReport.jsx";

// Company Auth
import CompanySignupPage from "./pages/CompanySignupPage.jsx";
import CompanyLoginPage from "./pages/CompanyLoginPage.jsx";

// Admin Pages
import AdminSignupPage from "./pages/AdminSignupPage.jsx";
import AdminLoginPage from "./pages/AdminLoginPage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

// Company Dashboard Layout + Pages
import { CompanyProvider } from "./context/CompanyContext";
import DashboardLayout from "./components/companydashboard/Layout/DashboardLayout";
import Overview from "./pages/company/Overview";
import CreateOpening from "./pages/company/CreateOpening";
import Applicants from "./pages/company/Applicants";
import Analytics from "./pages/company/Analytics";
import Chat from "./pages/company/Chat";
import StudentProfile from "./pages/company/StudentProfile";
import SelectedStudents from "./pages/company/SelectedStudents";
import RejectedStudents from "./pages/company/RejectedStudents";
import RecruitedStudents from "./pages/company/RecruitedStudents";

// Student Chat
import ChatStudent from "./components/studentdashboard/StudentChat.jsx";

// Under Maintenance
import UnderMaintenance from "./pages/company/UnderMaintenance";

// Chatbot (assistant)
import ChatbotFlow from "./components/ChatbotFlow.jsx";

//gov
import Gov from "../src/pages/GovPortal.jsx"

//course publisher
import Publisher from "../src/pages/PublisherDashboard.jsx"

// Company Layout Wrapper Component
const CompanyDashboardWrapper = () => {
  return (
    <CompanyProvider>
      <DashboardLayout />
    </CompanyProvider>
  );
};

export default function App() {
  return (
    <div className="bg-white text-gray-800 min-h-screen">
      {/* Chatbot appears on ALL pages */}
      <ChatbotFlow />

      <Routes>
        {/* Landing + Role Selection */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/roleselect" element={<RoleSelectPage />} />

        {/* Student Routes */}
        <Route path="/studentsignup" element={<StudentSignUpPage />} />
        <Route path="/studentlogin" element={<StudentLoginPage />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route path="/logbook" element={<LogbookPage />} />
        <Route path="/activitytracker" element={<ActivityTrackerPage />} />
        <Route path="/internships" element={<InternshipsPage />} />
        <Route path="/studentchat" element={<ChatStudent />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/studentprofile" element={<ProfilePage />} />

        //course publisher
        <Route path="/publisherdashboard" element={<Publisher />} />

        //gov portal
        <Route path="/govportal" element={<Gov />} />

        {/* Skill Gap Analysis */}
        <Route path="/skill-gap" element={<SkillGapApp />} />

        {/* Faculty Routes */}
        <Route path="/facultylogin" element={<FacultyLoginPage />} />
        <Route path="/facultysignup" element={<FacultySignupPage />} />
        <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
        <Route path="/academicdashboard" element={<AcademicDashboard />} />

        {/* Company Auth Routes */}
        <Route path="/companysignup" element={<CompanySignupPage />} />
        <Route path="/companylogin" element={<CompanyLoginPage />} />

        {/* Mentor Routes */}
        <Route path="/mentorlogin" element={<MentorLoginPage />} />
        <Route path="/mentorsignup" element={<MentorSignupPage />} />
        <Route path="/mentordashboard" element={<MentorDashboard />} />

        {/* Admin Routes */}
        <Route path="/adminsignup" element={<AdminSignupPage />} />
        <Route path="/adminlogin" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />


        {/* Internship Report */}
        <Route path="/internship-report" element={<InternshipReport />} />

        {/* Company Dashboard Routes */}
        <Route path="/company" element={<CompanyDashboardWrapper />}>
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />
          <Route path="create-opening" element={<CreateOpening />} />
          <Route path="applicants" element={<Applicants />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="selected-students" element={<SelectedStudents />} />
          <Route path="rejected-students" element={<RejectedStudents />} />
          <Route path="recruited-students" element={<RecruitedStudents />} />
          <Route path="chat" element={<Chat />} />
          <Route path="student/:id" element={<StudentProfile />} />
          <Route path="settings" element={<UnderMaintenance />} />
          
          <Route path="help" element={<UnderMaintenance />} />
          
        </Route>

        {/* 404 - Catch all */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
                <p className="text-xl text-gray-500 mb-6">Page Not Found</p>
                <a
                  href="/"
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                >
                  Go Home
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
}
