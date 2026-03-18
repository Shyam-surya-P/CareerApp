import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import type { Question } from "../types";

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [answers, setAnswers] = useState<{ questionId: string; type: string }[]>(
    []
  );
  const nav = useNavigate();

  useEffect(() => {
    API.get("/assessment/questions").then((res) =>
      setQuestions(res.data)
    );
  }, []);

  const handleAnswer = (questionId: string, type: string) => {
    const updated = [...answers, { questionId, type }];
    setAnswers(updated);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      submit(updated);
    }
  };

  const submit = async (finalAnswers: { questionId: string; type: string }[]) => {
    await API.post("/assessment/submit", { answers: finalAnswers });
    nav("/result");
  };

  if (!questions.length) return <p>Loading...</p>;

  const q = questions[current];
  const qid = String(q._id || q.id);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white shadow-lg p-6 rounded w-[400px] text-center">
        <h2 className="text-xl font-semibold mb-4">
          {q.questionText}
        </h2>
  
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(qid, opt.type)}
            className="block w-full bg-gray-200 hover:bg-blue-400 hover:text-white p-2 my-2 rounded"
          >
            {opt.text}
          </button>
        ))}
  
        <p className="mt-4 text-sm text-gray-500">
          {current + 1} / {questions.length}
        </p>
      </div>
    </div>
  );
}