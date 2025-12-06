// src/pages/AcademicDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";

import Navbar from "../components/studentdashboard/Navbar.jsx";
import Sidebar from "../components/studentdashboard/sidebar.jsx";


/**
 * AcademicDashboard.jsx
 * - Layout: 3-Column (Left: Stats/Profile | Center: Courses & Assignments | Right: Notices & Schedule)
 * - Architecture: Data driven via state. Switch USE_MOCK to false and implement API calls in fetchDashboardData().
 */

const USE_MOCK = true;

/* -------------------- MOCK DATA (Backend Response Schema) -------------------- */
const MOCK_API_RESPONSE = {
  student: {
    name: "Divyam Gupta",
    roll: "CS2026-101",
    program: "B.Tech Computer Science",
    semester: 5,
    section: "A",
    cgpa: 8.42,
    cgpaTrend: [7.3, 7.8, 8.1, 8.0, 8.42],
    credits: { earned: 94, total: 160, current: 22 },
    attendance: 85, // Overall average
  },
  classes: [
    {
      id: "c1",
      code: "CS301",
      title: "Operating Systems",
      instructor: "Prof. Anjali Mehta",
      credits: 4,
      schedule: "10:00 AM - 11:30 AM",
      days: ["Mon", "Wed"],
      attendance: { present: 24, total: 28 }, // 85%
      grade: null,
      color: "bg-blue-600",
      icon: "O",
      section: "A",
      department: "Computer Science",
      description: "This course covers the fundamentals of operating systems, including process management, memory management, file systems, and I/O systems. Students will learn how OS manages hardware resources."
    },
    {
      id: "c2",
      code: "CS302",
      title: "Computer Networks",
      instructor: "Dr. Rohit Sen",
      credits: 4,
      schedule: "09:00 AM - 10:30 AM",
      days: ["Tue", "Thu"],
      attendance: { present: 18, total: 28 }, // ~64% (Low attendance warning)
      grade: null,
      color: "bg-purple-600",
      icon: "N",
      section: "A",
      department: "Computer Science",
      description: "Introduction to computer networking concepts, including the OSI model, TCP/IP protocol suite, LAN/WAN technologies, and network security basics."
    },
    {
      id: "c3",
      code: "CS305",
      title: "Database Systems",
      instructor: "Dr. Sameer Malhotra",
      credits: 3,
      schedule: "02:00 PM - 05:00 PM",
      days: ["Fri"],
      attendance: { present: 10, total: 10 }, // 100%
      grade: null,
      color: "bg-emerald-600",
      icon: "D",
      section: "B",
      department: "Computer Science",
      description: "Study of database design, normalization, SQL, transaction management, and concurrency control. Includes hands-on projects with SQL and NoSQL databases."
    },
    {
      id: "c4",
      code: "HU101",
      title: "Engineering Ethics",
      instructor: "Prof. Sarah Khan",
      credits: 2,
      schedule: "11:00 AM - 12:00 PM",
      days: ["Tue", "Thu"],
      attendance: { present: 20, total: 22 },
      grade: "A-", // Already graded (maybe mid-term)
      color: "bg-amber-500",
      icon: "E",
      section: "General",
      department: "Humanities",
      description: "Explores ethical issues in engineering practice, professional responsibilities, and the impact of technology on society."
    },
  ],
  assignments: [
    {
      id: "a1",
      title: "Process Scheduling Algorithms",
      classCode: "CS301",
      courseName: "Operating Systems",
      dueDate: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
      status: "pending", 
      maxMarks: 20,
    },
    {
      id: "a2",
      title: "Socket Programming Lab",
      classCode: "CS302",
      courseName: "Computer Networks",
      dueDate: new Date(Date.now() + 86400000 * 5).toISOString(),
      status: "pending",
      maxMarks: 30,
    },
    {
      id: "a3",
      title: "Normalization Quiz",
      classCode: "CS305",
      courseName: "Database Systems",
      dueDate: new Date(Date.now() - 86400000 * 2).toISOString(),
      status: "late",
      maxMarks: 10,
    },
    {
      id: "a4",
      title: "Ethics Essay",
      classCode: "HU101",
      courseName: "Engineering Ethics",
      dueDate: new Date(Date.now() - 86400000 * 10).toISOString(),
      status: "submitted",
      maxMarks: 50,
      score: 45
    },
  ],
  notices: [
    { id: 1, title: "Mid-Semester Exam Schedule", date: "2 Hours ago", type: "exam" },
    { id: 2, title: "Holiday on Friday (Campus Closed)", date: "1 Day ago", type: "general" },
    { id: 3, title: "Hackathon Registration Open", date: "2 Days ago", type: "event" },
  ]
};

/* -------------------- Utilities -------------------- */
const formatDate = (iso) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
const getAttendanceColor = (percentage) => {
  if (percentage >= 85) return "text-green-600 bg-green-50";
  if (percentage >= 75) return "text-yellow-600 bg-yellow-50";
  return "text-red-600 bg-red-50";
};

/* -------------------- Main Component -------------------- */
export default function AcademicDashboard() {
  // --- Sidebar / Nav Logic ---
  const [sidebarOpen, setSidebarOpen] = useState(false);
  function handleNavigate(route) {
    window.location.hash = `#/${route}`;
  }

  // --- Generalised State ---
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(null);
  const [classes, setClasses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [notices, setNotices] = useState([]);
  
  // UI State
  const [assignmentTab, setAssignmentTab] = useState("pending");
  const [transcriptOpen, setTranscriptOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [uploadingAssignment, setUploadingAssignment] = useState(null);

  // --- Data Fetching Logic ---
  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      try {
        if (USE_MOCK) {
          // Simulate API Latency
          await new Promise(resolve => setTimeout(resolve, 800));
          setStudent(MOCK_API_RESPONSE.student);
          setClasses(MOCK_API_RESPONSE.classes);
          setAssignments(MOCK_API_RESPONSE.assignments);
          setNotices(MOCK_API_RESPONSE.notices);
        } else {
          // TODO: Backend Integration
          // const res = await fetch('/api/student/dashboard');
          // const data = await res.json();
          // setStudent(data.student);
          // setClasses(data.classes);
          // setAssignments(data.assignments);
          // setNotices(data.notices);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  // --- Derived State (Memoized) ---
  const pendingAssignments = useMemo(() => 
    assignments.filter(a => a.status === "pending" || a.status === "late"), 
  [assignments]);

  const submittedAssignments = useMemo(() => 
    assignments.filter(a => a.status === "submitted" || a.status === "graded"), 
  [assignments]);
  
  const todaysClasses = useMemo(() => {
    // Logic to filter classes for today (Mock logic: just taking first 2 active classes)
    return classes.slice(0, 2); 
  }, [classes]);

  const handleUploadSubmit = (file) => {
    // Mock upload logic
    alert(`File "${file.name}" uploaded for assignment: ${uploadingAssignment.title}`);
    setUploadingAssignment(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-gray-300 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans text-gray-800">
      
              {/* 1. Global Navigation (Fixed) */}
              <div className="sticky top-0 z-50 bg-white shadow-sm">
                <Navbar
                  user={{ name: "Asha Verma" }}
                  onToggleSidebar={() => setSidebarOpen(true)}
                  onSearch={(q) => console.log("Search: " + q)}
                  onNavigate={(r) => handleNavigate(r)}
                />
              </div>
        
              {/* Mobile Sidebar */}
              <Sidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onNavigate={(route) => handleNavigate(route)}
              />

      <div className="flex justify-center w-full px-4 pt-6 pb-12">
        <div className="flex w-full max-w-[1600px] gap-6 items-start">
          
          {/* ======================= 
              LEFT SIDEBAR (Profile & Stats) 
             ======================= */}
          <aside className="hidden lg:block w-72 xl:w-80 flex-shrink-0 sticky top-24 space-y-6">
            
            {/* Student Profile Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
               <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
               <div className="px-6 pb-6 text-center -mt-10">
                  <div className="w-20 h-20 mx-auto bg-white rounded-full p-1 shadow-md">
                     <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&fit=crop&q=80" alt="Student" className="w-full h-full rounded-full object-cover" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mt-2">{student?.name}</h2>
                  <p className="text-sm text-gray-500">{student?.roll}</p>
                  
                  <div className="mt-4 flex justify-center gap-2">
                     <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full">Sem {student?.semester}</span>
                     <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">Sec {student?.section}</span>
                  </div>
               </div>
               
               <div className="border-t border-gray-100 px-6 py-4">
                  <div className="flex justify-between items-center text-sm mb-1">
                     <span className="text-gray-500">Program</span>
                     <span className="font-semibold text-gray-900 text-right text-xs max-w-[120px] truncate">{student?.program}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-gray-500">Status</span>
                     <span className="font-bold text-green-600 text-xs uppercase">Active</span>
                  </div>
               </div>
            </div>

            {/* Academic Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
               <h3 className="font-bold text-gray-900 mb-4 text-sm">Academic Performance</h3>
               
               {/* CGPA */}
               <div className="flex items-end justify-between mb-2">
                  <span className="text-xs text-gray-500">CGPA</span>
                  <span className="text-2xl font-bold text-indigo-600">{student?.cgpa}</span>
               </div>
               <div className="w-full h-10 mb-6">
                  {/* Simple Sparkline Mock */}
                  <div className="flex items-end h-full gap-1">
                     {student?.cgpaTrend?.map((g, i) => (
                        <div key={i} className="flex-1 bg-indigo-100 hover:bg-indigo-200 rounded-t transition-all relative group" style={{ height: `${(g/10)*100}%` }}>
                           <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">{g}</span>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Credits */}
               <div className="mb-2 flex justify-between text-xs">
                  <span className="text-gray-500">Credits Earned</span>
                  <span className="font-bold text-gray-900">{student?.credits?.earned} / {student?.credits?.total}</span>
               </div>
               <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(student?.credits?.earned/student?.credits?.total)*100}%` }}></div>
               </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
               <button className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-3 transition-colors" onClick={() => setTranscriptOpen(true)}>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                  View Transcript
               </button>
               <button className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-3 transition-colors">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  Exam Schedule
               </button>
            </div>

          </aside>

          {/* ======================= 
              CENTER (Courses & Assignments) 
             ======================= */}
          <main className="flex-1 min-w-0 space-y-6">
            
            {/* Header Mobile Only */}
            <div className="lg:hidden mb-4">
               <h1 className="text-2xl font-bold text-gray-900">Welcome, {student?.name?.split(' ')[0]}</h1>
               <p className="text-sm text-gray-500">Here's your academic overview.</p>
            </div>

            {/* Courses Section */}
            <section>
               <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Current Courses</h2>
                  <span className="text-xs font-semibold text-gray-500 bg-white px-2 py-1 rounded border shadow-sm">Sem {student?.semester}</span>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {classes.map(cls => (
                     <CourseCard key={cls.id} cls={cls} onClick={() => setSelectedClass(cls)} />
                  ))}
               </div>
            </section>

            {/* Assignments Section */}
            <section 
            
            >
               <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Assignments</h2>
                  <div className="flex bg-white rounded-lg p-1 border shadow-sm">
                     <button 
                        onClick={() => setAssignmentTab("pending")}
                        className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${assignmentTab === "pending" ? "bg-indigo-50 text-indigo-700" : "text-gray-500 hover:text-gray-900"}`}
                     >
                        Pending ({pendingAssignments.length})
                     </button>
                     <button 
                        onClick={() => setAssignmentTab("submitted")}
                        className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${assignmentTab === "submitted" ? "bg-green-50 text-green-700" : "text-gray-500 hover:text-gray-900"}`}
                     >
                        Completed
                     </button>
                  </div>
               </div>

               <div className="bg-white rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-100">
                  {assignmentTab === "pending" ? (
                     pendingAssignments.length > 0 ? (
                        pendingAssignments.map(a => (
                          <AssignmentItem 
                            key={a.id} 
                            assignment={a} 
                            onUpload={() => setUploadingAssignment(a)}
                          />
                        ))
                     ) : (
                        <div className="p-8 text-center text-gray-500 text-sm">🎉 No pending assignments!</div>
                     )
                  ) : (
                     submittedAssignments.length > 0 ? (
                        submittedAssignments.map(a => <AssignmentItem key={a.id} assignment={a} />)
                     ) : (
                        <div className="p-8 text-center text-gray-500 text-sm">No completed assignments yet.</div>
                     )
                  )}
               </div>
            </section>

          </main>

          {/* ======================= 
              RIGHT SIDEBAR (Notices & Schedule) 
             ======================= */}
          <aside className="hidden xl:block w-80 flex-shrink-0 sticky top-24 space-y-6">
             
             {/* Today's Schedule */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-4">
                   <h3 className="font-bold text-gray-900 text-sm">Today's Schedule</h3>
                   <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-bold">{new Date().toLocaleDateString('en-US', { weekday: 'short' })}</span>
                </div>
                <div className="space-y-4">
                   {todaysClasses.map((cls, i) => (
                      <div key={i} className="flex gap-3 relative cursor-pointer" onClick={() => setSelectedClass(cls)}>
                         {/* Timeline line */}
                         {i !== todaysClasses.length - 1 && <div className="absolute left-[19px] top-8 bottom-[-16px] w-0.5 bg-gray-100"></div>}
                         
                         <div className={`w-10 h-10 rounded-full ${cls.color} bg-opacity-10 text-${cls.color.split('-')[1]}-600 flex items-center justify-center font-bold text-xs shrink-0`}>
                            {cls.icon}
                         </div>
                         <div>
                            <div className="text-xs font-bold text-gray-900 hover:text-indigo-600 transition-colors">{cls.title}</div>
                            <div className="text-[11px] text-gray-500">{cls.schedule.split(' - ')[0]} • Room 302</div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>

             {/* Notices Widget */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 mb-4 text-sm">Notice Board</h3>
                <div className="space-y-4">
                   {notices.map(notice => (
                      <div key={notice.id} className="group cursor-pointer">
                         <div className="flex items-start gap-2 mb-1">
                            <span className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${notice.type === 'exam' ? 'bg-red-500' : notice.type === 'event' ? 'bg-purple-500' : 'bg-blue-500'}`}></span>
                            <p className="text-xs font-medium text-gray-800 group-hover:text-blue-600 leading-snug transition-colors">{notice.title}</p>
                         </div>
                         <p className="text-[10px] text-gray-400 pl-4">{notice.date}</p>
                      </div>
                   ))}
                </div>
                <button className="w-full mt-4 py-2 text-xs font-bold text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">View All Notices</button>
             </div>

             {/* Attendance Alert */}
             <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                <div className="flex items-start gap-3">
                   <svg className="w-5 h-5 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                   <div>
                      <h4 className="text-xs font-bold text-amber-800">Low Attendance Warning</h4>
                      <p className="text-[11px] text-amber-700 mt-1 leading-relaxed">Your attendance in <span className="font-bold">Computer Networks</span> is 64%. Please attend upcoming classes to avoid debarment.</p>
                   </div>
                </div>
             </div>

          </aside>

        </div>
      </div>

      {/* Transcript Modal */}
      {transcriptOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setTranscriptOpen(false)}></div>
           <div className="bg-white rounded-2xl w-full max-w-lg relative z-10 p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
              <h3 className="text-xl font-bold mb-4">Academic Transcript</h3>
              <div className="space-y-3">
                 {[1,2,3,4,5].map(sem => (
                    <div key={sem} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                       <span className="font-medium text-sm">Semester {sem}</span>
                       <div className="flex gap-4 text-sm">
                          <span className="text-gray-500">Credits: 22</span>
                          <span className="font-bold text-indigo-600">SGPA: {8.0 + (sem * 0.1)}</span>
                       </div>
                    </div>
                 ))}
              </div>
              <div className="mt-6 flex justify-end gap-3">
                 <button onClick={() => setTranscriptOpen(false)} className="px-4 py-2 text-gray-600 font-bold text-sm hover:bg-gray-100 rounded-lg">Close</button>
                 <button className="px-4 py-2 bg-indigo-600 text-white font-bold text-sm rounded-lg shadow-md hover:bg-indigo-700">Download PDF</button>
              </div>
           </div>
        </div>
      )}

      {/* Class Details Modal */}
      {selectedClass && (
        <ClassDetailsModal 
          cls={selectedClass} 
          onClose={() => setSelectedClass(null)} 
        />
      )}

      {/* Assignment Upload Modal */}
      {uploadingAssignment && (
        <AssignmentUploadModal 
          assignment={uploadingAssignment} 
          onClose={() => setUploadingAssignment(null)} 
          onSubmit={handleUploadSubmit}
        />
      )}

    </div>
  );
}

/* -------------------- Sub-components -------------------- */

function CourseCard({ cls, onClick }) {
  const attendancePercent = Math.round((cls.attendance.present / cls.attendance.total) * 100);
  const attendanceColor = getAttendanceColor(attendancePercent);

  return (
    <div 
      onClick={onClick}
      className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group cursor-pointer"
    >
       <div className={`absolute top-0 left-0 w-1 h-full ${cls.color}`}></div>
       <div className="flex justify-between items-start mb-3 pl-3">
          <div>
             <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{cls.title}</h3>
             <p className="text-xs text-gray-500">{cls.code} • {cls.credits} Credits</p>
          </div>
          <div className={`text-[10px] font-bold px-2 py-1 rounded ${attendanceColor}`}>
             {attendancePercent}% Att.
          </div>
       </div>
       
       <div className="pl-3 mb-4">
          <div className="text-xs text-gray-600 flex items-center gap-1.5 mb-1">
             <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
             {cls.instructor}
          </div>
          <div className="text-xs text-gray-600 flex items-center gap-1.5">
             <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
             {cls.schedule}
          </div>
       </div>

       <div className="pl-3 mt-auto pt-3 border-t border-gray-50 flex justify-between items-center">
          {cls.grade ? (
             <span className="text-xs font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">Grade: {cls.grade}</span>
          ) : (
             <span className="text-[10px] text-gray-400 uppercase tracking-wide font-bold">In Progress</span>
          )}
          <button className="text-indigo-600 text-xs font-bold hover:underline opacity-0 group-hover:opacity-100 transition-opacity">View Details</button>
       </div>
    </div>
  );
}

function AssignmentItem({ assignment, onUpload }) {
  const isLate = assignment.status === "late";
  const isSubmitted = assignment.status === "submitted" || assignment.status === "graded";

  return (
    <div className="p-4 flex items-start gap-4 hover:bg-gray-50 transition-colors">
       <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-bold text-sm ${isLate ? 'bg-red-100 text-red-600' : isSubmitted ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
          {isSubmitted ? '✓' : isLate ? '!' : 'A'}
       </div>
       <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
             <h4 className="text-sm font-bold text-gray-900 truncate">{assignment.title}</h4>
             <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isLate ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                {isSubmitted ? 'Done' : isLate ? 'Overdue' : 'Pending'}
             </span>
          </div>
          <p className="text-xs text-gray-500 mb-2">{assignment.courseName} • Max Marks: {assignment.maxMarks}</p>
          
          {!isSubmitted && (
             <div className="flex items-center gap-3">
                <span className={`text-xs ${isLate ? 'text-red-600 font-bold' : 'text-gray-500'}`}>Due: {formatDate(assignment.dueDate)}</span>
                <button 
                  onClick={onUpload}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 border border-indigo-200 px-3 py-1 rounded hover:bg-indigo-50 transition-colors"
                >
                   Upload
                </button>
             </div>
          )}
          {isSubmitted && assignment.score && (
             <div className="text-xs font-bold text-green-600">Score: {assignment.score}/{assignment.maxMarks}</div>
          )}
       </div>
    </div>
  );
}

function ClassDetailsModal({ cls, onClose }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white rounded-2xl w-full max-w-lg relative z-10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className={`h-24 ${cls.color} relative`}>
          <button onClick={onClose} className="absolute top-4 right-4 bg-black/20 text-white p-1 rounded-full hover:bg-black/30 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className="absolute -bottom-8 left-6 w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center text-2xl font-bold text-gray-700 border-4 border-white">
            {cls.icon}
          </div>
        </div>
        <div className="pt-10 px-6 pb-6">
          <h2 className="text-2xl font-bold text-gray-900">{cls.title}</h2>
          <p className="text-sm text-gray-500 font-medium mb-4">{cls.code} • {cls.credits} Credits</p>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div className="text-xs text-gray-500 uppercase font-bold">Section</div>
                <div className="text-sm font-semibold text-gray-900">{cls.section}</div>
              </div>
              <div className="flex-1 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div className="text-xs text-gray-500 uppercase font-bold">Department</div>
                <div className="text-sm font-semibold text-gray-900">{cls.department}</div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-1">Description</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{cls.description}</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-700 pt-2 border-t border-gray-100">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{cls.schedule} ({cls.days.join(", ")})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AssignmentUploadModal({ assignment, onClose, onSubmit }) {
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) onSubmit(file);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white rounded-2xl w-full max-w-md relative z-10 shadow-2xl p-6 animate-in fade-in zoom-in duration-200">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Upload Assignment</h2>
        <p className="text-sm text-gray-500 mb-6">{assignment.title}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
            <input 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => setFile(e.target.files[0])}
            />
            {file ? (
              <div className="flex items-center gap-2 text-blue-600 font-medium">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {file.name}
              </div>
            ) : (
              <>
                <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                <div className="text-sm text-gray-600 font-medium">Click to upload or drag file here</div>
                <div className="text-xs text-gray-400 mt-1">PDF, DOCX, ZIP (Max 10MB)</div>
              </>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 font-semibold text-sm hover:bg-gray-100 rounded-lg">Cancel</button>
            <button 
              type="submit" 
              disabled={!file}
              className={`px-4 py-2 bg-indigo-600 text-white font-bold text-sm rounded-lg shadow-sm ${!file ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}