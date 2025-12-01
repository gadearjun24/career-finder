import React, { useState, useEffect } from "react";
import {
  Edit3,
  Save,
  X,
  MapPin,
  Globe,
  Mail,
  Award,
  Building2,
  Calendar,
  Users,
  BookOpen,
  Linkedin,
  Instagram,
  Facebook,
  Upload,
  PlusIcon,
} from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../../components/common/Header";
import { useUserContext } from "../../context/UserContext";
import { useCollegeContext } from "../../context/CollegeContext";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function CollegeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { getCollegeById, updateCollege, selectedCollege, setSelectedCollege } =
    useCollegeContext();

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);

  // Fetch college on mount
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const res = await getCollegeById(id);
      if (res?.success) {
        setFormData(res.data);
      }
      setLoading(false);
    };
    fetch();
  }, [id]);

  // Handle field changes
  const handleChange = (path, value) => {
    const keys = path.split(".");
    setFormData((prev) => {
      const updated = { ...prev };
      let obj = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!obj[keys[i]]) obj[keys[i]] = {};
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  // Save updated details
  const handleSave = async () => {
    const res = await updateCollege(id, formData);
    if (res.success) {
      setIsEditing(false);
      setSelectedCollege(formData);
      alert("College updated successfully!");
    } else {
      alert(res.message || "Error updating college");
    }
  };

  if (loading || !formData)
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  const college = formData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-900 text-gray-100 font-poppins">
      <Header title={college.name || "College Details"} />
      <main className="p-6 pt-20 max-w-6xl mx-auto">
        {/* ---------- Banner ---------- */}
        <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-6 border border-blue-500/20">
          {college.bannerImage ? (
            <img
              src={college.bannerImage}
              alt="banner"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-400 text-sm">
              No banner image uploaded
            </div>
          )}
          {isEditing && (
            <label className="absolute bottom-3 right-3 bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-lg flex items-center gap-2 text-sm cursor-pointer">
              <Upload size={16} /> Upload Banner
              <input
                type="file"
                accept="image/*"
                className="hidden"
                // onChange={async (e) => {
                //   const file = e.target.files[0];
                //   if (!file) return;
                //   const form = new FormData();
                //   form.append("banner", file);
                //   const res = await fetch(`${API_URL}/api/colleges/${id}/upload-banner`, {
                //     method: "POST",
                //     headers: { Authorization: `Bearer ${user?.token}` },
                //     body: form,
                //   });
                //   const data = await res.json();
                //   if (data?.url) handleChange("bannerImage", data.url);
                // }}
              />
            </label>
          )}
        </div>

        {/* ---------- Top Section ---------- */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img
              src={
                college.logo ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="logo"
              className="w-20 h-20 rounded-full border-4 border-blue-500/40 object-cover"
            />
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={college.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="bg-gray-700 border border-gray-600 px-2 py-1 rounded-lg text-xl font-bold text-blue-400"
                />
              ) : (
                <h2 className="text-3xl font-bold text-blue-400">
                  {college.name}
                </h2>
              )}
              <p className="text-sm text-gray-400 flex items-center gap-2">
                <MapPin size={14} /> {college.location?.city},{" "}
                {college.location?.state}
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">
            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg flex items-center gap-2"
            >
              {isEditing ? (
                <>
                  <Save size={16} /> Save
                </>
              ) : (
                <>
                  <Edit3 size={16} /> Edit
                </>
              )}
            </button>
            <Link
              to={"/college/courses"}
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <>
                <PlusIcon size={16} /> Add New Course
              </>
            </Link>
            {isEditing && (
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <X size={16} /> Cancel
              </button>
            )}
          </div>
        </div>

        {/* ---------- College Details ---------- */}
        <section className="bg-gray-800/70 rounded-2xl p-6 shadow-lg border border-blue-500/20 mb-8">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">
            🏛️ College Information
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <DetailField
              label="College Type"
              value={college.collegeType}
              isEditing={isEditing}
              onChange={(v) => handleChange("collegeType", v)}
            />
            <DetailField
              label="Accreditation"
              value={college.accreditation}
              isEditing={isEditing}
              onChange={(v) => handleChange("accreditation", v)}
            />
            <DetailField
              label="Established Year"
              value={college.establishedYear}
              isEditing={isEditing}
              onChange={(v) => handleChange("establishedYear", v)}
            />
            <DetailField
              label="Email"
              value={college.email}
              isEditing={isEditing}
              onChange={(v) => handleChange("email", v)}
            />
            <DetailField
              label="Website"
              value={college.website}
              isEditing={isEditing}
              onChange={(v) => handleChange("website", v)}
            />
          </div>
        </section>

        {/* ---------- Stats ---------- */}
        <section className="bg-gray-800/70 rounded-2xl p-6 shadow-lg border border-blue-500/20 mb-8">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">
            📊 Statistics
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-center">
            <StatCard
              icon={<Users size={22} />}
              label="Total Students"
              value={college.totalStudents || 0}
            />
            <StatCard
              icon={<BookOpen size={22} />}
              label="Total Courses"
              value={college.totalCourses || 0}
            />
            <StatCard
              icon={<Award size={22} />}
              label="Status"
              value={college.status}
            />
          </div>
        </section>

        {/* ---------- Social Links ---------- */}
        <section className="bg-gray-800/70 rounded-2xl p-6 shadow-lg border border-blue-500/20">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">
            🌐 Social Links
          </h3>
          <div className="flex flex-col gap-3">
            <SocialField
              icon={<Linkedin size={18} />}
              label="LinkedIn"
              value={college.socialLinks?.linkedin}
              isEditing={isEditing}
              onChange={(v) => handleChange("socialLinks.linkedin", v)}
            />
            <SocialField
              icon={<Instagram size={18} />}
              label="Instagram"
              value={college.socialLinks?.instagram}
              isEditing={isEditing}
              onChange={(v) => handleChange("socialLinks.instagram", v)}
            />
            <SocialField
              icon={<Facebook size={18} />}
              label="Facebook"
              value={college.socialLinks?.facebook}
              isEditing={isEditing}
              onChange={(v) => handleChange("socialLinks.facebook", v)}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

/* -------- Helper Components -------- */

const DetailField = ({ label, value, isEditing, onChange }) => (
  <div>
    <p className="text-gray-400 text-xs mb-1">{label}</p>
    {isEditing ? (
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-700 border border-gray-600 px-2 py-1 rounded w-full text-gray-100"
      />
    ) : (
      <p className="text-gray-200">{value || "—"}</p>
    )}
  </div>
);

const SocialField = ({ icon, label, value, isEditing, onChange }) => (
  <div className="flex items-center gap-2">
    {icon}
    {isEditing ? (
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
        className="bg-gray-700 border border-gray-600 px-2 py-1 rounded w-full text-gray-100"
      />
    ) : value ? (
      <a
        href={value}
        target="_blank"
        className="text-blue-400 hover:underline truncate"
      >
        {value}
      </a>
    ) : (
      <p className="text-gray-400">—</p>
    )}
  </div>
);

const StatCard = ({ icon, label, value }) => (
  <div className="bg-gray-700/60 rounded-xl p-4 border border-gray-600 hover:border-blue-500/40 transition">
    <div className="flex flex-col items-center">
      <div className="text-blue-400 mb-2">{icon}</div>
      <h4 className="text-lg font-semibold text-gray-100">{value}</h4>
      <p className="text-xs text-gray-400">{label}</p>
    </div>
  </div>
);
