import React from "react";
import { Link } from "react-router-dom";
import {
  UserCheck,
  BookOpen,
  Video,
  ArrowRight,
  Star,
  Award,
  Globe,
  Users,
  TrendingUp,
  Briefcase,
} from "lucide-react";
import { useUserContext } from "../context/UserContext";
import Footer from "../components/common/Footer";
import heroImage from "../assets/hero-image.png";

function LandingPage() {
  const { user } = useUserContext();

  return (
    <div className="font-poppins bg-gray-900 text-gray-100">
      {/* ===== Header ===== */}
      <header className="fixed top-0 w-full bg-gradient-to-b from-gray-950/95 via-gray-900/90 to-gray-900/70 backdrop-blur-md border-b border-blue-500/20 shadow-[0_0_25px_rgba(37,99,235,0.15)] z-50 transition-all duration-500">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 md:px-8">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="font-extrabold text-2xl bg-gradient-to-r from-orange-400 via-yellow-400 to-blue-500 text-transparent bg-clip-text hover:scale-105 transition-transform duration-300"
            >
              CareerGuide<span className="text-blue-400">+</span>
            </Link>
          </div>

          {/* Navigation Buttons */}
          <nav className="hidden md:flex gap-6 items-center">
            {user ? (
              <Link
                to="/student/dashboard"
                className="px-5 py-2.5 rounded-xl font-medium bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-400 hover:via-blue-500 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-blue-500/30 transform hover:-translate-y-0.5 active:scale-95"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/register"
                className="px-5 py-2.5 rounded-xl font-semibold text-gray-900 bg-gradient-to-r from-orange-500 via-yellow-400 to-blue-400 hover:from-orange-400 hover:via-yellow-300 hover:to-blue-300 transition-all duration-300 shadow-lg hover:shadow-yellow-400/40 transform hover:-translate-y-0.5 active:scale-95"
              >
                Get Started
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* ===== Hero Section ===== */}
      <section className="relative flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto p-6 md:px-12 pt-32 gap-8">
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight animate-fade-in">
            Find Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-blue-500">
              Perfect Career
            </span>{" "}
            Path
          </h1>
          <p className="text-gray-300 text-lg md:text-xl animate-fade-in delay-100">
            Explore top colleges, personalized learning paths, and track your
            skills & achievements — all in one place.
          </p>
          <div className="flex gap-4 mt-4 animate-fade-in delay-200">
            {user ? (
              <Link
                to="/student/dashboard"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg hover:from-blue-500 hover:to-blue-400 transition shadow-lg hover:shadow-blue-500/40 flex items-center gap-2"
              >
                Go to Dashboard <ArrowRight size={18} />
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-400 text-gray-900 rounded-lg font-semibold hover:from-orange-400 hover:to-yellow-300 transition shadow-lg flex items-center gap-2"
                >
                  Get Started <ArrowRight size={18} />
                </Link>
                <Link
                  to="/login"
                  className="px-6 py-3 border border-blue-400 rounded-lg text-blue-400 hover:bg-blue-400 hover:text-gray-900 transition"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex-1 animate-slide-in-right">
          <img
            src={heroImage}
            alt="Career Finder Hero"
            className="w-full max-w-lg rounded-3xl shadow-2xl border border-blue-700/50"
          />
        </div>
      </section>

      {/* ===== Stats Section ===== */}
      <section className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center mt-20 bg-gray-800/50 p-8 rounded-2xl shadow-lg backdrop-blur">
        {[
          { label: "Students Guided", value: "25K+", color: "text-blue-400" },
          { label: "Top Colleges", value: "500+", color: "text-yellow-400" },
          { label: "Career Paths", value: "120+", color: "text-orange-400" },
          { label: "Courses Listed", value: "900+", color: "text-green-400" },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col gap-2 p-2">
            <span className={`text-3xl md:text-4xl font-bold ${stat.color}`}>
              {stat.value}
            </span>
            <span className="text-gray-300 text-sm md:text-base">
              {stat.label}
            </span>
          </div>
        ))}
      </section>

      {/* ===== Features Section ===== */}
      <section className="max-w-7xl mx-auto p-6 md:px-12 mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Top Colleges",
            desc: "Browse and compare the best colleges for your preferred courses.",
            icon: UserCheck,
            color: "text-blue-400",
          },
          {
            title: "Interactive Learning",
            desc: "Personalized learning paths and skill tracking to help you grow.",
            icon: BookOpen,
            color: "text-yellow-400",
          },
          {
            title: "Career Guidance",
            desc: "Get expert guidance to choose the right career path.",
            icon: Video,
            color: "text-orange-400",
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-blue-500/50 transition transform hover:-translate-y-2 hover:scale-[1.02]"
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full bg-gray-700/50 mb-4 ${feature.color}`}
            >
              <feature.icon size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-300 text-sm">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* ===== Why Choose Us Section ===== */}
      <section className="max-w-6xl mx-auto p-8 md:px-12 mt-24 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-3xl shadow-2xl text-center">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-8">
          Why Choose CareerGuide+
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Star,
              title: "Personalized Insights",
              text: "AI-powered suggestions based on your academic interests and strengths.",
              color: "text-yellow-400",
            },
            {
              icon: Award,
              title: "Trusted Data",
              text: "Verified information from top colleges, companies, and recruiters.",
              color: "text-blue-400",
            },
            {
              icon: TrendingUp,
              title: "Career Growth",
              text: "Tailored recommendations to help you upskill and plan your future.",
              color: "text-orange-400",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-gray-800 rounded-2xl hover:-translate-y-2 transition-all hover:shadow-lg hover:shadow-orange-500/30"
            >
              <item.icon size={32} className={`${item.color} mx-auto mb-4`} />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Testimonials Section ===== */}
      <section className="max-w-7xl mx-auto p-8 md:px-12 mt-24">
        <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-yellow-400">
          What Our Students Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Aarav Patel",
              text: "CareerGuide+ helped me discover the right engineering college and plan my specialization.",
              role: "B.Tech Student",
              color: "from-blue-500 to-blue-700",
            },
            {
              name: "Priya Sharma",
              text: "The personalized career path tool showed me opportunities I never considered before!",
              role: "MBA Aspirant",
              color: "from-orange-400 to-yellow-400",
            },
            {
              name: "Rahul Mehta",
              text: "I loved how simple and informative the platform is. It guided me from confusion to clarity!",
              role: "Science Student",
              color: "from-yellow-400 to-blue-500",
            },
          ].map((t, i) => (
            <div
              key={i}
              className={`bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-lg hover:shadow-blue-500/30 transition transform hover:-translate-y-2 border-l-4 border-transparent hover:border-orange-400`}
            >
              <p className="text-gray-300 mb-4 italic">“{t.text}”</p>
              <div className="font-semibold text-white">{t.name}</div>
              <div
                className={`text-sm bg-gradient-to-r ${t.color} bg-clip-text text-transparent`}
              >
                {t.role}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Contact / CTA Section ===== */}
      <section className="bg-gradient-to-r from-orange-500 via-yellow-400 to-blue-500 p-12 mt-24 text-center rounded-3xl mx-6 md:mx-12 shadow-2xl animate-fade-in text-gray-900">
        <h2 className="text-4xl font-bold mb-4">
          Ready to Start Your Career Journey?
        </h2>
        <p className="text-gray-800 mb-6">
          Join CareerGuide+ today and explore personalized paths to success.
        </p>
        {user ? (
          <Link
            to="/student/dashboard"
            className="px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition shadow-lg inline-flex items-center gap-2"
          >
            Go to Dashboard <ArrowRight size={20} />
          </Link>
        ) : (
          <Link
            to="/register"
            className="px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition shadow-lg inline-flex items-center gap-2"
          >
            Get Started <ArrowRight size={20} />
          </Link>
        )}
      </section>

      {/* ===== Footer ===== */}
      <Footer />
    </div>
  );
}

export default LandingPage;
