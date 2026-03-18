import { useEffect, useState } from "react";
import API from "../services/api";
import type { Result } from "../types";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

export default function ResultPage() {
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    API.get("/assessment/result").then((res) =>
      setResult(res.data)
    );
  }, []);

  if (!result) return <p>Loading...</p>;

  const scores = result.scores || {};
  const data = {
    labels: Object.keys(scores),
    datasets: [
      {
        data: Object.values(scores),
        backgroundColor: [
          "#3B82F6", // blue (tech)
          "#EC4899", // pink (creative)
          "#10B981", // green (business)
          "#F59E0B", // yellow (extra if needed)
        ],
        borderWidth: 1,
      },
    ],
  };

  const topMatch = result.dashboard?.topMatches?.[0];

  return (
    <>
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-semibold">Your Career Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Interest + aptitude + personality + values + academics + future goals
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="md:col-span-1 bg-white shadow rounded p-4">
            <h2 className="font-semibold">Score Breakdown</h2>
            {Object.keys(scores).length ? <Pie data={data} /> : <p className="text-sm text-gray-600 mt-2">No scores yet.</p>}
          </div>

          <div className="md:col-span-2 bg-white shadow rounded p-4">
            <h2 className="font-semibold">Top Career Matches</h2>
            {result.dashboard?.topMatches?.length ? (
              <div className="mt-3 space-y-4">
                {result.dashboard.topMatches.map((m) => (
                  <div key={m.clusterKey} className="border rounded p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-semibold">{m.clusterLabel}</div>
                        <div className="text-sm text-gray-600">
                          Roles: {m.topRoles.join(", ")}
                        </div>
                      </div>
                      <div className="text-lg font-semibold">{m.fitPercent}%</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600 mt-2">
                {result.topCareer ? `Top Career: ${result.topCareer}` : "No dashboard available yet. Complete the assessment."}
              </p>
            )}
          </div>
        </div>

        {topMatch ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white shadow rounded p-4">
              <h2 className="font-semibold">Why this matches you</h2>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-800">
                {topMatch.whyThisMatchesYou.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white shadow rounded p-4">
              <h2 className="font-semibold">Subject / Stream recommendation</h2>
              <p className="mt-2 text-sm">{topMatch.subjectStreamRecommendation}</p>
              <p className="mt-2 text-sm text-gray-700">
                <b>Required subjects:</b> {topMatch.requiredSubjects.join(", ")}
              </p>
            </div>

            <div className="bg-white shadow rounded p-4">
              <h2 className="font-semibold">Course & degree path</h2>
              <ul className="list-disc pl-5 mt-2 text-sm">
                {topMatch.courseAndDegreePath.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white shadow rounded p-4">
              <h2 className="font-semibold">Skills to develop</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {topMatch.skillsToDevelop.map((s) => (
                  <span key={s} className="text-xs bg-gray-100 border rounded px-2 py-1">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 bg-white shadow rounded p-4">
              <h2 className="font-semibold">5-year action plan</h2>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-5 gap-3">
                {topMatch.fiveYearActionPlan.map((y) => (
                  <div key={y.year} className="border rounded p-3">
                    <div className="font-semibold">Year {y.year}</div>
                    <div className="text-sm text-gray-700">{y.focus}</div>
                    <ul className="list-disc pl-5 mt-2 text-sm">
                      {y.actions.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 bg-white shadow rounded p-4">
              <h2 className="font-semibold">Alternate backup careers</h2>
              <p className="mt-2 text-sm">{topMatch.alternateBackupCareers.join(", ")}</p>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}