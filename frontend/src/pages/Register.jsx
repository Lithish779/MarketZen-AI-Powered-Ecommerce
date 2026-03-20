import { useState } from "react";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let err = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!form.email.trim()) {
      err.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) err.email = "Invalid email format";
    }
    if (!form.password.trim()) {
      err.password = "Password is required";
    } else if (form.password.length < 6) {
      err.password = "Password must be at least 6 characters";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSuccess(true);
    setForm({ name: "", email: "", password: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] p-6 md:p-12 relative overflow-hidden">
      {/* Aesthetic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
         <div className="absolute top-[-15%] right-[-10%] w-[60%] h-[60%] bg-[#FBCFE8] rounded-full blur-[140px]" />
         <div className="absolute bottom-[-15%] left-[-10%] w-[60%] h-[60%] bg-[#C9A84C] rounded-full blur-[140px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-lg bg-white/70 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-14 shadow-[0_40px_120px_rgba(0,0,0,0.05)] border border-white"
      >
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-[2rem] md:rounded-[2.5rem] bg-slate-900 text-[#C9A84C] mb-6 md:mb-8 shadow-2xl transition-transform hover:scale-105">
            <FiUser size={28} md:size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Create your Profile
          </h2>
          <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Begin your Boutique Experience</p>
        </div>

        {success && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#FBCFE8]/20 text-[#EC4899] p-4 rounded-2xl mb-8 text-center text-[10px] font-bold tracking-widest border border-[#FBCFE8]/30"
          >
            Sovereignty Secured: Account Curated.
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-4">Full Identity</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className={`boutique-input ${errors.name ? "border-red-200" : ""}`}
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-4">Digital Destination</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className={`boutique-input ${errors.email ? "border-red-200" : ""}`}
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-4">Secure Seal</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className={`boutique-input ${errors.password ? "border-red-200" : ""}`}
            />
          </div>

          <button
            type="submit"
            className="boutique-btn mt-8 md:mt-10"
          >
            Acquire Access
          </button>
        </form>

        <div className="mt-8 md:mt-10 text-center">
          <Link 
            to="/login"
            className="text-[9px] md:text-[10px] font-bold text-[#FBCFE8] uppercase tracking-[0.3em] hover:text-slate-900 transition-colors"
          >
            Known Member? Authenticate
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
