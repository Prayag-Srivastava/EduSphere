import React from "react";

import Navbar from "../components/navbar.jsx";
import Hero from "../components/hero.jsx";
import Footer from "../components/footer.jsx";
import Trending from "../components/trending.jsx";
import Mentorship from "../components/mentorship.jsx";
import Internships from "../components/internships.jsx";
import JoinCollege from "../components/joincollege.jsx";
import Freshers from "../components/freshers.jsx";
import Feedback from "../components/feedback.jsx";
import Companies from "../components/companies.jsx";
import About from "../components/about.jsx";

export default function App() {
  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <Navbar />
      <Hero />
      <Trending />
      <Mentorship />
      <Internships />
      <JoinCollege />
      <Freshers />
      <Feedback />
      <Companies />
      <About />
      <Footer />
    </div>
  );
}




