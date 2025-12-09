import React, { useEffect, useMemo, useState } from "react";

// --- MOCK DATA PROVIDED BY USER ---
const COURSES_MOCK_DATA = [
  {
    id: "yt001",
    title: "CS50's Introduction to Computer Science",
    type: "youtube",
    provider: "Harvard University",
    author: "David J. Malan",
    description: "An introduction to the intellectual enterprises of computer science and the art of programming.",
    numVideos: 11,
    estimatedHours: 25,
    price: 0,
    currency: "INR",
    level: "Beginner",
    language: "English",
    tags: ["CS50", "Computer Science", "C", "Python"],
    rating: 4.9,
    reviewsCount: 15000,
    enrolledCount: 5000000,
    lastUpdated: "2024-01-01",
    image: "https://i.ytimg.com/vi/8mAITcNt710/maxresdefault.jpg",
  },
  {
    id: "yt002",
    title: "React JS - Full Course for Beginners",
    type: "youtube",
    provider: "freeCodeCamp",
    author: "Bob Ziroll",
    description: "Learn React JS from scratch in this full course. You will learn about components, props, state, hooks, and build a project.",
    numVideos: 1,
    estimatedHours: 12,
    price: 0,
    currency: "INR",
    level: "Intermediate",
    tags: ["React", "JavaScript", "Frontend"],
    rating: 4.8,
    reviewsCount: 8500,
    enrolledCount: 2100000,
    lastUpdated: "2023-12-10",
    image: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 300'%3E%3Crect fill='%2361dafb' width='500' height='300'/%3E%3Ctext x='250' y='150' font-size='48' font-weight='bold' fill='white' text-anchor='middle' dominant-baseline='middle'%3EReact.js%3C/text%3E%3C/svg%3E",
  },
  {
    id: "yt003",
    title: "Python for Beginners - Full Course",
    type: "youtube",
    provider: "Programming with Mosh",
    author: "Mosh Hamedani",
    description: "Python tutorial for beginners.",
    numVideos: 1,
    estimatedHours: 6,
    price: 0,
    currency: "INR",
    level: "Beginner",
    tags: ["Python", "Coding", "Backend"],
    rating: 4.9,
    reviewsCount: 45000,
    enrolledCount: 3500000,
    lastUpdated: "2024-02-15",
    image: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 300'%3E%3Crect fill='%233776ab' width='500' height='300'/%3E%3Ctext x='250' y='150' font-size='48' font-weight='bold' fill='%23ffd43b' text-anchor='middle' dominant-baseline='middle'%3EPython%3C/text%3E%3C/svg%3E",
  },
  {
    id: "yt004",
    title: "Figma UI Design Tutorial",
    type: "youtube",
    provider: "Envato Tuts+",
    author: "Daniel White",
    description: "Learn UI Design using Figma.",
    numVideos: 1,
    estimatedHours: 8,
    price: 0,
    currency: "INR",
    level: "Beginner",
    tags: ["Figma", "UI Design", "Design"],
    rating: 4.7,
    reviewsCount: 5600,
    enrolledCount: 980000,
    lastUpdated: "2024-01-20",
    image: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 300'%3E%3Crect fill='%239b59f0' width='500' height='300'/%3E%3Ctext x='250' y='150' font-size='48' font-weight='bold' fill='white' text-anchor='middle' dominant-baseline='middle'%3EFigma Design%3C/text%3E%3C/svg%3E",
  },
  {
    id: "yt005",
    title: "Data Science with Python",
    type: "youtube",
    provider: "Simplilearn",
    author: "Simplilearn Team",
    description: "Complete Data Science course covering pandas, NumPy, matplotlib.",
    numVideos: 1,
    estimatedHours: 15,
    price: 499,
    currency: "INR",
    level: "Intermediate",
    tags: ["Data Science", "Python", "Analytics"],
    rating: 4.6,
    reviewsCount: 3200,
    enrolledCount: 450000,
    lastUpdated: "2024-02-01",
    image: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 300'%3E%3Crect fill='%231f77b4' width='500' height='300'/%3E%3Ctext x='250' y='150' font-size='40' font-weight='bold' fill='white' text-anchor='middle' dominant-baseline='middle'%3EData Science%3C/text%3E%3C/svg%3E",
  },
  {
    id: "yt006",
    title: "Web Development with Node.js",
    type: "youtube",
    provider: "The Net Ninja",
    author: "Shaun Pelling",
    description: "Build modern web applications with Node.js and Express.",
    numVideos: 1,
    estimatedHours: 18,
    price: 299,
    currency: "INR",
    level: "Intermediate",
    tags: ["Node.js", "Backend", "Web Development"],
    rating: 4.8,
    reviewsCount: 6800,
    enrolledCount: 1800000,
    lastUpdated: "2024-02-10",
    image: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 300'%3E%3Crect fill='%23339933' width='500' height='300'/%3E%3Ctext x='250' y='150' font-size='48' font-weight='bold' fill='white' text-anchor='middle' dominant-baseline='middle'%3ENode.js%3C/text%3E%3C/svg%3E",
  }
];

// --- MOCK COMPONENTS ---
const Navbar = ({ user, onToggleSidebar }) => (
  <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 sticky top-0 z-50">
    <div className="flex items-center gap-4">
      <button onClick={onToggleSidebar} className="lg:hidden text-gray-500 hover:text-gray-700">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>
      <span className="text-xl font-bold text-indigo-900">Creator Studio</span>
    </div>
    <div className="flex items-center gap-4">
      <div className="text-right hidden sm:block">
        <p className="text-sm font-bold text-gray-900">{user?.name}</p>
        <p className="text-xs text-gray-500">Instructor</p>
      </div>
      <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-lg">
        {user?.name ? user.name.charAt(0) : "P"}
      </div>
    </div>
  </div>
);

const Sidebar = ({ open, onClose, activeTab, setActiveTab }) => (
  <div className={`fixed inset-0 z-50 lg:hidden ${open ? "block" : "hidden"}`}>
    <div className="absolute inset-0 bg-indigo-900/50 backdrop-blur-sm" onClick={onClose} />
    <div className="absolute left-0 top-0 bottom-0 w-64 bg-white p-6 shadow-xl border-r border-gray-200">
      <h2 className="text-xl font-bold mb-6 text-indigo-900">Menu</h2>
      <nav className="space-y-2">
        {["Overview", "My Courses", "Student Q&A", "Earnings", "Settings"].map(tab => (
            <div 
                key={tab}
                onClick={() => { setActiveTab(tab); onClose(); }}
                className={`px-4 py-3 rounded-lg cursor-pointer font-medium transition-colors ${activeTab === tab ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
            >
                {tab}
            </div>
        ))}
      </nav>
    </div>
  </div>
);

// Utilities
const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 3 }).format(amount);
const formatCompactNumber = (number) => new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(number);

// --- HELPER COMPONENTS FOR FORMS (Outside to prevent re-render issues) ---
const InputGroup = ({ label, name, value, onChange, type = "text", placeholder, colSpan = "col-span-1" }) => (
  <div className={colSpan}>
    <label className="block text-xs font-bold text-gray-700 mb-1 capitalize">{label}</label>
    <input 
      type={type} 
      name={name} 
      value={value} 
      onChange={onChange} 
      step={type === "number" ? "any" : undefined}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-gray-50 focus:bg-white transition-colors" 
      placeholder={placeholder} 
    />
  </div>
);

const SelectGroup = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block text-xs font-bold text-gray-700 mb-1 capitalize">{label}</label>
    <select name={name} value={value} onChange={onChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

/* -------------------- Main Component -------------------- */
export default function PublisherDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
  
  // Data State
  const [user, setUser] = useState(null);
  const [overview, setOverview] = useState(null);
  const [courses, setCourses] = useState([]);
  const [activities, setActivities] = useState([]);

  // UI State
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [analyticsModalOpen, setAnalyticsModalOpen] = useState(false);
  const [selectedCourseAnalytics, setSelectedCourseAnalytics] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");

  // --- Data Fetching ---
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        await new Promise(r => setTimeout(r, 800)); // Simulate API
        
        // 1. Map the external COURSES_MOCK_DATA to the internal structure expected by this dashboard
        const mappedCourses = COURSES_MOCK_DATA.map(course => ({
           ...course,
           // Mapping fields to match dashboard expectations
           students: course.enrolledCount, 
           status: Math.random() > 0.8 ? "Draft" : "Published",
           revenue: course.price > 0 ? course.price * (course.enrolledCount * 0.05) : 0, 
        }));

        const totalRev = mappedCourses.reduce((acc, c) => acc + c.revenue, 0);
        const totalEnrollments = mappedCourses.reduce((acc, c) => acc + c.students, 0);

        setUser({
            name: "Alex Dev",
            role: "Content Publisher",
            email: "alex@example.com",
            bio: "Senior Fullstack Developer with 10 years of experience teaching web technologies.",
            totalStudents: totalEnrollments,
            averageRating: 4.8,
        });

        setOverview({
            totalRevenue: totalRev,
            totalEnrollments: totalEnrollments,
            revenueTrend: [12, 15, 25, 18, 30, 45, 38, 55, 60],
        });

        setCourses(mappedCourses);
        setActivities([
            { id: 1, text: "New enrollment in React JS", time: "2 mins ago", type: "sale" },
            { id: 2, text: "Review on Python Course", time: "1 hour ago", type: "review" },
            { id: 3, text: "Updated Figma Tutorial", time: "2 days ago", type: "edit" },
        ]);

      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // --- Actions ---
  const handleSaveCourse = (courseData) => {
    // Logic to ensure derived fields match the mock data structure
    const processedData = {
      ...courseData,
      // Ensure dashboard specific variables are synced with mock data variables
      students: Number(courseData.enrolledCount || 0),
      revenue: courseData.price > 0 ? Number(courseData.price) * (Number(courseData.enrolledCount) * 0.05) : 0, 
      id: courseData.id || `custom_${Date.now()}`,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    if (editingCourse) {
      setCourses(prev => prev.map(c => c.id === processedData.id ? { ...c, ...processedData } : c));
    } else {
      setCourses(prev => [processedData, ...prev]);
    }
    setCourseModalOpen(false);
    setEditingCourse(null);
  };

  const handleDeleteCourse = (id) => {
    if(confirm("Are you sure? This cannot be undone.")) {
      setCourses(prev => prev.filter(c => c.id !== id));
    }
  };

  const togglePublishStatus = (id) => {
    setCourses(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, status: c.status === "Published" ? "Draft" : "Published" };
      }
      return c;
    }));
  };

  // --- Derived ---
  const filteredCourses = useMemo(() => {
    if (filterStatus === "All") return courses;
    return courses.filter(c => c.status === filterStatus);
  }, [courses, filterStatus]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
           <div className="h-12 w-12 bg-indigo-200 rounded-full"></div>
           <div className="h-4 w-32 bg-indigo-200 rounded"></div>
        </div>
      </div>
    );
  }

  // --- RENDER CONTENT BASED ON TAB ---
  const renderContent = () => {
      switch (activeTab) {
        case "Overview":
            return (
                <div className="space-y-6">
                    <div className="bg-indigo-900 rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Welcome back, {user.name}! 👋</h2>
                            <p className="text-indigo-200">Your courses have reached {formatCompactNumber(overview.totalEnrollments)} students this month.</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center min-w-[100px]">
                                <div className="text-2xl font-bold">{courses.length}</div>
                                <div className="text-xs text-indigo-200 uppercase">Courses</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center min-w-[100px]">
                                <div className="text-2xl font-bold">4.8</div>
                                <div className="text-xs text-indigo-200 uppercase">Rating</div>
                            </div>
                        </div>
                    </div>
                    {/* Metrics Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <StatCard title="Total Revenue" value={formatCompactNumber(overview.totalRevenue)} trend="Estimated" positive={true} />
                        <StatCard title="Active Enrollments" value={formatCompactNumber(overview.totalEnrollments)} trend="+5% this week" positive={true} />
                        <StatCard title="Avg. Course Rating" value={user.averageRating} trend="Top 5% Instructor" positive={true} />
                    </div>
                </div>
            );
        case "My Courses":
            return (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                     {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Course Manager</h1>
                            <p className="text-sm text-gray-500">Manage your content from external providers.</p>
                        </div>
                        <button 
                            onClick={() => { setEditingCourse(null); setCourseModalOpen(true); }}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-bold text-sm shadow-md transition-all flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                            Add Resource
                        </button>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2">
                        {["All", "Published", "Draft"].map(status => (
                            <button 
                                key={status} 
                                onClick={() => setFilterStatus(status)}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-colors whitespace-nowrap ${filterStatus === status ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>

                    {/* Course List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.map(course => (
                            <CourseManageCard 
                                key={course.id} 
                                course={course} 
                                onEdit={() => { setEditingCourse(course); setCourseModalOpen(true); }}
                                onDelete={() => handleDeleteCourse(course.id)}
                                onToggleStatus={() => togglePublishStatus(course.id)}
                                onViewAnalytics={() => { setSelectedCourseAnalytics(course); setAnalyticsModalOpen(true); }}
                            />
                        ))}
                    </div>
                </div>
            );
        case "Student Q&A":
            return <QASection />;
        case "Earnings":
            return <EarningsSection revenue={overview.totalRevenue} trend={overview.revenueTrend} />;
        case "Settings":
            return <SettingsSection user={user} />;
        default:
            return null;
      }
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans text-gray-800">
      
      {/* Navbar */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <Navbar user={{ name: user?.name }} onToggleSidebar={() => setSidebarOpen(true)} />
      </div>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex justify-center w-full px-4 pt-6 pb-12">
        <div className="flex w-full max-w-[1600px] gap-6 items-start">
          
          {/* ======================= 
              LEFT SIDEBAR (Navigation & Quick Stats) 
             ======================= */}
          <aside className="hidden lg:block w-64 shrink-0 sticky top-24 space-y-6">
              
             {/* Profile Card */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                <div className="w-20 h-20 mx-auto bg-indigo-100 rounded-full flex items-center justify-center text-3xl font-bold text-indigo-600 mb-3 border-4 border-white shadow-sm">
                   {user.name.charAt(0)}
                </div>
                <h2 className="text-lg font-bold text-gray-900">{user.name}</h2>
                <p className="text-xs text-gray-500 mb-4">{user.role}</p>
                <div className="grid grid-cols-2 gap-2 border-t border-gray-100 pt-4">
                   <div>
                      <div className="text-lg font-bold text-gray-900">{formatCompactNumber(overview.totalRevenue)}</div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-wide">Rev (Est)</div>
                   </div>
                   <div>
                      <div className="text-lg font-bold text-gray-900">{formatCompactNumber(user.totalStudents)}</div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-wide">Students</div>
                   </div>
                </div>
             </div>

             {/* Quick Navigation */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
                {[
                   { label: "Overview", badge: null },
                   { label: "My Courses", badge: null },
                   { label: "Student Q&A", badge: 5 },
                   { label: "Earnings", badge: null },
                   { label: "Settings", badge: null }
                ].map(item => (
                   <button 
                        key={item.label} 
                        onClick={() => setActiveTab(item.label)}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium flex justify-between items-center transition-colors ${activeTab === item.label ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                   >
                      {item.label}
                      {item.badge && <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{item.badge}</span>}
                   </button>
                ))}
             </div>

          </aside>

          {/* ======================= 
              CENTER (Dynamic Content) 
             ======================= */}
          <main className="flex-1 min-w-0">
             {renderContent()}
          </main>

          {/* ======================= 
              RIGHT SIDEBAR (Activity & Growth) 
             ======================= */}
          <aside className="hidden xl:block w-80 shrink-0 sticky top-24 space-y-6">
            
            {/* Revenue Trend */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
               <h3 className="font-bold text-gray-900 mb-4 text-sm">Revenue Trend</h3>
               <div className="h-24 flex items-end gap-1 px-2">
                  {overview.revenueTrend.map((val, i) => (
                     <div key={i} className="flex-1 bg-green-50 hover:bg-green-100 rounded-t transition-colors relative group" style={{ height: `${val}%` }}>
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                           {val}k
                        </div>
                     </div>
                  ))}
               </div>
               <div className="flex justify-between mt-2 text-[10px] text-gray-400 uppercase tracking-wide">
                  <span>Start</span>
                  <span>Today</span>
               </div>
            </div>

            {/* Live Activity Feed */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-900 text-sm">Live Activity</h3>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
               </div>
               <div className="space-y-4">
                  {activities.map(act => (
                     <div key={act.id} className="flex gap-3 items-start">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 ${act.type === 'sale' ? 'bg-green-100 text-green-700' : act.type === 'review' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>
                           {act.type === 'sale' ? '💰' : act.type === 'review' ? '⭐' : 'ℹ️'}
                        </div>
                        <div>
                           <p className="text-xs text-gray-800 font-medium leading-snug">{act.text}</p>
                           <p className="text-[10px] text-gray-400 mt-0.5">{act.time}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Promo / Tips */}
            <div className="bg-gradient-to-br from-indigo-800 to-blue-900 rounded-xl p-5 text-white shadow-lg">
               <h3 className="font-bold text-sm mb-2">Instructor Tips</h3>
               <p className="text-indigo-100 text-xs mb-3">Adding quizzes to your course can increase student retention by 40%.</p>
               <button className="text-xs font-bold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition-colors">Read Guide</button>
            </div>

          </aside>

        </div>
      </div>

      {/* Course Modal */}
      {courseModalOpen && (
         <CourseEditModal 
            course={editingCourse} 
            onClose={() => setCourseModalOpen(false)} 
            onSave={handleSaveCourse}
         />
      )}

      {/* Analytics Modal */}
      {analyticsModalOpen && (
         <CourseAnalyticsModal 
            course={selectedCourseAnalytics} 
            onClose={() => { setAnalyticsModalOpen(false); setSelectedCourseAnalytics(null); }}
         />
      )}

    </div>
  );
}

/* -------------------- VIEW COMPONENTS -------------------- */

// 1. Student Q&A View
function QASection() {
    const questions = [
        { id: 1, user: "Rahul S.", avatar: "R", course: "React JS Full Course", question: "How do I pass props between sibling components?", time: "2 hours ago" },
        { id: 2, user: "Sarah J.", avatar: "S", course: "Python for Beginners", question: "I'm getting an indentation error in loop.py on line 4.", time: "5 hours ago" },
        { id: 3, user: "Mike T.", avatar: "M", course: "Figma UI Design", question: "Can we export assets as SVG in the free version?", time: "1 day ago" },
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h1 className="text-2xl font-bold text-gray-900">Student Questions</h1>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {questions.map((q, i) => (
                    <div key={q.id} className={`p-6 flex gap-4 ${i !== questions.length - 1 ? 'border-b border-gray-100' : ''}`}>
                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0">{q.avatar}</div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-gray-900 text-sm">{q.user}</h3>
                                <span className="text-xs text-gray-400">{q.time}</span>
                            </div>
                            <p className="text-xs text-indigo-600 font-medium mb-2">{q.course}</p>
                            <p className="text-sm text-gray-600 mb-4">{q.question}</p>
                            <button className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded border border-indigo-200 transition-colors">Reply</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// 2. Earnings View
function EarningsSection({ revenue, trend }) {
    const transactions = [
        { id: "TX123", date: "Oct 24, 2025", amount: 45000, status: "Paid", type: "Monthly Payout" },
        { id: "TX122", date: "Sep 24, 2025", amount: 42300, status: "Paid", type: "Monthly Payout" },
        { id: "TX121", date: "Aug 24, 2025", amount: 38900, status: "Paid", type: "Monthly Payout" },
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h1 className="text-2xl font-bold text-gray-900">Earnings & Payouts</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-indigo-900 rounded-xl p-6 text-white shadow-lg">
                    <p className="text-indigo-200 text-sm font-medium uppercase tracking-wide mb-1">Total Lifetime Revenue</p>
                    <h2 className="text-4xl font-bold">{formatCurrency(revenue)}</h2>
                    <div className="mt-6 flex items-center gap-2 text-sm text-indigo-200">
                        <span className="bg-green-500/20 text-green-300 px-2 py-0.5 rounded text-xs font-bold">+12%</span>
                        <span>increase from last month</span>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                     <h3 className="font-bold text-gray-900 mb-4">Payout Method</h3>
                     <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-sm">🏦</div>
                        <div>
                            <p className="font-bold text-gray-900 text-sm">HDFC Bank **** 8892</p>
                            <p className="text-xs text-gray-500">Primary Account</p>
                        </div>
                        <button className="ml-auto text-xs font-bold text-indigo-600 hover:underline">Edit</button>
                     </div>
                </div>
            </div>

            <h3 className="font-bold text-gray-900 mt-4">Transaction History</h3>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 font-semibold">Date</th>
                            <th className="px-6 py-3 font-semibold">Description</th>
                            <th className="px-6 py-3 font-semibold">Amount</th>
                            <th className="px-6 py-3 font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {transactions.map(tx => (
                            <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-gray-600">{tx.date}</td>
                                <td className="px-6 py-4 font-medium text-gray-900">{tx.type} <span className="text-xs text-gray-400 block">{tx.id}</span></td>
                                <td className="px-6 py-4 font-bold text-gray-900">{formatCurrency(tx.amount)}</td>
                                <td className="px-6 py-4">
                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">{tx.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// 3. Settings View
function SettingsSection({ user }) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-2xl">
            <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-2xl font-bold text-indigo-600">
                        {user.name.charAt(0)}
                    </div>
                    <div>
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">Change Avatar</button>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                        <input type="text" defaultValue={user.name} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                        <input type="email" defaultValue={user.email} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Bio</label>
                        <textarea rows="4" defaultValue={user.bio} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <button className="px-6 py-2 bg-indigo-600 text-white font-bold text-sm rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">Save Changes</button>
                </div>
            </div>
        </div>
    );
}


/* -------------------- Sub-components (Cards & Modals) -------------------- */

function StatCard({ title, value, trend, positive }) {
   return (
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
         <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">{title}</p>
         <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
         <p className={`text-[10px] font-medium mt-1 ${positive ? 'text-green-600' : 'text-red-600'}`}>{trend}</p>
      </div>
   );
}

function CourseManageCard({ course, onEdit, onDelete, onToggleStatus, onViewAnalytics }) {
   return (
      <div onClick={onViewAnalytics} className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-indigo-300 transition-all duration-300 flex flex-col cursor-pointer overflow-hidden h-full">
        
        {/* Thumbnail Area */}
        <div className="h-44 w-full relative overflow-hidden bg-gray-100">
           <img 
             src={course.image} 
             alt={course.title} 
             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
             onError={(e) => {
               e.target.onerror = null; 
               e.target.src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 300'%3E%3Crect fill='%23e5e7eb' width='500' height='300'/%3E%3Ctext x='250' y='150' font-size='40' font-weight='bold' fill='%23999' text-anchor='middle' dominant-baseline='middle'%3ECourse%3C/text%3E%3C/svg%3E";
             }}
           />
           
           {/* Status Badge */}
           <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide text-gray-800 shadow-sm border border-gray-100">
              {course.status}
           </div>

           {/* Provider Badge (New) */}
           {course.provider && (
               <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white font-medium flex items-center gap-1">
                   <span>{course.provider}</span>
               </div>
           )}
        </div>

        <div className="p-5 flex-1 flex flex-col">
           {/* Meta */}
           <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{course.level}</span>
              <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                 <span>★ {course.rating}</span>
                 <span className="text-gray-400 font-normal">({formatCompactNumber(course.reviewsCount)})</span>
              </div>
           </div>

           {/* Title */}
           <h3 className="text-sm font-bold text-gray-900 leading-snug mb-1 group-hover:text-indigo-600 transition-colors line-clamp-2">
              {course.title}
           </h3>
           <p className="text-xs text-gray-500 line-clamp-1 mb-2">by {course.author}</p>

           {/* Stats */}
           <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
              <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> {course.numVideos} Videos</span>
              <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> {course.estimatedHours}h</span>
           </div>

           {/* Footer */}
           <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
              <div>
                 {course.price > 0 ? (
                    <div className="flex flex-col">
                       <span className="text-xs text-gray-400">₹{course.price}</span>
                       <span className="font-bold text-gray-900 text-xs">{formatCompactNumber(course.students)} enrolled</span>
                    </div>
                 ) : (
                    <div className="flex flex-col">
                        <span className="font-bold text-green-600 text-sm">Free</span>
                        <span className="text-xs text-gray-400">{formatCompactNumber(course.students)} enrolled</span>
                    </div>
                 )}
              </div>
              
              <button 
                 onClick={(e) => { e.stopPropagation(); onEdit(); }}
                 className="px-3 py-2 rounded-lg text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-sm"
              >
                 Edit
              </button>
           </div>

           {/* Action Buttons - Additional */}
           <div className="flex items-center gap-2 pt-3 border-t border-gray-100 mt-3">
              <button onClick={(e) => { e.stopPropagation(); onToggleStatus(); }} className="flex-1 px-2 py-1.5 border border-gray-200 rounded text-[10px] font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                 {course.status === 'Published' ? 'Unpublish' : 'Publish'}
              </button>
              <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="px-2 py-1.5 text-[10px] font-bold text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors">Delete</button>
           </div>
        </div>
      </div>
   );
}

function CourseEditModal({ course, onClose, onSave }) {
   const [form, setForm] = useState(() => ({
     id: course?.id || "",
     title: course?.title || "",
     image: course?.image || "",
     externalUrl: course?.externalUrl || "",
     type: course?.type || "youtube",
     provider: course?.provider || "",
     author: course?.author || "",
     category: course?.category || "Development",
     description: course?.description || "",
     level: course?.level || "Beginner",
     language: course?.language || "English",
     tags: course?.tags?.join(", ") || "",
     price: course?.price || 0,
     currency: course?.currency || "INR",
     numVideos: course?.numVideos || 0,
     estimatedHours: course?.estimatedHours || 0,
     rating: course?.rating || 4.5,
     reviewsCount: course?.reviewsCount || 0,
     enrolledCount: course?.enrolledCount || 0,
     hasCertificate: course?.hasCertificate || false,
     hasLifetimeAccess: course?.hasLifetimeAccess || true,
     status: course?.status || "Draft"
   }));

   const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setForm(prev => ({
         ...prev,
         [name]: type === 'checkbox' ? checked : value
      }));
   };

   const handleSubmit = (e) => {
     e.preventDefault();
     onSave({
         ...course,
         ...form,
         tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
         price: Number(form.price),
         numVideos: Number(form.numVideos),
         estimatedHours: Number(form.estimatedHours),
         rating: Number(form.rating),
         reviewsCount: Number(form.reviewsCount),
         enrolledCount: Number(form.enrolledCount),
     });
   };

   return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
         <div className="absolute inset-0 bg-indigo-900/60 backdrop-blur-sm" onClick={onClose} />
         
         <div className="bg-white rounded-2xl w-full max-w-4xl relative z-10 shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
               <div>
                  <h2 className="text-lg font-bold text-gray-900">{course ? "Edit Resource" : "Add New Resource"}</h2>
                  <p className="text-xs text-gray-500">Edit all mock data fields directly</p>
               </div>
               <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
               </button>
            </div>
            
            {/* Scrollable Form Content */}
            <div className="overflow-y-auto p-6 flex-1 custom-scrollbar">
               <form id="courseForm" onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Section: Basic Identity */}
                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                     <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-3 border-b border-gray-100 pb-2">Basic Info</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputGroup label="Course Title" name="title" value={form.title} onChange={handleChange} colSpan="md:col-span-2" placeholder="e.g. CS50 Introduction" />
                        <InputGroup label="Image URL" name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
                        <InputGroup label="External Link (URL)" name="externalUrl" value={form.externalUrl} onChange={handleChange} placeholder="https://youtube.com/..." />
                        <div className="md:col-span-2">
                           <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                           <textarea name="description" value={form.description} onChange={handleChange} rows="3" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none bg-gray-50 focus:bg-white" placeholder="Course description..." />
                        </div>
                     </div>
                  </div>

                  {/* Section: Provider & Classification */}
                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                     <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-3 border-b border-gray-100 pb-2">Provider & Category</h3>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <InputGroup label="Provider" name="provider" value={form.provider} onChange={handleChange} placeholder="e.g. Harvard" />
                        <InputGroup label="Author" name="author" value={form.author} onChange={handleChange} placeholder="e.g. David J. Malan" />
                        <SelectGroup label="Type" name="type" value={form.type} onChange={handleChange} options={["youtube", "udemy", "coursera", "internal"]} />
                        <SelectGroup label="Category" name="category" value={form.category} onChange={handleChange} options={["Development", "Design", "Business", "Marketing", "Data Science"]} />
                        <SelectGroup label="Level" name="level" value={form.level} onChange={handleChange} options={["Beginner", "Intermediate", "Advanced"]} />
                        <InputGroup label="Language" name="language" value={form.language} onChange={handleChange} />
                        <InputGroup label="Tags (comma separated)" name="tags" value={form.tags} onChange={handleChange} colSpan="md:col-span-2" placeholder="React, Coding, Web" />
                     </div>
                  </div>

                  {/* Section: Metrics & Mock Stats */}
                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                     <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-3 border-b border-gray-100 pb-2">Metrics & Mock Data</h3>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <InputGroup label="Price" name="price" type="number" value={form.price} onChange={handleChange} />
                        <InputGroup label="Currency" name="currency" value={form.currency} onChange={handleChange} />
                        <InputGroup label="Video Count" name="numVideos" type="number" value={form.numVideos} onChange={handleChange} />
                        <InputGroup label="Est. Hours" name="estimatedHours" type="number" value={form.estimatedHours} onChange={handleChange} />
                        
                        {/* Mock Stats */}
                        <InputGroup label="Rating (0-5)" name="rating" type="number" value={form.rating} onChange={handleChange} />
                        <InputGroup label="Review Count" name="reviewsCount" type="number" value={form.reviewsCount} onChange={handleChange} />
                        <InputGroup label="Enrolled Count" name="enrolledCount" type="number" value={form.enrolledCount} onChange={handleChange} />
                        <SelectGroup label="Status" name="status" value={form.status} onChange={handleChange} options={["Draft", "Published"]} />
                     </div>
                  </div>

                  {/* Section: Features (Checkboxes) */}
                  <div className="flex gap-6 px-2">
                     <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="hasCertificate" checked={form.hasCertificate} onChange={handleChange} className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300" />
                        <span className="text-sm font-medium text-gray-700">Has Certificate</span>
                     </label>
                     <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="hasLifetimeAccess" checked={form.hasLifetimeAccess} onChange={handleChange} className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300" />
                        <span className="text-sm font-medium text-gray-700">Lifetime Access</span>
                     </label>
                  </div>

               </form>
            </div>

            {/* Footer / Actions */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-end gap-3">
               <button type="button" onClick={onClose} className="px-5 py-2.5 text-gray-600 font-bold text-sm hover:bg-gray-200 rounded-lg transition-colors">Cancel</button>
               <button type="submit" form="courseForm" className="px-8 py-2.5 bg-indigo-600 text-white font-bold text-sm rounded-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 transform hover:-translate-y-0.5 transition-all">
                  {course ? "Save Changes" : "Create Resource"}
               </button>
            </div>
         </div>
      </div>
   );
}

function CourseAnalyticsModal({ course, onClose }) {
   if (!course) return null;

   const conversionRate = ((course.students / (course.students + Math.random() * 500)) * 100).toFixed(1);
   const avgCompletionRate = 72;
   const avgRating = course.rating;
   const monthlyRevenue = course.revenue / 12;
   
   return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
         <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
         <div className="bg-white rounded-2xl w-full max-w-2xl relative z-10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-6 text-white flex justify-between items-start">
               <div>
                  <h2 className="text-2xl font-bold mb-1">{course.title}</h2>
                  <p className="text-indigo-100 text-sm">Course Performance Analytics</p>
               </div>
               <button onClick={onClose} className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
               </button>
            </div>

            <div className="p-6 space-y-6">
               
               {/* Key Metrics */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <MetricCard label="Total Students" value={formatCompactNumber(course.students)} icon="👥" />
                  <MetricCard label="Revenue (Est)" value={formatCompactNumber(course.revenue)} icon="💰" />
                  <MetricCard label="Avg Rating" value={`${avgRating}/5 ⭐`} icon="⭐" />
                  <MetricCard label="Monthly Revenue" value={formatCompactNumber(monthlyRevenue)} icon="📊" />
               </div>

               {/* Engagement Metrics */}
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                     <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2">Conversion Rate</p>
                     <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-blue-700">{conversionRate}%</span>
                     </div>
                     <p className="text-xs text-blue-600 mt-2">% of visitors → enrollments</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                     <p className="text-xs font-bold text-green-600 uppercase tracking-wide mb-2">Completion Rate</p>
                     <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-green-700">{avgCompletionRate}%</span>
                     </div>
                     <p className="text-xs text-green-600 mt-2">of students complete course</p>
                  </div>
               </div>

               {/* Course Details */}
               <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">Course Details</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                     <div>
                        <p className="text-gray-500 text-xs font-semibold uppercase">Status</p>
                        <p className="font-bold text-gray-900 mt-1">{course.status}</p>
                     </div>
                     <div>
                        <p className="text-gray-500 text-xs font-semibold uppercase">Level</p>
                        <p className="font-bold text-gray-900 mt-1">{course.level}</p>
                     </div>
                     <div>
                        <p className="text-gray-500 text-xs font-semibold uppercase">Price</p>
                        <p className="font-bold text-gray-900 mt-1">{course.price > 0 ? formatCurrency(course.price) : 'Free'}</p>
                     </div>
                     <div>
                        <p className="text-gray-500 text-xs font-semibold uppercase">Duration</p>
                        <p className="font-bold text-gray-900 mt-1">{course.estimatedHours}h</p>
                     </div>
                     <div>
                        <p className="text-gray-500 text-xs font-semibold uppercase">Videos</p>
                        <p className="font-bold text-gray-900 mt-1">{course.numVideos}</p>
                     </div>
                     <div>
                        <p className="text-gray-500 text-xs font-semibold uppercase">Reviews</p>
                        <p className="font-bold text-gray-900 mt-1">{formatCompactNumber(course.reviewsCount)}</p>
                     </div>
                  </div>
               </div>

               {/* Performance Insights */}
               <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                     <span>💡</span> Insights & Recommendations
                  </h3>
                  <ul className="space-y-2 text-sm text-amber-800">
                     <li>✓ Your course is performing {avgRating >= 4.5 ? 'exceptionally well' : 'well'} with a {avgRating} rating</li>
                     <li>✓ {avgCompletionRate}% completion rate is above industry average (60%)</li>
                     <li>→ Consider adding interactive quizzes to increase engagement</li>
                     <li>→ Update course content quarterly to maintain relevance</li>
                  </ul>
               </div>

               {/* Close Button */}
               <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
                  <button onClick={onClose} className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors">
                     Close
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

function MetricCard({ label, value, icon }) {
   return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
         <div className="text-2xl mb-2">{icon}</div>
         <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{label}</p>
         <p className="text-lg font-bold text-gray-900">{value}</p>
      </div>
   );
}