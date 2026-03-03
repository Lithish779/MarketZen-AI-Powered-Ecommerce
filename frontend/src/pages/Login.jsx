
import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { GoogleLogin } from "@react-oauth/google";
import { API } from "./api";
import toast from "react-hot-toast";

export default function Login() {
  const [mode, setMode] = useState("login");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [animating, setAnimating] = useState(false);

  const [form, setForm] = useState({
    name: "",
    contact: "",
    password: "",
    newPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ================= PREMIUM TOAST ================= */
  const loginToast = (message) => {
    toast(message, {
      duration: 2200,
      style: {
        background: "#7dd3fc",
        color: "#0f172a",
        padding: "10px 22px",
        borderRadius: "9999px",
        fontSize: "14px",
        fontWeight: 500,
        boxShadow: "0 8px 30px rgba(0,0,0,0.18)",
      },
    });
  };

  /* ================= MODE SWITCH ================= */
  const switchMode = (nextMode) => {
    setAnimating(true);
    setTimeout(() => {
      setMode(nextMode);
      setStep(1);
      setAnimating(false);
    }, 300);
  };

  /* ================= EMAIL LOGIN ================= */
  const handleLogin = async () => {
    if (!form.contact || !form.password) {
      loginToast("Email and password required");
      return;
    }

    try {
      const res = await API.post("/auth/login", {
        email: form.contact,
        password: form.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.name);
      localStorage.setItem("userId", res.data.user._id);

      loginToast("Welcome back");
      window.location.href = "/";
    } catch {
      loginToast("Invalid credentials");
    }
  };

  /* ================= GOOGLE LOGIN ================= */
  const handleGoogleLogin = async (credential) => {
    try {
      const res = await API.post("/auth/google", {
        token: credential,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.name);
      localStorage.setItem("userId", res.data.user._id);

      loginToast("Logged in with Google");
      window.location.href = "/";
    } catch {
      loginToast("Google login failed");
    }
  };

  /* ================= SIGNUP ================= */
  const sendSignupOtp = async () => {
    if (!form.name || !form.contact || !form.password) {
      loginToast("All fields required");
      return;
    }

    try {
      await API.post("/auth/signup/send-otp", {
        contact: form.contact,
      });
      loginToast("OTP sent");
      setStep(2);
    } catch {
      loginToast("Failed to send OTP");
    }
  };

  const verifySignupOtp = async () => {
    try {
      await API.post("/auth/signup/verify-otp", {
        name: form.name,
        contact: form.contact,
        password: form.password,
        otp,
      });

      loginToast("Account created");
      switchMode("login");
    } catch {
      loginToast("Invalid OTP");
    }
  };

  /* ================= FORGOT PASSWORD ================= */
  const sendResetOtp = async () => {
    if (!form.contact) {
      loginToast("Email required");
      return;
    }

    try {
      await API.post("/auth/forgot-password/send-otp", {
        email: form.contact,
      });
      loginToast("OTP sent");
      setStep(2);
    } catch {
      loginToast("OTP failed");
    }
  };

  const resetPassword = async () => {
    if (!otp || !form.newPassword) {
      loginToast("All fields required");
      return;
    }

    try {
      await API.post("/auth/forgot-password/verify-otp", {
        email: form.contact,
        otp,
        newPassword: form.newPassword,
      });

      loginToast("Password reset");
      switchMode("login");
    } catch {
      loginToast("Invalid OTP");
    }
  };

  const rightTitle =
    mode === "signup"
      ? "WELCOME TO SIGN UP"
      : mode === "forgot"
      ? "RESET ACCESS"
      : "WELCOME BACK";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#071019]">
      <div className="relative p-[2px] rounded-2xl border border-cyan-400/30 shadow-[0_0_45px_rgba(6,182,212,0.12)]">
        <div className="flex overflow-hidden rounded-2xl bg-gradient-to-r from-[#071225] via-[#071125] to-[#081124]">

          {/* LEFT PANEL */}
          <div className={`w-[520px] p-12 text-white transition-all duration-300
            ${animating ? "opacity-0 -translate-x-6" : "opacity-100 translate-x-0"}`}>

            <h1 className="mb-6 text-4xl font-extrabold tracking-tight capitalize">{mode}</h1>

            {mode === "login" && (
              <>
                <label className="block mb-1 text-sm text-slate-400">Email</label>
                <input name="contact" placeholder="Enter your email" onChange={handleChange} className="input" />

                <label className="block mt-3 mb-1 text-sm text-slate-400">Password</label>
                <input name="password" type="password" placeholder="Enter your password" onChange={handleChange} className="input" />

                <button onClick={handleLogin} className="btn">Login</button>

                {/* GOOGLE LOGIN */}
                <div className="flex justify-start mt-5">
                  <div className="google-wrap">
                    <GoogleLogin
                      onSuccess={(res) => handleGoogleLogin(res.credential)}
                      onError={() => loginToast("Google login failed")}
                      theme="filled_black"
                      shape="pill"
                    />
                  </div>
                </div>

                <p className="mt-4 link" onClick={() => switchMode("forgot")}>
                  Forgot password?
                </p>
              </>
            )}

            {mode === "signup" && step === 1 && (
              <>
                <input name="name" placeholder="Full Name" onChange={handleChange} className="input" />
                <input name="contact" placeholder="Email" onChange={handleChange} className="input" />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} className="input" />
                <button onClick={sendSignupOtp} className="btn">Send OTP</button>
              </>
            )}

            {mode === "signup" && step === 2 && (
              <>
                <input placeholder="OTP" onChange={(e) => setOtp(e.target.value)} className="input" />
                <button onClick={verifySignupOtp} className="btn">Verify & Signup</button>
              </>
            )}

            {mode === "forgot" && step === 1 && (
              <>
                <input name="contact" placeholder="Email" onChange={handleChange} className="input" />
                <button onClick={sendResetOtp} className="btn">Send OTP</button>
              </>
            )}

            {mode === "forgot" && step === 2 && (
              <>
                <input placeholder="OTP" onChange={(e) => setOtp(e.target.value)} className="input" />
                <input name="newPassword" type="password" placeholder="New Password" onChange={handleChange} className="input" />
                <button onClick={resetPassword} className="btn">Reset Password</button>
              </>
            )}

            <p className="mt-6 text-sm cursor-pointer text-cyan-400"
              onClick={() => switchMode(mode === "login" ? "signup" : "login")}>
              {mode === "login"
                ? "New here? Create account"
                : "Already have an account? Login"}
            </p>
          </div>

          {/* RIGHT PANEL */}
          <div className="w-[420px] flex items-center justify-center bg-[#020616] border-l border-cyan-400/10 relative">
            <div className={`text-center transition-opacity duration-300 p-8 ${animating ? "opacity-0" : "opacity-100"}`}>
              <div className="flex justify-center mb-6">
                <span className="p-4 rounded-full bg-[#fff6eb] shadow-[inset_0_-4px_8px_rgba(0,0,0,0.06)]">
                  <FiUser className="text-orange-500" size={36} />
                </span>
              </div>
              <h2 className="text-4xl font-extrabold tracking-wider text-white">{rightTitle}</h2>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .input {
          width: 100%;
          padding: 14px 14px;
          margin-bottom: 12px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(34,211,238,0.06);
          border-radius: 8px;
          color: #e6eef8;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.02), 0 6px 20px rgba(2,6,23,0.6);
        }

        .input::placeholder { color: rgba(226,238,248,0.35); }

        .input:focus {
          outline: none;
          border-color: rgba(34,211,238,0.95);
          box-shadow: 0 8px 30px rgba(6,182,212,0.08);
        }

        .btn {
          width: 100%;
          padding: 12px;
          background: linear-gradient(90deg,#22d3ee,#06b6d4);
          color: #021022;
          font-weight: 700;
          border-radius: 10px;
          margin-top: 8px;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          box-shadow: 0 10px 30px rgba(6,182,212,0.12);
        }

        .btn:hover { transform: translateY(-2px); }

        .link { margin-top: 10px; font-size: 14px; color: #34d7ff; cursor: pointer; }

        .google-wrap > div { display:flex; }
      `}</style>
    </div>
  );
}
