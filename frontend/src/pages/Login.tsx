import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const handleLogin = async () => {
    setError(null);
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data.token);
      nav("/profile");
    } catch (e: any) {
      setError(e?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-indigo-100 px-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:block text-slate-800">
          <h1 className="text-3xl font-bold leading-snug">
            Discover your best–fit career path.
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Take a guided psychometric assessment that combines your interests,
            aptitude, personality, values and academic strengths to suggest
            aligned career clusters and a 5-year roadmap.
          </p>
        </div>

        <div className="w-full max-w-md mx-auto bg-white/80 backdrop-blur shadow-xl rounded-2xl p-8 border border-slate-100">
          <h2 className="text-2xl font-semibold mb-1 text-slate-900">
            Welcome back
          </h2>
          <p className="text-sm text-slate-500 mb-5">
            Sign in to continue your career journey.
          </p>
        {error ? (
          <div className="mb-3 rounded bg-red-50 text-red-700 p-2 text-sm">
            {error}
          </div>
        ) : null}
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none p-2.5 mb-3 w-full rounded-lg text-sm"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none p-2.5 mb-4 w-full rounded-lg text-sm"
        />
        <button
          onClick={handleLogin}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg w-full text-sm font-medium transition-colors"
        >
          Login
        </button>
        <p className="text-sm text-gray-600 mt-4">
          New here?{" "}
          <Link className="text-blue-600 underline" to="/register">
            Create an account
          </Link>
        </p>
      </div>
      </div>
    </div>
  );
}