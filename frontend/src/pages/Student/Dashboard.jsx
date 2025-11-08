// pages/Student/Dashboard.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Header from "../../components/common/Header";
import { useUserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { Sun, Sunset, Moon } from "lucide-react";

function Greeting() {
  const { user } = useUserContext();
  const hour = new Date().getHours();

  let greeting = "";
  let Icon = Sun;
  let iconColor = "#FACC15";

  if (hour < 12) {
    greeting = "Good Morning";
    Icon = Sun;
    iconColor = "#FACC15";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
    Icon = Sunset;
    iconColor = "#F97316";
  } else {
    greeting = "Good Evening";
    Icon = Moon;
    iconColor = "#60A5FA";
  }

  const userName = user?.personalInfo?.name || user?.name || "User";

  return (
    <div className="flex items-center gap-3 mb-6 animate-fade-in">
      <div
        className="flex items-center justify-center w-10 h-10 rounded-full shadow-inner"
        style={{ backgroundColor: `${iconColor}33` }}
      >
        <Icon size={22} color={iconColor} />
      </div>
      <h2 className="text-3xl font-bold text-gray-100 tracking-wide">
        {greeting},{" "}
        <span className="bg-gradient-to-r from-blue-400 via-yellow-400 to-orange-400 text-transparent bg-clip-text">
          {userName}
        </span>
      </h2>
    </div>
  );
}

function Dashboard() {
  const { user } = useUserContext();

  const chartData = [
    { week: "Week 1", tests: 1, recommendations: 2 },
    { week: "Week 2", tests: 2, recommendations: 3 },
    { week: "Week 3", tests: 3, recommendations: 4 },
    { week: "Week 4", tests: 3, recommendations: 5 },
  ];

  return (
    <div className="flex flex-col min-h-screen font-poppins bg-gradient-to-b from-gray-950 via-gray-900 to-gray-900 text-gray-100 transition-all duration-500">
      <Header title={"Dashboard"} />

      {/* ===== Main Content ===== */}
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 p-6 overflow-auto pt-20 max-w-7xl mx-auto w-full">
          {Greeting()}

          {/* ===== Dashboard Cards Grid ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* 🧾 Profile Completion */}
            {user.profileCompletion !== 100 && (
              <div className="bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-blue-700/70 border border-blue-500/30 rounded-2xl p-6 shadow-md hover:shadow-blue-500/30 transition-transform transform hover:-translate-y-1 duration-300">
                <h3 className="font-semibold mb-3 text-gray-100 flex items-center gap-2">
                  Profile Completion
                  <span className="text-xs text-gray-400">
                    ({user.profileCompletion}%)
                  </span>
                </h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold text-lg">
                    {user.profileCompletion}
                  </div>
                  <Link
                    to={"/student/profile"}
                    className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded hover:from-blue-400 hover:to-blue-600 transition"
                  >
                    Update Now
                  </Link>
                </div>
              </div>
            )}

            {/* 🧠 Aptitude Test */}
            <div className="bg-gradient-to-br from-yellow-900/50 via-orange-900/40 to-gray-800 border border-yellow-500/20 p-6 rounded-2xl shadow-md hover:shadow-yellow-500/20 transition-transform transform hover:-translate-y-1 duration-300">
              <h3 className="font-semibold mb-2 text-gray-100">
                Aptitude Test Status
              </h3>
              <p className="mb-4 text-gray-300">
                You have completed{" "}
                <span className="text-yellow-400 font-bold">2/3</span> sections
              </p>
              <Link
                to={"/student/aptitude-test"}
                className="px-3 py-1 bg-gradient-to-r from-orange-500 to-yellow-400 text-gray-900 rounded font-semibold hover:from-orange-400 hover:to-yellow-300 transition"
              >
                Continue Test
              </Link>
            </div>

            {/* 💼 Recommendations */}
            <div className="bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-gray-900 border border-blue-500/20 p-6 rounded-2xl shadow-md hover:shadow-blue-500/30 transition-transform transform hover:-translate-y-1 duration-300">
              <h3 className="font-semibold mb-3 text-gray-100">
                Recent Career Recommendations
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  "Software Engineer",
                  "UI/UX Designer",
                  "Marketing Analyst",
                ].map((career) => (
                  <div
                    key={career}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-800/80 to-blue-700/60 rounded-lg text-gray-100"
                  >
                    <span>{career}</span>
                    <a
                      href="#"
                      className="text-blue-400 hover:text-yellow-300 transition"
                    >
                      View
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* 🎓 Skill Resources */}
            <div className="bg-gradient-to-br from-gray-800 via-blue-900/40 to-blue-950 border border-blue-500/20 p-6 rounded-2xl shadow-md hover:shadow-blue-500/30 transition-transform transform hover:-translate-y-1 duration-300">
              <h3 className="font-semibold mb-3 text-gray-100">
                Skill Development Resources
              </h3>
              <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-2">
                {[
                  "Data Science Basics",
                  "Communication Skills",
                  "UI/UX Fundamentals",
                  "Time Management",
                ].map((skill) => (
                  <div
                    key={skill}
                    className="p-2 bg-blue-800/50 rounded hover:bg-blue-700/70 transition"
                  >
                    {skill}
                  </div>
                ))}
              </div>
              <button className="mt-3 px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded hover:from-blue-500 hover:to-blue-400 transition">
                See All
              </button>
            </div>

            {/* 📈 Career Progress Tracker */}
            <div className="bg-gradient-to-br from-gray-800 via-gray-900/90 to-blue-950 border border-blue-500/20 p-6 rounded-2xl shadow-md hover:shadow-blue-500/30 transition-transform transform hover:-translate-y-1 duration-300 col-span-1 md:col-span-2 xl:col-span-1">
              <h3 className="font-semibold mb-3 text-gray-100">
                Career Progress Tracker
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
                  <XAxis dataKey="week" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      borderRadius: "8px",
                      border: "none",
                      color: "#F9FAFB",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="tests"
                    stroke="#3B82F6"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="recommendations"
                    stroke="#10B981"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* 🔔 Announcements */}
            <div className="bg-gradient-to-br from-blue-900/60 via-gray-800/80 to-gray-900 border border-blue-400/20 p-6 rounded-2xl shadow-md hover:shadow-blue-500/20 transition-transform transform hover:-translate-y-1 duration-300">
              <h3 className="font-semibold mb-3 text-gray-100">
                Announcements
              </h3>
              <ul className="flex flex-col gap-2">
                {[
                  "🆕 New Psychometric test added!",
                  "🔥 Check top trending careers 2025",
                ].map((notice, idx) => (
                  <li
                    key={idx}
                    className="p-3 bg-gradient-to-r from-blue-800/70 to-blue-700/50 rounded-lg text-gray-200 hover:text-yellow-300 transition"
                  >
                    {notice}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>

      {/* ===== Footer ===== */}
      <footer className="bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 text-gray-400 text-sm p-4 mt-auto text-center border-t border-gray-700/50">
        <p>
          Help | Contact | Privacy Policy |{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-yellow-400 to-orange-400 font-semibold">
            © {new Date().getFullYear()} CareerGuide+
          </span>
        </p>
      </footer>
    </div>
  );
}

export default Dashboard;
