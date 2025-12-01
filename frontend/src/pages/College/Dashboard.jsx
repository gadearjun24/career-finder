import React, { useState } from "react";
import {
  Building2,
  PlusCircle,
  School,
  BookOpen,
  Users,
  Edit3,
  ArrowRight,
} from "lucide-react";
import Header from "../../components/common/Header";

function CollegeDashboard() {
  // Initially, no colleges are added for a new owner
  const [colleges, setColleges] = useState([]);
  const [showAddCollege, setShowAddCollege] = useState(false);
  const [newCollege, setNewCollege] = useState({
    name: "",
    location: "",
    accreditation: "",
    email: "",
  });

  // Mock: later you can replace with backend API call
  const handleAddCollege = () => {
    if (!newCollege.name || !newCollege.email) {
      alert("Please fill all required fields.");
      return;
    }
    setColleges([...colleges, { ...newCollege, id: Date.now(), courses: [] }]);
    setNewCollege({ name: "", location: "", accreditation: "", email: "" });
    setShowAddCollege(false);
  };

  return (
    <div className="flex flex-col min-h-screen font-poppins bg-gradient-to-b from-gray-950 via-gray-900 to-gray-900 text-gray-100">
      <Header title={"College Dashboard"} />

      <main className="flex-1 p-6 pt-20">
        {/* ===== EMPTY STATE ===== */}
        {colleges.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-20 text-center space-y-6">
            <div className="w-28 h-28 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Building2 size={48} className="text-blue-400" />
            </div>
            <h2 className="text-2xl font-semibold text-blue-400">
              Welcome to College Dashboard
            </h2>
            <p className="text-gray-400 max-w-md">
              You haven’t added any colleges yet. Start by adding your first
              college or institute to manage its courses, students, and
              analytics.
            </p>
            <button
              onClick={() => setShowAddCollege(true)}
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-semibold rounded-lg hover:shadow-lg transition"
            >
              <PlusCircle className="inline-block mr-2" size={18} /> Add First
              College
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 max-w-4xl">
              {[
                {
                  icon: <School size={26} />,
                  title: "Manage Multiple Colleges",
                  desc: "Easily handle all your institutes in one dashboard.",
                },
                {
                  icon: <BookOpen size={26} />,
                  title: "Add & Manage Courses",
                  desc: "Offer programs, edit details, and attract students.",
                },
                {
                  icon: <Users size={26} />,
                  title: "Get Student Leads",
                  desc: "Receive interested students based on test matches.",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-gray-800 via-blue-900/40 to-gray-900 border border-blue-500/20 rounded-2xl shadow-md p-6 hover:shadow-blue-400/30 transition"
                >
                  <div className="text-blue-400 mb-2">{card.icon}</div>
                  <h3 className="font-semibold text-gray-200">{card.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== MULTIPLE COLLEGES VIEW ===== */}
        {colleges.length > 0 && (
          <div className="space-y-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-blue-400">
                Your Colleges
              </h2>
              <button
                onClick={() => setShowAddCollege(true)}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg flex items-center gap-2 hover:shadow-lg transition"
              >
                <PlusCircle size={18} /> Add Another College
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {colleges.map((college) => (
                <div
                  key={college.id}
                  className="bg-gradient-to-br from-gray-800 via-blue-900/40 to-gray-900 border border-blue-500/20 rounded-2xl shadow-md p-5 hover:shadow-blue-400/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-yellow-400">
                      {college.name}
                    </h3>
                    <button className="text-gray-400 hover:text-blue-400 transition">
                      <Edit3 size={16} />
                    </button>
                  </div>
                  <p className="text-gray-300 text-sm">
                    {college.location || "Location not added"}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {college.accreditation || "Accreditation not added"}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    {college.email || "No contact email"}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3 text-sm">
                    <button className="px-3 py-1 bg-blue-600/70 hover:bg-blue-500 text-white rounded-lg flex items-center gap-1">
                      <BookOpen size={14} /> Manage Courses
                    </button>
                    <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg flex items-center gap-1">
                      <Users size={14} /> View Leads
                    </button>
                    <button className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-semibold rounded-lg flex items-center gap-1 hover:shadow-md transition">
                      Dashboard <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ===== ADD COLLEGE MODAL ===== */}
      {showAddCollege && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-900 via-blue-900/30 to-gray-900 border border-blue-500/20 rounded-2xl shadow-lg p-6 w-96 text-gray-100">
            <h3 className="text-lg font-semibold text-blue-400 mb-4">
              Add New College
            </h3>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="College Name"
                value={newCollege.name}
                onChange={(e) =>
                  setNewCollege((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                placeholder="Location"
                value={newCollege.location}
                onChange={(e) =>
                  setNewCollege((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                placeholder="Accreditation (e.g. NAAC A+)"
                value={newCollege.accreditation}
                onChange={(e) =>
                  setNewCollege((prev) => ({
                    ...prev,
                    accreditation: e.target.value,
                  }))
                }
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="email"
                placeholder="Official Email"
                value={newCollege.email}
                onChange={(e) =>
                  setNewCollege((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowAddCollege(false)}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCollege}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg hover:shadow-md transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CollegeDashboard;
