import { useEffect, useState } from "react";
import API from "../services/api";
import type { StudentProfile } from "../types";
import { useNavigate } from "react-router-dom";

const DEFAULT_STRENGTHS = ["Math", "Science", "English", "Arts", "Commerce"];
const DEFAULT_INTERESTS = ["Technology", "Design", "Business", "Healthcare", "Teaching"];

export default function ProfilePage() {
  const [profile, setProfile] = useState<StudentProfile>({
    fullName: "",
    grade: "",
    academicStrengths: [],
    interests: [],
    preferredWorkStyle: "",
    futureGoal: "",
  });
  const [status, setStatus] = useState<string | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    API.get("/profile")
      .then((res) => {
        if (res.data) setProfile((p) => ({ ...p, ...res.data }));
      })
      .catch(() => {});
  }, []);

  const toggle = (field: "academicStrengths" | "interests", value: string) => {
    setProfile((p) => {
      const existing = new Set(p[field] || []);
      if (existing.has(value)) existing.delete(value);
      else existing.add(value);
      return { ...p, [field]: Array.from(existing) };
    });
  };

  const saveAndContinue = async () => {
    setStatus(null);
    try {
      await API.post("/profile", profile);
      setStatus("Saved.");
      nav("/quiz");
    } catch {
      setStatus("Could not save profile.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">Student Profile</h1>
      <p className="text-gray-600 mt-1">
        This helps personalize your career matches and roadmap.
      </p>

      {status ? (
        <div className="mt-3 rounded bg-gray-50 text-gray-800 p-2 text-sm">
          {status}
        </div>
      ) : null}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-700">Full name</label>
          <input
            value={profile.fullName || ""}
            onChange={(e) => setProfile((p) => ({ ...p, fullName: e.target.value }))}
            className="border rounded p-2 w-full mt-1"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="text-sm text-gray-700">Grade / Year</label>
          <input
            value={profile.grade || ""}
            onChange={(e) => setProfile((p) => ({ ...p, grade: e.target.value }))}
            className="border rounded p-2 w-full mt-1"
            placeholder="e.g., 10th, 12th, 1st year"
          />
        </div>
      </div>

      <div className="mt-6">
        <h2 className="font-semibold">Academic Strengths</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {DEFAULT_STRENGTHS.map((s) => {
            const active = (profile.academicStrengths || []).includes(s);
            return (
              <button
                key={s}
                onClick={() => toggle("academicStrengths", s)}
                className={`px-3 py-1 rounded border text-sm ${
                  active ? "bg-blue-600 text-white border-blue-600" : "bg-white"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="font-semibold">Interests</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {DEFAULT_INTERESTS.map((s) => {
            const active = (profile.interests || []).includes(s);
            return (
              <button
                key={s}
                onClick={() => toggle("interests", s)}
                className={`px-3 py-1 rounded border text-sm ${
                  active ? "bg-blue-600 text-white border-blue-600" : "bg-white"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-700">Preferred work style</label>
          <input
            value={profile.preferredWorkStyle || ""}
            onChange={(e) =>
              setProfile((p) => ({ ...p, preferredWorkStyle: e.target.value }))
            }
            className="border rounded p-2 w-full mt-1"
            placeholder="e.g., teamwork, independent, structured, flexible"
          />
        </div>
        <div>
          <label className="text-sm text-gray-700">Future goal</label>
          <input
            value={profile.futureGoal || ""}
            onChange={(e) => setProfile((p) => ({ ...p, futureGoal: e.target.value }))}
            className="border rounded p-2 w-full mt-1"
            placeholder="e.g., startup, stable job, help others, learn deeply"
          />
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <button
          onClick={saveAndContinue}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Save & Start Assessment
        </button>
        <button
          onClick={() => nav("/quiz")}
          className="border px-4 py-2 rounded"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}

