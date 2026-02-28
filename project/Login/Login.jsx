
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { useAuth } from "../src/context/useAuth";
import { COLORS } from "../src/constants/COLORS";

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [error, setError] = useState("");

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
 
  useEffect(() => {
    if (isAuthenticated) {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser?.role === "admin") {
        navigate("/Admin");
      } else {
        navigate("/Homepage1");
      }
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const admins = JSON.parse(localStorage.getItem("admins")) || [];

    const defaultAdmin = {
      username: "admin",
      email: "admin@gmail.com",
      password: "admin123",
      role: "admin",
      id: 1,
    };

    const exists = admins.find((a) => a.email === defaultAdmin.email);
    if (!exists) {
      admins.push(defaultAdmin);
      localStorage.setItem("admins", JSON.stringify(admins));
    }
  }, []);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const admins = JSON.parse(localStorage.getItem("admins")) || [];

    // 🔐 Check admin login
    const admin = admins.find(
      (a) =>
        (a.username === loginData.username || a.email === loginData.username) &&
        a.password === loginData.password
    );

    if (admin) {
      login(admin);
      navigate("/Admin");
      return;
    }

    const user = users.find(
      (u) =>
        (u.username === loginData.username || u.email === loginData.username) &&
        u.password === loginData.password
    );

    if (user) {
      login({ ...user, role: "user" });
      navigate("/Homepage1");
      return;
    }

    setError("Invalid Username or Password");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-amber-50 to-white">

      <div className="flex justify-center items-center flex-1">
        <div className="w-[850px] h-[500px] flex rounded-lg shadow-2xl relative overflow-hidden border border-amber-400">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-amber-600/30 blur-2xl"></div>

        <div className="w-1/2 bg-white flex flex-col justify-center p-10 relative z-10">
          <h2 className="text-2xl font-semibold mb-6 text-amber-900">Login</h2>

          <form className="space-y-6 text-gray-800" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={loginData.username}
                onChange={handleChange}
                className="w-full py-2 pl-10 pr-4 bg-transparent border-b border-amber-300 focus:border-amber-600 focus:outline-none"
                required
              />
              <FaUser className="absolute left-2 top-3 text-amber-600" />
            </div>

            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleChange}
                className="w-full py-2 pl-10 pr-4 bg-transparent border-b border-amber-300 focus:border-amber-600 focus:outline-none"
                required
              />
              <FaLock className="absolute left-2 top-3 text-amber-600" />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 font-semibold hover:from-amber-600 hover:to-amber-700 transition text-white"
            >
              Login
            </button>
            {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
          </form>

          <p className="mt-4 text-sm text-gray-600">
            Don't have an account?
            <Link to="/Signup" className="text-amber-600 ml-2 text-[16px] font-semibold hover:text-amber-700">
              Signup
            </Link>
          </p>
        </div>

        {/* Right Side */}
        <div className="w-1/2 bg-gradient-to-br from-amber-500 to-amber-600 text-white flex flex-col justify-center items-center p-8 relative z-10">
          <h2 className="text-3xl font-extrabold">WELCOME </h2>
          <p className="mt-4 text-sm text-amber-50 text-center">
            Login to access your account and continue.
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;
