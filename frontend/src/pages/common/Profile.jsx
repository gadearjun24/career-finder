// pages/Student/Profile.jsx
import React, { useState, useEffect } from "react";
import { Upload, Edit3, Save, X } from "lucide-react";
import Header from "../../components/common/Header";
import { useUserContext } from "../../context/UserContext";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function Profile() {
  const { user, updateUser } = useUserContext();
  const [profile, setProfile] = useState(user || {});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProfile(user);
  }, [user]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (res.ok) {
        updateUser(data);
        setIsEditing(false);
      } else {
        console.error("Update failed:", data.message);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (section, field, value) => {
    if (section) {
      setProfile((prev) => ({
        ...prev,
        [section]: { ...prev[section], [field]: value },
      }));
    } else {
      setProfile((prev) => ({ ...prev, [field]: value }));
    }
  };

  if (!profile)
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-900 text-gray-100 font-poppins">
      <Header title={"My Profile"} />

      {/* ===== Overlay Loader ===== */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* ===== Main Content ===== */}
      <main className="flex-1 p-6 pt-20">
        {/* ===== Profile Overview ===== */}
        <section className="bg-gradient-to-br from-gray-800 via-blue-900/40 to-gray-900 border border-blue-500/20 p-6 rounded-2xl shadow-md hover:shadow-blue-500/30 mb-6 transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <img
              src={
                profile.avatar ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="student avatar"
              className="w-24 h-24 rounded-full border-4 border-blue-600 shadow-md"
            />
            <div className="flex-1 w-full">
              <h2 className="text-2xl font-bold text-gray-100 tracking-wide">
                {profile.personalInfo?.name || "Student Name"}
              </h2>
              <p className="text-gray-400 mb-3 text-sm">
                Student ID: {profile.id?.toUpperCase() || "N/A"}
              </p>

              {/* Progress Bar */}
              <div>
                <p className="text-sm mb-1 font-medium text-gray-300">
                  Profile Completion:{" "}
                  <span className="text-blue-400 font-semibold">
                    {profile.profileCompletion || 0}%
                  </span>
                </p>
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-gradient-to-r from-blue-500 via-blue-400 to-yellow-400 rounded-full transition-all duration-700"
                    style={{
                      width: `${profile.profileCompletion || 0}%`,
                      boxShadow: "0 0 10px rgba(59,130,246,0.6)",
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* ===== Buttons ===== */}
            <div className="flex gap-3">
              <button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-md hover:shadow-blue-400/40 hover:scale-[1.03] active:scale-95 transition-all"
              >
                {isEditing ? (
                  <>
                    <Save size={16} /> Save
                  </>
                ) : (
                  <>
                    <Edit3 size={16} /> Edit Profile
                  </>
                )}
              </button>

              {isEditing && (
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 hover:scale-[1.03] transition-all"
                >
                  <X size={16} /> Cancel
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ===== Academic + Personal Info ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Academic Details */}
          <div className="bg-gradient-to-br from-blue-900/60 via-gray-800 to-gray-900 border border-blue-500/20 p-6 rounded-2xl shadow-md hover:shadow-blue-400/30 transition-all transform hover:-translate-y-1">
            <h3 className="text-lg font-semibold mb-4 text-blue-400 flex items-center gap-2">
              🎓 Academic Details
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                { key: "schoolCollege", label: "School/College" },
                { key: "grade", label: "Grade" },
                { key: "stream", label: "Stream" },
                { key: "subjects", label: "Subjects" },
                { key: "achievements", label: "Achievements" },
              ].map(({ key, label }) => (
                <p
                  key={key}
                  className={`flex flex-col ${
                    key === "achievements" ? "col-span-2" : ""
                  }`}
                >
                  <span className="font-medium text-gray-300">{label}:</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.academicDetails?.[key] || ""}
                      onChange={(e) =>
                        handleChange("academicDetails", key, e.target.value)
                      }
                      className="bg-gray-700 border border-gray-600 focus:border-blue-500 rounded px-2 py-1 mt-1 text-gray-100 focus:ring-2 focus:ring-blue-400/50 transition"
                    />
                  ) : (
                    <span>{profile.academicDetails?.[key] || "-"}</span>
                  )}
                </p>
              ))}
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-gradient-to-br from-gray-800 via-blue-900/40 to-gray-900 border border-blue-500/20 p-6 rounded-2xl shadow-md hover:shadow-blue-400/30 transition-all transform hover:-translate-y-1">
            <h3 className="text-lg font-semibold mb-4 text-blue-400 flex items-center gap-2">
              👤 Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                { key: "name", label: "Full Name" },
                { key: "age", label: "Age" },
                { key: "gender", label: "Gender" },
                { key: "contact", label: "Contact" },
                { key: "address", label: "Address", span: true },
              ].map(({ key, label, span }) => (
                <p
                  key={key}
                  className={`${span ? "col-span-2" : ""} flex flex-col`}
                >
                  <span className="font-medium text-gray-300">{label}:</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.personalInfo?.[key] || ""}
                      onChange={(e) =>
                        handleChange("personalInfo", key, e.target.value)
                      }
                      className="bg-gray-700 border border-gray-600 focus:border-blue-500 rounded px-2 py-1 mt-1 text-gray-100 focus:ring-2 focus:ring-blue-400/50 transition"
                    />
                  ) : (
                    <span>{profile.personalInfo?.[key] || "-"}</span>
                  )}
                </p>
              ))}

              <p className="col-span-2">
                <span className="font-medium text-gray-300">Email:</span>{" "}
                <span className="text-gray-200">{profile.email}</span>
              </p>
            </div>
          </div>
        </div>

        {/* ===== Skills & Interests ===== */}
        <section className="bg-gradient-to-br from-gray-800 via-blue-900/40 to-gray-900 border border-blue-500/20 p-6 rounded-2xl shadow-md hover:shadow-blue-500/30 mb-6 transition-all transform hover:-translate-y-1">
          <h3 className="text-lg font-semibold mb-4 text-blue-400">
            💡 Skills & Interests
          </h3>
          {isEditing ? (
            <textarea
              className="bg-gray-700 border border-gray-600 focus:border-blue-500 rounded-lg w-full p-3 text-gray-100 focus:ring-2 focus:ring-blue-400/50 transition"
              rows={3}
              value={profile.skills?.join(", ") || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  skills: e.target.value.split(",").map((s) => s.trim()),
                })
              }
            />
          ) : (
            <div className="flex flex-wrap gap-3">
              {profile.skills?.length > 0 ? (
                profile.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-gradient-to-r from-blue-900 to-blue-700 text-blue-300 rounded-full text-sm font-medium hover:shadow-blue-400/30 transition"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No skills added yet.</p>
              )}
            </div>
          )}
        </section>

        {/* ===== Upload Resume ===== */}
        <section className="bg-gradient-to-br from-gray-800 via-blue-900/40 to-gray-900 border border-blue-500/20 p-6 rounded-2xl shadow-md hover:shadow-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-4 transition-all transform hover:-translate-y-1">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-400 mb-1">
              📎 Upload Resume
            </h3>
            <p className="text-gray-400 text-sm">
              Attach your latest resume in PDF format
            </p>
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline text-sm mt-2 inline-block hover:text-yellow-300 transition"
              >
                View Current Resume
              </a>
            )}
          </div>

          <label className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white rounded-lg hover:shadow-blue-400/30 hover:scale-[1.03] transition-all duration-300 cursor-pointer w-full md:w-auto justify-center">
            <Upload size={18} /> Upload
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const formData = new FormData();
                  formData.append("resume", file);
                  fetch(`${API_URL}/api/users/upload-resume`, {
                    method: "POST",
                    headers: { Authorization: `Bearer ${user?.token}` },
                    body: formData,
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.resumeUrl)
                        setProfile((prev) => ({
                          ...prev,
                          resumeUrl: data.resumeUrl,
                        }));
                    })
                    .catch((err) =>
                      console.error("Resume upload failed:", err)
                    );
                }
              }}
            />
          </label>
        </section>
      </main>
    </div>
  );
}

export default Profile;
