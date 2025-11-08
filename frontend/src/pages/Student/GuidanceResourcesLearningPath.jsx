import React, { useState } from "react";
import {
  Search,
  BookOpen,
  Video,
  Clipboard,
  Puzzle,
  MessageCircle,
} from "lucide-react";
import Header from "../../components/common/Header";

// ===== Extended Learning Path =====
const learningSteps = [
  { step: "Learn Python Programming", progress: 100 },
  { step: "Master Statistics & Math for Data Science", progress: 60 },
  { step: "Study Machine Learning Algorithms", progress: 35 },
  { step: "Work on Real-world Projects", progress: 10 },
  { step: "Build Portfolio & Apply for Jobs", progress: 0 },
];

// ===== Extended Resources =====
const resources = [
  {
    title: "Introduction to Data Science",
    type: "Article",
    duration: "15 min read",
    tag: "Beginner",
    icon: <BookOpen size={20} />,
  },
  {
    title: "Python for Data Science - Full Course",
    type: "Video",
    duration: "1 hr 20 min",
    tag: "Beginner",
    icon: <Video size={20} />,
  },
  {
    title: "Statistics for Machine Learning",
    type: "Course",
    duration: "6 hr",
    tag: "Intermediate",
    icon: <Clipboard size={20} />,
  },
  {
    title: "Hands-on ML Workshop",
    type: "Workshop",
    duration: "2 hr",
    tag: "Advanced",
    icon: <Puzzle size={20} />,
  },
  {
    title: "Deep Learning Foundations",
    type: "Course",
    duration: "8 hr",
    tag: "Advanced",
    icon: <Clipboard size={20} />,
  },
  {
    title: "Data Visualization with Python",
    type: "Video",
    duration: "50 min",
    tag: "Intermediate",
    icon: <Video size={20} />,
  },
];

function GuidanceResourcesLearningPath() {
  const [activeTab, setActiveTab] = useState("All");

  // ===== Filter resources by type =====
  const filteredResources =
    activeTab === "All"
      ? resources
      : resources.filter((r) => r.type === activeTab);

  return (
    <div className="flex flex-col min-h-screen font-poppins bg-gradient-to-b from-gray-950 via-gray-900 to-gray-900 text-gray-100">
      <Header title={"Guidance Resources & Learning Path"} />

      <main className="flex-1 pt-28 px-4 md:px-6 flex flex-col gap-8">
        {/* ===== Career Summary ===== */}
        <div className="bg-gradient-to-br from-gray-800 via-blue-900/40 to-gray-900 border border-blue-500/20 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-6 hover:shadow-blue-400/30 transition-all duration-300 transform hover:-translate-y-1">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Data Scientist
            </h2>
            <p className="text-gray-400 mt-1">
              Analyze complex data and create predictive models for business
              decisions.
            </p>
            <div className="mt-3 w-full max-w-md bg-gray-700 h-2 rounded-full overflow-hidden">
              <div
                className="h-2 bg-gradient-to-r from-blue-600 via-yellow-400 to-orange-500 rounded-full transition-all duration-700"
                style={{ width: "40%" }}
              ></div>
            </div>
            <p className="text-gray-500 text-sm mt-1">
              Learning Path: <span className="text-blue-400">40%</span>{" "}
              completed
            </p>
          </div>
          <button className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg shadow-md hover:shadow-blue-400/40 hover:scale-[1.03] transition">
            View Full Roadmap
          </button>
        </div>

        {/* ===== Learning Path Steps ===== */}
        <div className="flex flex-col md:flex-row gap-4 overflow-x-auto sm:p-2 pb-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-800">
          {learningSteps.map((step, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-gray-800 via-blue-900/30 to-gray-900 border border-blue-500/20 rounded-2xl shadow-md p-5 min-w-[240px] hover:shadow-blue-400/30 hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-200 text-sm">
                  {step.step}
                </h3>
                <span className="text-gray-400 text-xs">{step.progress}%</span>
              </div>
              <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-gradient-to-r from-blue-600 via-yellow-400 to-orange-500 transition-all duration-700"
                  style={{ width: `${step.progress}%` }}
                ></div>
              </div>
              <button className="mt-2 px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg hover:shadow-blue-400/40 transition text-sm">
                View Resources
              </button>
            </div>
          ))}
        </div>

        {/* ===== Resources Section ===== */}
        <div className="flex flex-col gap-6">
          {/* Tabs */}
          <div className="flex flex-wrap gap-3 justify-start">
            {["All", "Article", "Video", "Course", "Workshop"].map((tab) => (
              <button
                key={tab}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}s
              </button>
            ))}
          </div>

          {/* Grid of Resources */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((res, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-800 via-blue-900/40 to-gray-900 border border-blue-500/20 p-5 rounded-2xl shadow-md hover:shadow-blue-400/30 hover:-translate-y-1 transition-all duration-300 flex flex-col gap-2"
              >
                <div className="flex items-center gap-2 text-blue-400">
                  {res.icon}
                  <h4 className="font-semibold text-gray-100 text-sm">
                    {res.title}
                  </h4>
                </div>
                <p className="text-gray-400 text-xs">
                  {res.duration} | {res.tag}
                </p>
                <button className="mt-2 px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg hover:shadow-blue-400/40 hover:scale-[1.03] transition text-sm">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Suggested Skills ===== */}
        <div className="bg-gradient-to-br from-gray-800 via-blue-900/40 to-gray-900 border border-blue-500/20 rounded-2xl shadow-md p-6 hover:shadow-blue-400/30 transition-all duration-300">
          <h3 className="font-semibold text-blue-400 mb-3 text-lg">
            Suggested Skills
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              "Analytical Thinking",
              "Python Programming",
              "Data Visualization",
              "Machine Learning",
              "Communication Skills",
              "Problem Solving",
              "SQL & Databases",
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-xs bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-full shadow-md hover:shadow-blue-400/40 transition"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </main>

      {/* ===== Floating Chat Button ===== */}
      <button className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-blue-400 text-white p-4 rounded-full shadow-lg hover:shadow-blue-400/40 hover:scale-[1.05] transition flex items-center gap-2 animate-pulse">
        <MessageCircle size={20} /> Chat with Mentor
      </button>
    </div>
  );
}

export default GuidanceResourcesLearningPath;
