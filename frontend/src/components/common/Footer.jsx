import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";
import { useUserContext } from "../../context/UserContext";

function Footer() {
  const { user } = useUserContext();

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-300 pt-16 pb-8 border-t border-gray-800 shadow-[0_-2px_20px_rgba(0,0,0,0.5)]">
      {/* ===== Main Footer Grid ===== */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* 🌐 About Section */}
        <div className="space-y-4">
          <h4 className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-yellow-400 to-blue-500 text-transparent bg-clip-text">
            CareerFinder+
          </h4>
          <p className="text-gray-400 text-sm leading-relaxed">
            CareerFinder+ helps you explore top colleges, personalized learning
            paths, and track your skills & achievements. Start your career
            journey today.
          </p>

          {/* Social Links */}
          <div className="flex gap-4 mt-3">
            {[
              { icon: Facebook, color: "hover:text-blue-500" },
              { icon: Twitter, color: "hover:text-sky-400" },
              { icon: Instagram, color: "hover:text-pink-500" },
              { icon: Linkedin, color: "hover:text-blue-400" },
            ].map((social, i) => (
              <a
                key={i}
                href="#"
                className={`p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition transform hover:scale-110 ${social.color}`}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* ⚡ Quick Links */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-12 after:h-[2px] after:bg-gradient-to-r from-blue-500 to-yellow-400">
            Quick Links
          </h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-400 transition">
                Home
              </Link>
            </li>

            {!user && (
              <li>
                <Link
                  to="/register"
                  className="hover:text-yellow-400 transition"
                >
                  Register
                </Link>
              </li>
            )}

            {user && (
              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-blue-400 transition"
                >
                  Dashboard
                </Link>
              </li>
            )}

            <li>
              <Link to="/profile" className="hover:text-orange-400 transition">
                Profile
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-blue-400 transition">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* 📞 Contact Info */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-12 after:h-[2px] after:bg-gradient-to-r from-orange-400 to-blue-400">
            Contact
          </h4>
          <p className="text-gray-400 text-sm hover:text-gray-200 transition">
            ✉️ Email:{" "}
            <span className="text-gray-300">support@careerfinder.com</span>
          </p>
          <p className="text-gray-400 text-sm hover:text-gray-200 transition">
            📞 Phone: <span className="text-gray-300">+91 9876543210</span>
          </p>
          <p className="text-gray-400 text-sm hover:text-gray-200 transition">
            📍 Address: Pune, Maharashtra, India
          </p>
        </div>

        {/* 📨 Newsletter / CTA */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-12 after:h-[2px] after:bg-gradient-to-r from-yellow-400 to-orange-400">
            Stay Updated
          </h4>
          <p className="text-gray-400 text-sm">
            Subscribe to our newsletter for career tips and updates.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-col gap-2"
          >
            <input
              type="email"
              placeholder="Your email"
              className="p-3 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 transition placeholder-gray-500"
            />
            <button
              type="submit"
              className="px-4 py-3 bg-gradient-to-r from-orange-500 via-yellow-400 to-blue-500 text-gray-900 font-semibold rounded-lg hover:scale-105 transition flex items-center justify-center gap-2 shadow-md hover:shadow-blue-500/40"
            >
              Subscribe <Send size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* ===== Divider Glow Line ===== */}
      <div className="mt-12 mb-6 h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>

      {/* ===== Bottom Section ===== */}
      <div className="text-center text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-yellow-400 to-orange-400 font-semibold">
            CareerFinder+
          </span>{" "}
          — All Rights Reserved.
        </p>
        <p className="mt-1 text-xs text-gray-600">
          Built with ❤️ for Students & Learners
        </p>
      </div>
    </footer>
  );
}

export default Footer;
