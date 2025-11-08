import React, { useState } from "react";
import { Search, Filter, X, MessageCircle } from "lucide-react";
import Header from "../../components/common/Header";

// ===== Extended Sample Data =====
const coursesData = [
  {
    courseName: "B.Sc. Computer Science",
    collegeName: "MIT College, Pune",
    collegeLogo: "https://img.icons8.com/color/48/computer.png",
    duration: "3 Years",
    fee: "₹60,000/year",
    mode: "Offline",
    type: "Private",
    tags: ["Top Rated", "Popular"],
    overview:
      "Comprehensive Computer Science program covering algorithms, databases, and software development.",
    eligibility: "10+2 with Science background",
    admissionProcess: "Entrance Exam + Interview",
    location: "Pune",
  },
  {
    courseName: "B.A. Psychology",
    collegeName: "Global University, Delhi",
    collegeLogo: "https://img.icons8.com/color/48/psychology.png",
    duration: "3 Years",
    fee: "₹50,000/year",
    mode: "Online",
    type: "Private",
    tags: ["New", "Popular"],
    overview:
      "Learn behavioral science, mental health, and counseling techniques.",
    eligibility: "10+2 in any stream",
    admissionProcess: "Merit-based + Personal Interview",
    location: "Delhi",
  },
  {
    courseName: "B.Com Finance",
    collegeName: "National College, Mumbai",
    collegeLogo: "https://img.icons8.com/color/48/accounting.png",
    duration: "3 Years",
    fee: "₹45,000/year",
    mode: "Offline",
    type: "Government",
    tags: ["Top Rated"],
    overview:
      "Gain expertise in accounting, taxation, and financial management.",
    eligibility: "10+2 with Commerce/Math",
    admissionProcess: "Entrance Exam",
    location: "Mumbai",
  },
  {
    courseName: "B.Tech Mechanical Engineering",
    collegeName: "IIT Bombay",
    collegeLogo: "https://img.icons8.com/color/48/engineering.png",
    duration: "4 Years",
    fee: "₹1,50,000/year",
    mode: "Offline",
    type: "Government",
    tags: ["Top Rated", "Prestigious"],
    overview:
      "Mechanical design, manufacturing systems, thermodynamics, and robotics.",
    eligibility: "JEE Main + Advanced Qualification",
    admissionProcess: "Entrance Exam (JEE)",
    location: "Mumbai",
  },
  {
    courseName: "BBA Marketing",
    collegeName: "Symbiosis International, Pune",
    collegeLogo: "https://img.icons8.com/color/48/marketing.png",
    duration: "3 Years",
    fee: "₹90,000/year",
    mode: "Offline",
    type: "Private",
    tags: ["Popular"],
    overview:
      "Develop management skills with a focus on marketing, communication, and business operations.",
    eligibility: "10+2 in any stream",
    admissionProcess: "Entrance Exam + Interview",
    location: "Pune",
  },
  {
    courseName: "B.Sc. Data Science",
    collegeName: "Amity University, Noida",
    collegeLogo: "https://img.icons8.com/color/48/data-configuration.png",
    duration: "3 Years",
    fee: "₹80,000/year",
    mode: "Online",
    type: "Private",
    tags: ["Trending", "Tech Focused"],
    overview:
      "Learn AI, Machine Learning, Python, and statistical modeling techniques.",
    eligibility: "10+2 with Math",
    admissionProcess: "Merit + Interview",
    location: "Noida",
  },
  {
    courseName: "B.Des. UI/UX Design",
    collegeName: "NIFT Bangalore",
    collegeLogo: "https://img.icons8.com/color/48/design.png",
    duration: "4 Years",
    fee: "₹1,00,000/year",
    mode: "Offline",
    type: "Government",
    tags: ["Creative", "Design"],
    overview:
      "Focused on visual design, usability, and digital interface creativity.",
    eligibility: "10+2 in any stream",
    admissionProcess: "NIFT Entrance + Portfolio Review",
    location: "Bangalore",
  },
  {
    courseName: "BCA Cloud Computing",
    collegeName: "Lovely Professional University, Punjab",
    collegeLogo: "https://img.icons8.com/color/48/cloud.png",
    duration: "3 Years",
    fee: "₹70,000/year",
    mode: "Online",
    type: "Private",
    tags: ["Tech Focused", "New Age"],
    overview:
      "Covers cloud infrastructure, cybersecurity, and enterprise-level computing.",
    eligibility: "10+2 with Math or CS",
    admissionProcess: "Merit-based",
    location: "Punjab",
  },
];

function CoursesCollegeExplorer() {
  const [filters, setFilters] = useState({
    field: "",
    location: "",
    duration: "",
    feeRange: "",
    collegeType: "",
  });
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [sortBy, setSortBy] = useState("Popularity");
  const [visibleCount, setVisibleCount] = useState(6);

  // ===== Filter logic =====
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filterByFee = (fee) => {
    const numericFee = parseInt(fee.replace(/\D/g, ""));
    if (filters.feeRange === "₹0 - ₹50,000") return numericFee <= 50000;
    if (filters.feeRange === "₹50,001 - ₹1,00,000")
      return numericFee > 50000 && numericFee <= 100000;
    if (filters.feeRange === "₹1,00,001+") return numericFee > 100000;
    return true;
  };

  const filteredCourses = coursesData
    .filter(
      (c) =>
        (!filters.field ||
          c.courseName.toLowerCase().includes(filters.field.toLowerCase())) &&
        (!filters.location ||
          c.location.toLowerCase().includes(filters.location.toLowerCase())) &&
        (!filters.duration ||
          c.duration.toLowerCase().includes(filters.duration.toLowerCase())) &&
        (!filters.collegeType ||
          c.type.toLowerCase().includes(filters.collegeType.toLowerCase())) &&
        filterByFee(c.fee)
    )
    .sort((a, b) => {
      if (sortBy === "Fees")
        return (
          parseInt(a.fee.replace(/\D/g, "")) -
          parseInt(b.fee.replace(/\D/g, ""))
        );
      if (sortBy === "Ratings")
        return b.tags.includes("Top Rated") - a.tags.includes("Top Rated");
      return 0;
    });

  const visibleCourses = filteredCourses.slice(0, visibleCount);

  return (
    <div className="flex flex-col min-h-screen font-poppins bg-gradient-to-b from-gray-950 via-gray-900 to-gray-900 text-gray-100">
      <Header title={"Explore Courses / Colleges"} />

      <main className="flex-1 pt-28 px-4 md:px-6 flex flex-col gap-6">
        {/* ===== Filters ===== */}
        <div className="bg-gradient-to-r from-gray-800 via-blue-900/40 to-gray-800 border border-blue-500/20 p-4 rounded-2xl shadow-md flex flex-col md:flex-row flex-wrap gap-3 md:items-center">
          <input
            type="text"
            name="field"
            placeholder="Field of Study"
            value={filters.field}
            onChange={handleFilterChange}
            className="p-2 border border-gray-600 rounded flex-1 bg-gray-900 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={filters.location}
            onChange={handleFilterChange}
            className="p-2 border border-gray-600 rounded flex-1 bg-gray-900 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
          />
          <select
            name="duration"
            value={filters.duration}
            onChange={handleFilterChange}
            className="p-2 border border-gray-600 rounded flex-1 bg-gray-900 text-gray-100 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Duration</option>
            <option>3 Years</option>
            <option>4 Years</option>
          </select>
          <select
            name="feeRange"
            value={filters.feeRange}
            onChange={handleFilterChange}
            className="p-2 border border-gray-600 rounded flex-1 bg-gray-900 text-gray-100 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Fee Range</option>
            <option>₹0 - ₹50,000</option>
            <option>₹50,001 - ₹1,00,000</option>
            <option>₹1,00,001+</option>
          </select>
          <select
            name="collegeType"
            value={filters.collegeType}
            onChange={handleFilterChange}
            className="p-2 border border-gray-600 rounded flex-1 bg-gray-900 text-gray-100 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">College Type</option>
            <option>Private</option>
            <option>Government</option>
          </select>
        </div>

        {/* ===== Sorting ===== */}
        <div className="flex justify-end gap-4 items-center">
          <span className="text-gray-400 text-sm">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-1 border border-gray-600 rounded bg-gray-900 text-gray-100 focus:ring-2 focus:ring-blue-400"
          >
            <option>Popularity</option>
            <option>Fees</option>
            <option>Ratings</option>
          </select>
        </div>

        {/* ===== Courses Grid ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleCourses.map((course, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-gray-800 via-blue-900/40 to-gray-900 border border-blue-500/20 p-5 rounded-2xl shadow-md hover:shadow-blue-400/30 transition-all transform hover:-translate-y-1 cursor-pointer flex flex-col gap-2"
              onClick={() => setSelectedCourse(course)}
            >
              <div className="flex items-center gap-2">
                <img
                  src={course.collegeLogo}
                  alt={course.collegeName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="font-semibold text-white">
                    {course.courseName}
                  </h4>
                  <p className="text-gray-400 text-sm">{course.collegeName}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-1">
                {course.duration} | {course.fee} | {course.mode}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {course.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gradient-to-r from-blue-700 to-blue-500 text-white px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button className="mt-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg hover:shadow-blue-400/40 hover:scale-[1.03] transition text-sm">
                View Details / Apply
              </button>
            </div>
          ))}
        </div>

        {/* ===== Load More Button ===== */}
        {visibleCount < filteredCourses.length && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg shadow-md hover:shadow-blue-400/40 hover:scale-[1.03] transition"
            >
              Load More
            </button>
          </div>
        )}
      </main>

      {/* ===== Course Detail Modal ===== */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-gradient-to-br from-gray-900 via-blue-900/30 to-gray-900 border border-blue-500/20 rounded-2xl p-6 max-w-lg w-full relative shadow-xl flex flex-col gap-4">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
              onClick={() => setSelectedCourse(null)}
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-semibold text-blue-400">
              {selectedCourse.courseName}
            </h3>
            <p className="text-gray-300">{selectedCourse.collegeName}</p>
            <p className="text-gray-200 text-sm">{selectedCourse.overview}</p>
            <p className="text-gray-400 text-sm">
              <strong>Eligibility:</strong> {selectedCourse.eligibility}
            </p>
            <p className="text-gray-400 text-sm">
              <strong>Admission Process:</strong>{" "}
              {selectedCourse.admissionProcess}
            </p>
            <button className="mt-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg hover:shadow-blue-400/40 hover:scale-[1.03] transition">
              Apply Now
            </button>
          </div>
        </div>
      )}

      {/* ===== Floating Chat Button ===== */}
      <button className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-blue-400 text-white p-4 rounded-full shadow-lg hover:shadow-blue-400/40 hover:scale-[1.05] transition flex items-center gap-2">
        <MessageCircle size={20} /> Chat with Counselor
      </button>
    </div>
  );
}

export default CoursesCollegeExplorer;
